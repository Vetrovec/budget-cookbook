import { useQuery } from '@tanstack/react-query';

export function useRecipeQuery({ id }) {
	const recipeQuery = useQuery({
		queryKey: ['recipe', id],
		queryFn: ({ signal }) =>
			fetch(`/recipe/${id}`, { signal }).then((response) => response.json()),
		select: (data) => ({
			id: data.id,
			name: data.name,
			description: data.description,
			price: Number(data.total_price),
		}),
	});
	return recipeQuery;
}
