import { useQuery } from '@tanstack/react-query';

export function useRecipesQuery() {
	const recipeQuery = useQuery({
		queryKey: ['recipes'],
		queryFn: () => fetch('/recipe').then((response) => response.json()),
	});
	return recipeQuery;
}
