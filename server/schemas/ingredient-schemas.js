const createIngredientSchema = {
	type: 'object',
	properties: {
		name: { type: 'string' },
		baseUnit: { enum: ['g', 'ml', 'pc'] },
		pricePerUnit: { type: 'number' },
	},
	required: ['name', 'baseUnit', 'pricePerUnit'],
};

module.exports = {
	createIngredientSchema,
};
