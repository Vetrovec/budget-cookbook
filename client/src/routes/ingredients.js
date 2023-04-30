import Box from '@mui/material/Box';
import Layout from '../components/Layout';
import { IngredientForm } from '../components/IngredientForm';
import { IngredientTable } from '../components/IngredientTable';
import { useIngredientQuery } from '../hooks/useIngredientQuery';
import { Typography } from '@mui/material';

export function Ingredients() {
	const ingredientQuery = useIngredientQuery();

	const handleIngredientSubmit = async (ingredient) => {
		const response = await fetch('/ingredient', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				name: ingredient.name,
				pricePerUnit: Number(ingredient.price),
			}),
		});
		if (response.status === 201) {
			ingredientQuery.refetch();
		}
	};

	return (
		<Layout>
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
		</Layout>
	);
}
