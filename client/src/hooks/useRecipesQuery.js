import { useQuery } from '@tanstack/react-query';

export function useRecipesQuery(options = { filter: {} }) {
	const priceLessThan = options.filter.priceLessThan;
	const selectedIngredient = options.filter.selectedIngredient;
	const recipeQuery = useQuery({
		queryKey: ['recipes', priceLessThan, selectedIngredient],
		queryFn: ({ signal }) => {
			const url = new URL('/recipe', window.location);
			if (priceLessThan) {
				url.searchParams.append('price_lt', priceLessThan);
			}
			if (selectedIngredient) {
				url.searchParams.append('ingredient', selectedIngredient);
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
				hasImage: recipe.hasImage,
			})),
	});
	return recipeQuery;
}
