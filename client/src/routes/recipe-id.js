import { Box, Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Recipe } from '../components/Recipe';
import { RecipeIngredientList } from '../components/RecipeIngredientList';
import { useRecipeQuery } from '../hooks/useRecipeQuery';

export function RecipeId() {
	const { id } = useParams();
	const recipeQuery = useRecipeQuery({ id });

	const navigate = useNavigate();

	const handleRecipeDelete = async () => {
		const response = await fetch(`/recipe/${id}`, {
			method: 'DELETE',
		});
		if (response.status !== 200) {
			toast.error('Failed to delete recipe');
			return;
		}
		toast.success('Recipe deleted');
		navigate('/');
	};

	return (
		<Box>
			{recipeQuery.isLoading ? (
				<Typography>Loading recipe...</Typography>
			) : recipeQuery.error ? (
				<Typography>Error loading recipe</Typography>
			) : recipeQuery.data ? (
				<Box
					sx={{
						overflow: 'hidden',
						display: 'grid',
						gridTemplateColumns: {
							lg: 'minmax(0, 1fr) minmax(320px, 25%)',
						},
						gap: 2,
					}}
				>
					<Box>
						<Recipe recipe={recipeQuery.data} onDelete={handleRecipeDelete} />
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
