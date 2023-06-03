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
		<Box
			component={Paper}
			sx={{
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'space-between',
				padding: 2,
				mb: 2,
			}}
		>
			<Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
				<Typography variant="h6">Filters</Typography>
				<Switch selected={filter.isEnabled} onChange={handleToggleFilter} />
			</Box>
			<Box
				sx={{
					display: 'flex',
					alignItems: 'center',
					gap: 2,
					opacity: filter.isEnabled ? 1 : 0.3,
					pointerEvents: filter.isEnabled ? 'auto' : 'none',
				}}
			>
				<TextField
					label="Price less than (Kč)"
					size="small"
					autoComplete="off"
					name="filter-price"
					value={filter.priceLessThan}
					onChange={handlePriceChange}
				/>
				<Select
					displayEmpty
					size="small"
					autoComplete="off"
					name="filter-ingredient"
					value={filter.selectedIngredient ?? ''}
					onChange={handleIngredientSelect}
					sx={{ minWidth: '12em' }}
				>
					<MenuItem value="">
						<em>Any ingredient</em>
					</MenuItem>
					{ingredients?.map(({ id, name }) => (
						<MenuItem key={id} value={id.toString()}>
							{name}
						</MenuItem>
					))}
				</Select>
			</Box>
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
