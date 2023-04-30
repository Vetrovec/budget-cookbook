import { useQuery } from '@tanstack/react-query';

export function useRecipeQuery({ id }) {
	const recipeQuery = useQuery({
		queryKey: ['recipe', id],
		queryFn: () => fetch(`/recipe/${id}`).then((response) => response.json()),
	});
	return recipeQuery;
}
