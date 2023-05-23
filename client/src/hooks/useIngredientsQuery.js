import { useQuery } from '@tanstack/react-query';

export function useIngredientsQuery() {
	const ingredientQuery = useQuery({
		queryKey: ['ingredients'],
		queryFn: ({ signal }) =>
			fetch('/ingredient', { signal }).then((response) => response.json()),
		select: (data) =>
			data.map((ingredient) => ({
				id: ingredient.id,
				name: ingredient.name,
				price: Number(ingredient.price_per_unit),
				baseUnit: ingredient.base_unit,
			})),
	});
	return ingredientQuery;
}
