import {
	Paper,
	Table,
	TableBody,
	TableContainer,
	TableHead,
} from '@mui/material';
import * as PropTypes from 'prop-types';
import { StyledTableRow } from '../styled/StyledTableRow';
import { StyledTableCell } from '../styled/StyledTableCell';

export function IngredientTable({ ingredients }) {
	return (
		<TableContainer component={Paper}>
			<Table aria-label="Ingredient table">
				<TableHead>
					<StyledTableRow>
						<StyledTableCell>Name</StyledTableCell>
						<StyledTableCell align="right">Price per unit</StyledTableCell>
					</StyledTableRow>
				</TableHead>
				<TableBody>
					{ingredients.length === 0 && (
						<StyledTableRow>
							<StyledTableCell colSpan={2} align="center">
								No ingredients found
							</StyledTableCell>
						</StyledTableRow>
					)}
					{ingredients.map((ingredient) => (
						<StyledTableRow
							key={ingredient.id}
							sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
						>
							<StyledTableCell component="th" scope="row">
								{ingredient.name}
							</StyledTableCell>
							<StyledTableCell align="right">
								{ingredient.price} / {ingredient.baseUnit}
							</StyledTableCell>
						</StyledTableRow>
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
