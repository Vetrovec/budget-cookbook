import { Box, Typography } from '@mui/material';
import { toast } from 'react-toastify';
import { IngredientForm } from '../components/IngredientForm';
import { IngredientTable } from '../components/IngredientTable';
import { useIngredientsQuery } from '../hooks/useIngredientsQuery';

export function Ingredients() {
	const ingredientQuery = useIngredientsQuery();

	const handleIngredientSubmit = async (ingredient) => {
		const response = await fetch('/ingredient', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				name: ingredient.name,
				pricePerUnit: Number(ingredient.price),
				baseUnit: ingredient.baseUnit,
			}),
		});
		if (response.status === 201) {
			toast.success('Ingredient created');
			ingredientQuery.refetch();
		} else {
			toast.error('Failed to create ingredient');
		}
	};

	return (
		<Box sx={{ display: 'flex', gap: 2 }}>
			<Box sx={{ flex: 1 }}>
				{ingredientQuery.isLoading ? (
					<Typography>Loading ingredients...</Typography>
				) : ingredientQuery.error ? (
					<Typography>Error loading ingredients</Typography>
				) : ingredientQuery.data ? (
					<IngredientTable ingredients={ingredientQuery.data} />
				) : null}
			</Box>
			<Box sx={{ flex: 1 }}>
				<IngredientForm onSubmit={handleIngredientSubmit} />
			</Box>
		</Box>
	);
}
