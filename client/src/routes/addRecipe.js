import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { RecipeForm } from '../components/RecipeForm';
import { useIngredientsQuery } from '../hooks/useIngredientsQuery';

export function AddRecipe() {
	const navigate = useNavigate();

	const ingredientQuery = useIngredientsQuery();

	const handleRecipeSubmit = async (recipe) => {
		const response = await fetch('/recipe', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				recipe: {
					name: recipe.name,
					description: recipe.description,
					duration: recipe.duration,
					difficulty: recipe.difficulty,
				},
				ingredients: recipe.ingredients,
			}),
		});
		if (response.status !== 201) {
			// TODO: Show alert
			return;
		}
		const { id } = await response.json();
		if (recipe.previewImage) {
			const data = new FormData();
			data.append('image', recipe.previewImage);
			await fetch(`/recipe/image/${id}`, {
				method: 'POST',
				body: data,
			});
		}
		navigate(`/recipe/${id}`);
	};

	return (
		<Layout>
			<RecipeForm
				ingredients={ingredientQuery.data ?? []}
				onSubmit={handleRecipeSubmit}
			/>
		</Layout>
	);
}
