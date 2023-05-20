import { useQuery } from '@tanstack/react-query';

export function useRecipesQuery(options = {}) {
	const priceLessThan = options.priceLessThan ?? '';
	const recipeQuery = useQuery({
		queryKey: ['recipes', priceLessThan],
		queryFn: ({ signal }) => {
			let url = '/recipe';
			if (priceLessThan) {
				url += `?price_lt=${priceLessThan}`;
			}
			return fetch(url, { signal }).then((response) => response.json());
		},
		select: (data) =>
			data.map((recipe) => ({
				id: recipe.id,
				name: recipe.name,
				duration: recipe.duration,
				difficulty: recipe.difficulty,
				price: Number(recipe.total_price),
			})),
	});
	return recipeQuery;
}
