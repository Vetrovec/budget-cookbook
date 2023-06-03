const createIngredientSchema = {
	type: 'object',
	properties: {
		name: { type: 'string', maxLength: 64, minLength: 1 },
		baseUnit: { enum: ['g', 'ml', 'pc'], maxLength: 8, minLength: 1 },
		pricePerUnit: { type: 'number' },
	},
	required: ['name', 'baseUnit', 'pricePerUnit'],
};

module.exports = {
	createIngredientSchema,
};
