import { useQuery } from '@tanstack/react-query';

export function useRecipesQuery() {
	const recipeQuery = useQuery({
		queryKey: ['recipes'],
		queryFn: () =>
			fetch('/recipe')
				.then((response) => response.json())
				.then((data) =>
					data.map((recipe) => ({
						id: recipe.id,
						name: recipe.name,
						description: recipe.description,
						price: Number(recipe.total_price),
					})),
				),
	});
	return recipeQuery;
}
