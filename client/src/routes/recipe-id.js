import { Box, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import { Recipe } from '../components/Recipe';
import { RecipeIngredientList } from '../components/RecipeIngredientList';
import { useRecipeQuery } from '../hooks/useRecipeQuery';

export function RecipeId() {
	const { id } = useParams();
	const recipeQuery = useRecipeQuery({ id });
	return (
		<Box>
			{recipeQuery.isLoading ? (
				<Typography>Loading recipe...</Typography>
			) : recipeQuery.error ? (
				<Typography>Error loading recipe</Typography>
			) : recipeQuery.data ? (
				<Box
					sx={{
						display: 'grid',
						gridTemplateColumns: { lg: '1fr minmax(320px, 25%)' },
						gap: 2,
					}}
				>
					<Box>
						<Recipe recipe={recipeQuery.data} />
					</Box>
					<Box>
						<RecipeIngredientList
							ingredients={recipeQuery.data.ingredients}
							totalPrice={recipeQuery.data.price}
						/>
					</Box>
				</Box>
			) : null}
		</Box>
	);
}
