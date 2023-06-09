import { Box, IconButton, Paper, Typography } from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import * as PropTypes from 'prop-types';

export function Recipe({ recipe, onDelete }) {
	return (
		<Box component={Paper} sx={{ p: 2 }}>
			<Box sx={{ display: 'flex', gap: 2 }}>
				<Box
					component={Paper}
					sx={{
						display: 'flex',
						width: '16em',
						height: '16em',
						alignItems: 'center',
						justifyContent: 'center',
						p: 1,
					}}
				>
					{recipe.hasImage ? (
						<img
							src={`/upload/${recipe.id}`}
							alt="preview"
							style={{
								maxWidth: '100%',
								maxHeight: '100%',
							}}
						/>
					) : (
						<Typography align="center" fontStyle="italic">
							No image
						</Typography>
					)}
				</Box>
				<Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, py: 1 }}>
					<Typography variant="h5">{recipe.name}</Typography>
					<Typography variant="body2">
						Difficulty: {recipe.difficulty}
					</Typography>
					<Typography variant="body2">
						Duration: {recipe.duration} minutes
					</Typography>
				</Box>
				<Box sx={{ ml: 'auto' }}>
					<IconButton aria-label="delete" color="error" onClick={onDelete}>
						<DeleteForeverIcon />
					</IconButton>
				</Box>
			</Box>
			<Box
				sx={{ px: 1, mt: 4, wordBreak: 'break-all' }}
				dangerouslySetInnerHTML={{ __html: recipe.description }}
			/>
		</Box>
	);
}

const propTypes = {
	recipe: PropTypes.shape({
		id: PropTypes.number.isRequired,
		name: PropTypes.string.isRequired,
		description: PropTypes.string.isRequired,
		difficulty: PropTypes.string.isRequired,
		duration: PropTypes.number.isRequired,
		price: PropTypes.number.isRequired,
		hasImage: PropTypes.bool.isRequired,
	}).isRequired,
	onDelete: PropTypes.func.isRequired,
};
Recipe.propTypes = propTypes;
