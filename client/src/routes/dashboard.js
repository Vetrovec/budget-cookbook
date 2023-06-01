import { Box, Typography } from '@mui/material';
import { useState } from 'react';
import { RecipeTable } from '../components/RecipeTable';
import { RecipeFilter } from '../components/RecipeFilter';
import { useIngredientsQuery } from '../hooks/useIngredientsQuery';
import { useRecipesQuery } from '../hooks/useRecipesQuery';

export function Dashboard() {
	const [filter, setFilter] = useState({
		isEnabled: false,
		priceLessThan: '',
		selectedIngredient: null,
	});
	const recipeQuery = useRecipesQuery({
		filter: filter.isEnabled ? filter : {},
	});
	const ingredientsQuery = useIngredientsQuery();

	return (
		<Box>
			<RecipeFilter
				filter={filter}
				ingredients={ingredientsQuery.data}
				onFilterChange={setFilter}
			/>
			<Box>
				{recipeQuery.isLoading ? (
					<Typography>Loading recipes...</Typography>
				) : recipeQuery.error ? (
					<Typography>Error loading recipes</Typography>
				) : recipeQuery.data ? (
					<RecipeTable recipes={recipeQuery.data} />
				) : null}
			</Box>
		</Box>
	);
}
