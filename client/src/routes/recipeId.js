import { useParams } from 'react-router-dom';
import Layout from '../components/Layout';
import { useRecipeQuery } from '../hooks/useRecipeQuery';
import { Box, Typography } from '@mui/material';
import { Recipe } from '../components/Recipe';
import { RecipeIngredientList } from '../components/RecipeIngredientList';

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
				<Box sx={{ display: 'flex', gap: 2 }}>
					<Box sx={{ flex: 'auto' }}>
						<Recipe recipe={recipeQuery.data} />
					</Box>
					<Box sx={{ width: '25%', minWidth: '320px' }}>
						<RecipeIngredientList
							ingredients={recipeQuery.data.ingredients}
							totalPrice={recipeQuery.data.price}
						/>
					</Box>
				</Box>
			) : null}
		</Layout>
	);
}
