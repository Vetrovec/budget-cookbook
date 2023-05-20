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
		}),
	});
	return recipeQuery;
}
