import {
	Box,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
} from '@mui/material';
import * as PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Typography, useTheme } from '@mui/material';

export function RecipeTable({ recipes }) {
	const theme = useTheme();

	return (
		<TableContainer component={Paper}>
			<Box sx={{ p: 2 }}>
				<Typography variant="subtitle1">List of recipes</Typography>
			</Box>
			<Table aria-label="Recipe table">
				<TableHead>
					<TableRow>
						<TableCell>Name</TableCell>
						<TableCell>Duration</TableCell>
						<TableCell>Difficulty</TableCell>
						<TableCell align="right">Price</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{recipes.length === 0 && (
						<TableRow>
							<TableCell colSpan={4} align="center">
								No recipes found
							</TableCell>
						</TableRow>
					)}
					{recipes.map((recipe) => (
						<TableRow
							key={recipe.id}
							component={Link}
							to={`/recipe/${recipe.id}`}
							sx={{
								textDecoration: 'none',
								'&:last-child td, &:last-child th': { border: 0 },
								'&:hover': { backgroundColor: theme.palette.grey[100] },
							}}
						>
							<TableCell component="th" scope="row">
								{recipe.name}
							</TableCell>
							<TableCell>{recipe.duration}</TableCell>
							<TableCell>{recipe.difficulty}</TableCell>
							<TableCell align="right">{recipe.price}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
}

const propTypes = {
	recipes: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.number.isRequired,
			name: PropTypes.string.isRequired,
			description: PropTypes.string.isRequired,
			price: PropTypes.number.isRequired,
		}),
	).isRequired,
};
RecipeTable.propTypes = propTypes;
