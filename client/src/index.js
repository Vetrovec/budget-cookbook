import 'react-quill/dist/quill.snow.css';
import 'react-toastify/dist/ReactToastify.css';
import './index.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import reportWebVitals from './reportWebVitals';
import { AddRecipe } from './routes/addRecipe';
import { Ingredients } from './routes/ingredients';
import { RecipeId } from './routes/recipeId';
import { Root } from './routes/root';

const router = createBrowserRouter([
	{
		path: '/',
		element: <Root />,
	},
	{
		path: '/ingredients',
		element: <Ingredients />,
	},
	{
		path: '/add-recipe',
		element: <AddRecipe />,
	},
	{
		path: '/recipe/:id',
		element: <RecipeId />,
	},
]);

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<QueryClientProvider client={queryClient}>
			<ToastContainer />
			<RouterProvider router={router} />
		</QueryClientProvider>
	</React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
