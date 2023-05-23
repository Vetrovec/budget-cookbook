import * as PropTypes from 'prop-types';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export function IngredientTable({ ingredients }) {
	return (
		<TableContainer component={Paper}>
			<Table aria-label="Ingredient table">
				<TableHead>
					<TableRow>
						<TableCell>Name</TableCell>
						<TableCell align="right">Price per unit</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{ingredients.length === 0 && (
						<TableRow>
							<TableCell colSpan={2} align="center">
								No ingredients found
							</TableCell>
						</TableRow>
					)}
					{ingredients.map((ingredient) => (
						<TableRow
							key={ingredient.id}
							sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
						>
							<TableCell component="th" scope="row">
								{ingredient.name}
							</TableCell>
							<TableCell align="right">
								{ingredient.price} / {ingredient.baseUnit}
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
}

const propTypes = {
	ingredients: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.number.isRequired,
			name: PropTypes.string.isRequired,
			price: PropTypes.number.isRequired,
		}),
	).isRequired,
};
IngredientTable.propTypes = propTypes;
