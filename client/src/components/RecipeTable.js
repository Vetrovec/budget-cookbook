import {
	Paper,
	Table,
	TableBody,
	TableContainer,
	TableHead,
	useTheme,
} from '@mui/material';
import * as PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { StyledTableCell } from '../styled/StyledTableCell';
import { StyledTableRow } from '../styled/StyledTableRow';

export function RecipeTable({ recipes }) {
	const theme = useTheme();

	return (
		<TableContainer component={Paper}>
			<Table aria-label="Recipe table">
				<TableHead>
					<StyledTableRow>
						<StyledTableCell>Name</StyledTableCell>
						<StyledTableCell>Duration</StyledTableCell>
						<StyledTableCell>Difficulty</StyledTableCell>
						<StyledTableCell align="right">Price</StyledTableCell>
					</StyledTableRow>
				</TableHead>
				<TableBody>
					{recipes.length === 0 && (
						<StyledTableRow>
							<StyledTableCell colSpan={4} align="center">
								No recipes found
							</StyledTableCell>
						</StyledTableRow>
					)}
					{recipes.map((recipe) => (
						<StyledTableRow
							key={recipe.id}
							component={Link}
							to={`/recipe/${recipe.id}`}
							sx={{
								textDecoration: 'none',
								'&:last-child td, &:last-child th': { border: 0 },
								'&:hover': { backgroundColor: theme.palette.grey[100] },
							}}
						>
							<StyledTableCell component="th" scope="row">
								{recipe.name}
							</StyledTableCell>
							<StyledTableCell>{recipe.duration}</StyledTableCell>
							<StyledTableCell>{recipe.difficulty}</StyledTableCell>
							<StyledTableCell align="right">{recipe.price}</StyledTableCell>
						</StyledTableRow>
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
