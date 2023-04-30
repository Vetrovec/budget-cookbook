import Layout from '../components/Layout';
import { Box, Typography } from '@mui/material';
import { useRecipesQuery } from '../hooks/useRecipesQuery';
import { RecipeTable } from '../components/RecipeTable';

export function Root() {
	const recipeQuery = useRecipesQuery();
	return (
		<Layout>
			<Box sx={{ flex: 1 }}>
				{recipeQuery.isLoading ? (
					<Typography>Loading recipes...</Typography>
				) : recipeQuery.error ? (
					<Typography>Error loading recipes</Typography>
				) : recipeQuery.data ? (
					<RecipeTable recipes={recipeQuery.data} />
				) : null}
			</Box>
		</Layout>
	);
}
