import {
	Box,
	List,
	ListItem,
	Paper,
	TextField,
	Typography,
} from '@mui/material';
import * as PropTypes from 'prop-types';
import { useState } from 'react';
import { roundTo } from '../helpers/numberUtil';

export function RecipeIngredientList({ ingredients, totalPrice }) {
	const [portionsInput, setPortionsInput] = useState('1');
	const portions = Number.isNaN(Number(portionsInput))
		? 1
		: Number(portionsInput);
	const totalPriceForPortions = roundTo(totalPrice * portions, 2);

	return (
		<Box component={Paper} sx={{ p: 2 }}>
			<Typography variant="h5">Ingredients</Typography>
			<Box sx={{ display: 'flex', alignItems: 'center', mt: 2, gap: 1 }}>
				<Typography variant="body2">Calculate for</Typography>
				<TextField
					type="number"
					size="small"
					autoComplete="off"
					inputProps={{ min: 1, max: 99, step: 1 }}
					value={portionsInput}
					variant="outlined"
					onChange={(e) => setPortionsInput(e.target.value)}
				/>
				<Typography variant="body2">portion(s)</Typography>
			</Box>
			<List>
				{ingredients.map((ingredient) => {
					const amount = roundTo(ingredient.amount * portions, 3);
					const price = roundTo(
						ingredient.price * ingredient.amount * portions,
						2,
					);
					return (
						<ListItem key={ingredient.id}>
							<List>
								<ListItem>
									<Typography variant="body1">{ingredient.name}</Typography>
								</ListItem>
								<ListItem>
									<Typography variant="body2">
										Amount: {`${amount} ${ingredient.baseUnit}`}
									</Typography>
								</ListItem>
								<ListItem>
									<Typography variant="body2">Price: {price} Kč</Typography>
								</ListItem>
							</List>
						</ListItem>
					);
				})}
			</List>
			<Typography variant="subtitle1">
				Total price: {totalPriceForPortions} Kč
			</Typography>
		</Box>
	);
}

const propTypes = {
	ingredients: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.number.isRequired,
			name: PropTypes.string.isRequired,
			amount: PropTypes.number.isRequired,
			baseUnit: PropTypes.string.isRequired,
			price: PropTypes.number.isRequired,
		}).isRequired,
	).isRequired,
	totalPrice: PropTypes.number.isRequired,
};
RecipeIngredientList.propTypes = propTypes;
