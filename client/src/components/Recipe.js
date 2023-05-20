import { Box, Paper, Typography } from '@mui/material';
import * as PropTypes from 'prop-types';

export function Recipe({ recipe }) {
	return (
		<Box component={Paper} sx={{ p: 2 }}>
			<Box component={Paper} sx={{ width: 'fit-content', p: 1, mt: 1 }}>
				<img
					src={`/upload/${recipe.id}`}
					alt="preview"
					style={{ display: 'block', width: '200px', height: 'auto' }}
				/>
			</Box>
			<Typography variant="h4">{recipe.name}</Typography>
			<Typography>
				Description:{' '}
				<span dangerouslySetInnerHTML={{ __html: recipe.description }} />
			</Typography>
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
