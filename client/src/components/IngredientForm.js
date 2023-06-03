import {
	Box,
	Button,
	MenuItem,
	Paper,
	Select,
	TextField,
	Typography,
} from '@mui/material';
import * as PropTypes from 'prop-types';
import { useState } from 'react';

export function IngredientForm({ onSubmit }) {
	const [name, setName] = useState('');
	const [price, setPrice] = useState('');
	const [baseUnit, setBaseUnit] = useState('g');

	const handleSubmit = (event) => {
		event.preventDefault();
		onSubmit({ name, price, baseUnit });
	};

	return (
		<Paper>
			<Box
				component="form"
				sx={{ display: 'flex', flexDirection: 'column', p: 2, gap: 2 }}
				onSubmit={handleSubmit}
			>
				<Typography variant="subtitle1">Add ingredient</Typography>
				<TextField
					size="small"
					label="Name"
					name="ingredient-name"
					autoComplete="off"
					value={name}
					onChange={(event) => setName(event.target.value)}
				/>
				<TextField
					size="small"
					label="Price (Kč)"
					name="ingredient-price"
					autoComplete="off"
					value={price}
					onChange={(event) => setPrice(event.target.value)}
				/>
				<Select
					size="small"
					value={baseUnit}
					onChange={(e) => setBaseUnit(e.target.value)}
				>
					<MenuItem value="g">Grams</MenuItem>
					<MenuItem value="ml">Milliliters</MenuItem>
					<MenuItem value="pc">Pieces</MenuItem>
				</Select>
				<Button type="submit" variant="contained">
					Add ingredient
				</Button>
			</Box>
		</Paper>
	);
}

const propTypes = {
	onSubmit: PropTypes.func.isRequired,
};
IngredientForm.propTypes = propTypes;
