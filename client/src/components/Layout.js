import * as PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

export default function Layout({ children }) {
	return (
		<Box sx={{ display: 'flex', height: '100%', bgcolor: 'grey.100' }}>
			<CssBaseline />
			<AppBar component="nav">
				<Toolbar>
					<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
						Budget Cookbook
					</Typography>
					<Box sx={{ display: 'flex', gap: 1 }}>
						<Button component={Link} to="/" sx={{ color: '#fff' }}>
							Dashboard
						</Button>
						<Button component={Link} to="/ingredients" sx={{ color: '#fff' }}>
							Ingredients
						</Button>
						<Button component={Link} to="/add-recipe" sx={{ color: '#fff' }}>
							Add recipe
						</Button>
					</Box>
				</Toolbar>
			</AppBar>
			<Box component="main" sx={{ width: '100%', p: 3, bgcolor: 'primary.50' }}>
				<Toolbar />
				{children}
			</Box>
		</Box>
	);
}

const propTypes = {
	children: PropTypes.node.isRequired,
};
Layout.propTypes = propTypes;
