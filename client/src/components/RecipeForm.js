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
	const [difficulty, setDifficulty] = useState('');
	const [selectedIngredients, setSelectedIngredients] = useState([]);
	const [ingredientAmountMap, setIngredientAmountMap] = useState(new Map());
	const [previewImage, setPreviewImage] = useState();

	const totalPrice = useMemo(() => {
		const value = selectedIngredients.reduce((total, ingredientId) => {
			const ingredient = ingredients.find(
				(ingredient) => ingredient.id === ingredientId,
			);
			const amount = ingredientAmountMap.get(ingredientId) ?? 0;
			return total + ingredient.price * amount;
		}, 0);
		return roundTo(value, 2);
	}, [ingredientAmountMap, ingredients]);

	const handleIngredientSelect = (event) => {
		const {
			target: { value },
		} = event;
		setSelectedIngredients(
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
		event.preventDefault();
		onSubmit({
			name,
			description,
			duration,
			difficulty,
			previewImage,
			ingredients: selectedIngredients.map((id) => ({
				id,
				amount: Number(ingredientAmountMap.get(id)) ?? 0,
			})),
		});
	};

	return (
		<Box
			component="form"
			sx={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 2 }}
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
							label="Duration"
							name="recipe-duration"
							autoComplete="off"
							value={duration}
							onChange={(event) => setDuration(event.target.value)}
						/>
						<TextField
							size="small"
							label="Difficulty"
							name="recipe-difficulty"
							autoComplete="off"
							value={difficulty}
							onChange={(event) => setDifficulty(event.target.value)}
						/>
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
					value={selectedIngredients}
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
				{selectedIngredients.map((id) => {
					const ingredient = ingredients.find((target) => target.id === id);
					if (!ingredient) {
						return null;
					}
					const { name, baseUnit } = ingredient;
					const label = `${name} amount (${baseUnit})`;
					const value = ingredientAmountMap.get(id) ?? '';
					return (
						<TextField
							key={id}
							name={`ingredient-${id}`}
							autoComplete="off"
							size="small"
							label={label}
							value={value}
							onChange={(e) => handleIngredientAmount(e, id)}
						/>
					);
				})}
				<Typography sx={{ pt: 2, mt: 'auto' }}>
					Total price: {totalPrice}
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
