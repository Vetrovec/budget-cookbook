import { useParams } from 'react-router-dom';
import Layout from '../components/Layout';
import { useRecipeQuery } from '../hooks/useRecipeQuery';
import { Typography } from '@mui/material';
import { Recipe } from '../components/Recipe';

export function RecipeId() {
	const { id } = useParams();
	const recipeQuery = useRecipeQuery({ id });
	return (
		<Layout>
			{recipeQuery.isLoading ? (
				<Typography>Loading recipe...</Typography>
			) : recipeQuery.error ? (
				<Typography>Error loading recipe</Typography>
			) : recipeQuery.data ? (
				<Recipe recipe={recipeQuery.data} />
			) : null}
		</Layout>
	);
}
