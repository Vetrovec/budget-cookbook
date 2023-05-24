import * as PropTypes from 'prop-types';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Link } from 'react-router-dom';
import { useTheme } from '@mui/material';

export function RecipeTable({ recipes }) {
	const theme = useTheme();

	return (
		<TableContainer component={Paper}>
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
