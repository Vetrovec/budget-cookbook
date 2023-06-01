import {
	createBrowserRouter,
	createRoutesFromElements,
	Navigate,
	Route,
} from 'react-router-dom';
import Layout from './components/Layout';
import { AddRecipe } from './routes/addRecipe';
import { Ingredients } from './routes/ingredients';
import { RecipeId } from './routes/recipeId';
import { Dashboard } from './routes/dashboard';
import { NotFound } from './routes/not-found';

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
