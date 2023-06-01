import { useQuery } from '@tanstack/react-query';

export function useRecipeQuery({ id }) {
	const recipeQuery = useQuery({
		queryKey: ['recipe', id],
		queryFn: ({ signal }) =>
			fetch(`/recipe/${id}`, { signal }).then((response) => response.json()),
		select: (data) => ({
			id: data.recipe.id,
			name: data.recipe.name,
			description: data.recipe.description,
			duration: data.recipe.duration,
			difficulty: data.recipe.difficulty,
			price: Number(data.recipe.total_price),
			hasImage: data.has_image,
			ingredients: data.ingredients.map((ingredient) => ({
				id: ingredient.id,
				name: ingredient.name,
				amount: Number(ingredient.amount),
				baseUnit: ingredient.base_unit,
				price: Number(ingredient.price_per_unit),
			})),
		}),
	});
	return recipeQuery;
}
