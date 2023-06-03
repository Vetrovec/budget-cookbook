import {
	createBrowserRouter,
	createRoutesFromElements,
	Navigate,
	Route,
} from 'react-router-dom';
import Layout from './components/Layout';
import { AddRecipe } from './routes/add-recipe';
import { Dashboard } from './routes/dashboard';
import { Ingredients } from './routes/ingredients';
import { NotFound } from './routes/not-found';
import { RecipeId } from './routes/recipe-id';

// Create a router that uses the elements from the routes folder
// and wraps them in a Layout component
export const router = createBrowserRouter(
	createRoutesFromElements(
		<Route element={<Layout />}>
			<Route path="/dashboard" element={<Dashboard />} />
			<Route path="/ingredients" element={<Ingredients />} />
			<Route path="/add-recipe" element={<AddRecipe />} />
			<Route path="/recipe/:id" element={<RecipeId />} />
			<Route path="/" element={<Navigate to="/dashboard" />} />
			<Route path="*" element={<NotFound />} />
		</Route>,
	),
);
