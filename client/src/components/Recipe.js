import { Box, Paper, Typography } from '@mui/material';
import * as PropTypes from 'prop-types';

export function Recipe({ recipe }) {
	return (
		<Box component={Paper} sx={{ p: 2 }}>
			<Typography variant="h4">{recipe.name}</Typography>
			<Typography>Description: {recipe.description}</Typography>
			<Typography>Price: {recipe.price}</Typography>
		</Box>
	);
}

const propTypes = {
	recipe: PropTypes.shape({
		id: PropTypes.number.isRequired,
		name: PropTypes.string.isRequired,
		description: PropTypes.string.isRequired,
		price: PropTypes.number.isRequired,
	}).isRequired,
};
Recipe.propTypes = propTypes;