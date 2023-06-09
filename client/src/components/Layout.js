import {
	AppBar,
	Box,
	Button,
	CssBaseline,
	Toolbar,
	Typography,
} from '@mui/material';
import RestaurantOutlinedIcon from '@mui/icons-material/RestaurantOutlined';
import { Link, Outlet } from 'react-router-dom';

export default function Layout() {
	return (
		<Box sx={{ display: 'flex', minHeight: '100%', bgcolor: 'grey.200' }}>
			<CssBaseline />
			<AppBar component="nav">
				<Toolbar>
					<Box
						sx={{ display: 'flex', alignItems: 'center', flexGrow: 1, gap: 1 }}
					>
						<RestaurantOutlinedIcon />
						<Typography variant="h6" component="span">
							Budget Cookbook
						</Typography>
					</Box>
					<Box sx={{ display: 'flex', gap: 1 }}>
						<Button component={Link} to="/dashboard" sx={{ color: '#fff' }}>
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
			<Box
				component="main"
				sx={{ display: 'flex', width: '100%', flexDirection: 'column', p: 3 }}
			>
				<Toolbar />
				<Box sx={{ flex: 'auto' }}>
					<Outlet />
				</Box>
				<Box
					sx={{
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						pt: 4,
					}}
				>
					<Typography align="center" color="GrayText" variant="subtitle2">
						&copy; 2023 - Budget Cookbook
					</Typography>
				</Box>
			</Box>
		</Box>
	);
}
