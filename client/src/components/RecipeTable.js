import {
	Paper,
	Table,
	TableBody,
	TableContainer,
	TableHead,
	Typography,
	useTheme,
} from '@mui/material';
import * as PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { StyledTableCell } from '../styled/StyledTableCell';
import { StyledTableRow } from '../styled/StyledTableRow';

export function RecipeTable({ isLoading, recipes }) {
	const navigate = useNavigate();
	const theme = useTheme();

	return (
		<TableContainer component={Paper}>
			<Table aria-label="Recipe table">
				<TableHead>
					<StyledTableRow>
						<StyledTableCell component="th">Name</StyledTableCell>
						<StyledTableCell component="th">Duration</StyledTableCell>
						<StyledTableCell component="th">Difficulty</StyledTableCell>
						<StyledTableCell component="th" align="right">
							Price
						</StyledTableCell>
					</StyledTableRow>
				</TableHead>
				<TableBody>
					{isLoading ? (
						<StyledTableRow>
							<StyledTableCell colSpan={4} align="center">
								Loading recipes...
							</StyledTableCell>
						</StyledTableRow>
					) : (
						<>
							{!recipes?.length && (
								<StyledTableRow>
									<StyledTableCell colSpan={4} align="center">
										No recipes found
									</StyledTableCell>
								</StyledTableRow>
							)}
							{recipes?.map((recipe) => (
								<StyledTableRow
									key={recipe.id}
									onClick={() => navigate(`/recipe/${recipe.id}`)}
									sx={{
										cursor: 'pointer',
										textDecoration: 'none',
										'&:last-child td, &:last-child th': { border: 0 },
										'&:hover': { backgroundColor: theme.palette.grey[100] },
									}}
								>
									<StyledTableCell>
										<Typography
											sx={{
												overflow: 'hidden',
												maxWidth: '50vw',
												textOverflow: 'ellipsis',
												whiteSpace: 'nowrap',
											}}
										>
											{recipe.name}
										</Typography>
									</StyledTableCell>
									<StyledTableCell>{recipe.duration}</StyledTableCell>
									<StyledTableCell>{recipe.difficulty}</StyledTableCell>
									<StyledTableCell align="right">
										{recipe.price}
									</StyledTableCell>
								</StyledTableRow>
							))}
						</>
					)}
				</TableBody>
			</Table>
		</TableContainer>
	);
}

const propTypes = {
	isLoading: PropTypes.bool.isRequired,
	recipes: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.number.isRequired,
			name: PropTypes.string.isRequired,
			duration: PropTypes.string.isRequired,
			difficulty: PropTypes.string.isRequired,
			price: PropTypes.number.isRequired,
		}),
	),
};
RecipeTable.propTypes = propTypes;
