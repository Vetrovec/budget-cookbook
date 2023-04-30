import { useQuery } from '@tanstack/react-query';

export function useIngredientQuery() {
	const ingredientQuery = useQuery({
		queryKey: ['ingredients'],
		queryFn: () =>
			fetch('/ingredient')
				.then((response) => response.json())
				.then((data) =>
					data.map((ingredient) => ({
						id: ingredient.id,
						name: ingredient.name,
						price: Number(ingredient.price_per_unit),
					})),
				),
	});
	return ingredientQuery;
}
