import Layout from '../components/Layout';
import { Box, Paper, Switch, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { useRecipesQuery } from '../hooks/useRecipesQuery';
import { RecipeTable } from '../components/RecipeTable';

export function Root() {
	const [filtersEnabled, setFiltersEnabled] = useState(false);
	const [priceLessThan, setPriceLessThan] = useState('');
	const filters = filtersEnabled ? { priceLessThan } : {};
	const recipeQuery = useRecipesQuery(filters);
	return (
		<Layout>
			<Box component={Paper} sx={{ padding: 2, mb: 2 }}>
				<Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
					<Typography variant="h6">Filters</Typography>
					<Switch
						selected={filtersEnabled}
						onChange={() => setFiltersEnabled(!filtersEnabled)}
					/>
				</Box>
				{filtersEnabled && (
					<Box sx={{ mt: 2 }}>
						<TextField
							label="Price less than"
							size="small"
							value={priceLessThan}
							onChange={(event) => setPriceLessThan(event.target.value)}
						/>
					</Box>
				)}
			</Box>
			<Box>
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
