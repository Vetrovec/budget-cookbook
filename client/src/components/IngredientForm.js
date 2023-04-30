import * as PropTypes from 'prop-types';
import { Box, Button, Typography } from '@mui/material';
import { TextField } from '@mui/material';
import { Paper } from '@mui/material';
import { useState } from 'react';

export function IngredientForm({ onSubmit }) {
	const [name, setName] = useState('');
	const [price, setPrice] = useState('');

	const handleSubmit = (event) => {
		event.preventDefault();
		onSubmit({ name, price });
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
