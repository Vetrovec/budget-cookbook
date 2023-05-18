import * as PropTypes from 'prop-types';
import { Box, Button, Typography } from '@mui/material';
import { TextField } from '@mui/material';
import { Paper } from '@mui/material';
import { Select } from '@mui/material';
import { Chip } from '@mui/material';
import { MenuItem } from '@mui/material';
import { useMemo, useState } from 'react';

export function RecipeForm({ ingredients, onSubmit }) {
	const [name, setName] = useState('');
	const [description, setDescription] = useState('');
	const [duration, setDuration] = useState('');
	const [difficulty, setDifficulty] = useState('');
	const [selectedIngredients, setSelectedIngredients] = useState([]);
	const [ingredientAmountMap, setIngredientAmountMap] = useState(new Map());

	const totalPrice = useMemo(() => {
		return selectedIngredients.reduce((total, ingredientId) => {
			const ingredient = ingredients.find(
				(ingredient) => ingredient.id === ingredientId,
			);
			const amount = ingredientAmountMap.get(ingredientId) ?? 0;
			return total + ingredient.price * amount;
		}, 0);
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
			ingredients: selectedIngredients.map((id) => ({
				id,
				amount: Number(ingredientAmountMap.get(id)) ?? 0,
			})),
		});
	};

	return (
		<Paper>
			<Box
				component="form"
				sx={{ display: 'flex', flexDirection: 'column', p: 2, gap: 2 }}
				onSubmit={handleSubmit}
			>
				<Typography variant="subtitle1">Add ingredient</Typography>
				<TextField
					size="small"
					label="Name"
					value={name}
					onChange={(event) => setName(event.target.value)}
				/>
				<TextField
					size="small"
					label="Description"
					value={description}
					onChange={(event) => setDescription(event.target.value)}
				/>
				<TextField
					size="small"
					label="Duration"
					value={duration}
					onChange={(event) => setDuration(event.target.value)}
				/>
				<TextField
					size="small"
					label="Difficulty"
					value={difficulty}
					onChange={(event) => setDifficulty(event.target.value)}
				/>
				<Select
					multiple
					size="small"
					value={selectedIngredients}
					onChange={handleIngredientSelect}
					renderValue={(selectedIds) => (
						<Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
							{selectedIds.map((id) => (
								<Chip
									key={id}
									label={ingredients.find((target) => target.id === id)?.name}
								/>
							))}
						</Box>
					)}
				>
					{ingredients.map(({ id, name }) => (
						<MenuItem key={id} value={id}>
							{name}
						</MenuItem>
					))}
				</Select>
				{selectedIngredients.map((id) => {
					const label = `${
						ingredients.find((target) => target.id === id)?.name
					} amount`;
					const value = ingredientAmountMap.get(id) ?? '';
					return (
						<TextField
							key={id}
							size="small"
							label={label}
							value={value}
							onChange={(e) => handleIngredientAmount(e, id)}
						/>
					);
				})}
				<Typography>Total price: {totalPrice}</Typography>
				<Button type="submit" variant="contained">
					Create recipe
				</Button>
			</Box>
		</Paper>
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
