import { useQuery } from '@tanstack/react-query';

export function useRecipeQuery({ id }) {
	const recipeQuery = useQuery({
		queryKey: ['recipe', id],
		queryFn: () =>
			fetch(`/recipe/${id}`)
				.then((response) => response.json())
				.then((data) => ({
					id: data.id,
					name: data.name,
					description: data.description,
					price: Number(data.total_price),
				})),
	});
	return recipeQuery;
}
