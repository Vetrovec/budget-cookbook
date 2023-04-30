import { useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import Layout from '../components/Layout';
import { useRecipeQuery } from '../hooks/useRecipeQuery';
import { Typography } from '@mui/material';

export function RecipeId() {
	const { id } = useParams();
	const recipeQuery = useRecipeQuery({ id });
	console.log(recipeQuery.data);
	return (
		<Layout>
			{recipeQuery.isLoading ? (
				<Typography>Loading recipe...</Typography>
			) : recipeQuery.error ? (
				<Typography>Error loading recipe</Typography>
			) : recipeQuery.data ? (
				<Box xs={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
					<Typography variant="h3">Recipe</Typography>
					<Typography variant="subtitle1">
						Name: {recipeQuery.data.recipe.name}
					</Typography>
					<Typography>
						Description: {recipeQuery.data.recipe.description}
					</Typography>
					<Typography>Total price: {recipeQuery.data.totalPrice}</Typography>
				</Box>
			) : null}
		</Layout>
	);
}
