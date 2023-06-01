import {
	Box,
	MenuItem,
	Paper,
	Select,
	Switch,
	TextField,
	Typography,
} from '@mui/material';
import * as PropTypes from 'prop-types';
import { useCallback } from 'react';

export function RecipeFilter({ filter, ingredients, onFilterChange }) {
	const handleToggleFilter = useCallback(
		(e) => {
			onFilterChange({ ...filter, isEnabled: e.target.checked });
		},
		[filter, onFilterChange],
	);

	const handlePriceChange = useCallback(
		(e) => {
			onFilterChange({ ...filter, priceLessThan: e.target.value });
		},
		[filter, onFilterChange],
	);

	const handleIngredientSelect = useCallback(
		(e) => {
			onFilterChange({ ...filter, selectedIngredient: e.target.value });
		},
		[filter, onFilterChange],
	);

	return (
		<Box component={Paper} sx={{ padding: 2, mb: 2 }}>
			<Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
				<Typography variant="h6">Filters</Typography>
				<Switch selected={filter.isEnabled} onChange={handleToggleFilter} />
			</Box>
			{filter.isEnabled && (
				<Box sx={{ display: 'flex', mt: 2, gap: 1 }}>
					<TextField
						label="Price less than"
						size="small"
						value={filter.priceLessThan}
						onChange={handlePriceChange}
					/>
					<Select
						size="small"
						value={filter.selectedIngredient}
						onChange={handleIngredientSelect}
						sx={{ minWidth: '12em' }}
					>
						{ingredients?.map(({ id, name }) => (
							<MenuItem key={id} value={id}>
								{name}
							</MenuItem>
						))}
					</Select>
				</Box>
			)}
		</Box>
	);
}

const propTypes = {
	filter: PropTypes.shape({
		isEnabled: PropTypes.bool.isRequired,
		priceLessThan: PropTypes.string.isRequired,
		selectedIngredient: PropTypes.string,
	}).isRequired,
	ingredients: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.number.isRequired,
			name: PropTypes.string.isRequired,
		}).isRequired,
	),
	onFilterChange: PropTypes.func.isRequired,
};
RecipeFilter.propTypes = propTypes;
