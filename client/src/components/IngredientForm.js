import * as PropTypes from 'prop-types';
import { Box, Button, Typography } from '@mui/material';
import { TextField } from '@mui/material';
import { Paper } from '@mui/material';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
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
					value={name}
					onChange={(event) => setName(event.target.value)}
				/>
				<TextField
					size="small"
					label="Price"
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
				</Select>
				<Button type="submit" variant="contained">
					Add
				</Button>
			</Box>
		</Paper>
	);
}

const propTypes = {
	onSubmit: PropTypes.func.isRequired,
};
IngredientForm.propTypes = propTypes;
