import {
	Box,
	Button,
	Chip,
	MenuItem,
	Paper,
	Select,
	TextField,
	Typography,
} from '@mui/material';
import * as PropTypes from 'prop-types';
import { useMemo, useState } from 'react';
import ReactQuill from 'react-quill';
import { roundTo } from '../helpers/numberUtil';

export function RecipeForm({ ingredients, onSubmit }) {
	const [name, setName] = useState('');
	const [description, setDescription] = useState('');
	const [duration, setDuration] = useState('');
	const [difficulty, setDifficulty] = useState('Medium');
	const [selectedIngredientIds, setSelectedIngredientIds] = useState([]);
	const [ingredientAmountMap, setIngredientAmountMap] = useState(new Map());
	const [previewImage, setPreviewImage] = useState();

	const totalPrice = useMemo(() => {
		// Calculate the total price of the recipe
		const value = selectedIngredientIds.reduce((total, ingredientId) => {
			const ingredient = ingredients.find(
				(ingredient) => ingredient.id === ingredientId,
			);
			// If the ingredient doesn't exist, add 0 to the total
			const amount = ingredientAmountMap.get(ingredientId) ?? 0;
			return total + ingredient.price * amount;
		}, 0);
		// Round the value to 2 decimal places
		return roundTo(value, 2);
	}, [ingredientAmountMap, ingredients]);

	const selectedIngredients = useMemo(
		() =>
			selectedIngredientIds.reduce((list, id) => {
				// Find the ingredient by id
				const ingredient = ingredients.find((target) => target.id === id);
				// If the ingredient doesn't exist, return the list as is
				if (!ingredient) {
					return list;
				}
				// Otherwise, add the ingredient to the list
				const { name, baseUnit } = ingredient;
				const label = `${name} amount (${baseUnit})`;
				const value = ingredientAmountMap.get(id) ?? '';
				return [
					...list,
					{
						id,
						label,
						value,
					},
				];
			}, []),
		[],
	);

	const handleIngredientSelect = (event) => {
		const {
			target: { value },
		} = event;
		setSelectedIngredientIds(
			typeof value === 'string' ? value.split(',') : value,
		);
	};

	const handleIngredientAmount = (event, id) => {
		const {
			target: { value },
		} = event;
		setIngredientAmountMap((prev) => new Map(prev).set(id, value));
	};

	const handleSubmit = (event) => {
		// Prevent the form from refreshing the page
		event.preventDefault();
		onSubmit({
			name,
			description,
			duration: Number(duration),
			difficulty,
			previewImage,
			ingredients: selectedIngredientIds.map((id) => ({
				id,
				amount: Number(ingredientAmountMap.get(id)) ?? 0,
			})),
		});
	};

	return (
		<Box
			component="form"
			sx={{
				display: 'grid',
				gridTemplateColumns: { lg: '2fr 1fr' },
				gap: 2,
			}}
			onSubmit={handleSubmit}
		>
			<Typography component="h1" variant="h5" sx={{ gridColumn: '1 / -1' }}>
				Add Recipe
			</Typography>
			<Box component={Paper} sx={{ p: 2 }}>
				<Box sx={{ display: 'flex', gap: 2 }}>
					<Box>
						<Box
							component={Paper}
							sx={{
								display: 'flex',
								width: '16em',
								height: '16em',
								alignItems: 'center',
								justifyContent: 'center',
								p: 1,
							}}
						>
							{previewImage ? (
								<img
									src={URL.createObjectURL(previewImage)}
									alt="preview"
									style={{
										maxWidth: '100%',
										maxHeight: '100%',
									}}
								/>
							) : (
								<Typography align="center" fontStyle="italic">
									No image
								</Typography>
							)}
						</Box>
						<Button
							size="small"
							variant="contained"
							component="label"
							onChange={(e) => {
								if (e.target.files?.length) {
									setPreviewImage(e.target.files[0]);
								}
							}}
							sx={{ width: '100%', mt: 1 }}
						>
							Upload Preview Image
							<input accept="image/*" type="file" hidden />
						</Button>
					</Box>
					<Box
						sx={{
							display: 'flex',
							flex: 'auto',
							flexDirection: 'column',
							gap: 2,
						}}
					>
						<TextField
							size="small"
							label="Name"
							name="recipe-name"
							autoComplete="off"
							value={name}
							onChange={(event) => setName(event.target.value)}
						/>
						<TextField
							size="small"
							label="Duration in minutes"
							name="recipe-duration"
							autoComplete="off"
							value={duration}
							onChange={(event) => setDuration(event.target.value)}
						/>
						<Select
							size="small"
							name="recipe-difficulty"
							value={difficulty}
							renderValue={(value) => `Difficulty: ${value}`}
							onChange={(event) => setDifficulty(event.target.value)}
						>
							<MenuItem value="Easy">Easy</MenuItem>
							<MenuItem value="Medium">Medium</MenuItem>
							<MenuItem value="Hard">Hard</MenuItem>
						</Select>
					</Box>
				</Box>
			</Box>
			<Box
				component={Paper}
				sx={{ display: 'flex', flexDirection: 'column', p: 2, gap: 2 }}
			>
				<Select
					displayEmpty
					multiple
					size="small"
					value={selectedIngredientIds}
					onChange={handleIngredientSelect}
					renderValue={(selectedIds) => {
						if (!selectedIds?.length) {
							return <em>Select ingredients</em>;
						}
						return (
							<Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
								{selectedIds.map((id) => (
									<Chip
										key={id}
										label={ingredients.find((target) => target.id === id)?.name}
									/>
								))}
							</Box>
						);
					}}
				>
					{ingredients.map(({ id, name }) => (
						<MenuItem key={id} value={id}>
							{name}
						</MenuItem>
					))}
				</Select>
				{selectedIngredients.map((ingredient) => (
					<TextField
						key={ingredient.id}
						name={`ingredient-${ingredient.id}`}
						autoComplete="off"
						size="small"
						label={ingredient.label}
						value={ingredient.value}
						onChange={(e) => handleIngredientAmount(e, ingredient.id)}
					/>
				))}
				{!selectedIngredientIds.length && (
					<TextField disabled size="small" placeholder="Ingredient amount" />
				)}
				<Typography sx={{ pt: 2, mt: 'auto' }}>
					Total price: {totalPrice} Kč
				</Typography>
			</Box>
			<Box
				component={Paper}
				sx={{
					p: 2,
					gridColumn: '1 / -1',
				}}
			>
				<Typography sx={{ mb: 2 }}>Description</Typography>
				<Box sx={{ height: 260 }}>
					<ReactQuill
						value={description}
						onChange={setDescription}
						style={{ height: 'calc(100% - 42px)' }}
					/>
				</Box>
			</Box>
			<Button
				type="submit"
				variant="contained"
				size="large"
				sx={{ gridColumn: '1 / -1' }}
			>
				Create recipe
			</Button>
		</Box>
	);
}

const propTypes = {
	ingredients: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.number.isRequired,
			name: PropTypes.string.isRequired,
			price: PropTypes.number.isRequired,
		}),
	).isRequired,
	onSubmit: PropTypes.func.isRequired,
};
RecipeForm.propTypes = propTypes;
