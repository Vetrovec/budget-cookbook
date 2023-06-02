const getRecipeSchema = {
	type: 'object',
	properties: {
		ingredient: {
			type: 'string',
			pattern: '^[0-9]+$',
		},
		price_lt: {
			type: 'string',
			pattern: '^\\d+(\\.\\d{1,2})?$',
		},
	},
};

const createRecipeSchema = {
	type: 'object',
	properties: {
		recipe: {
			type: 'object',
			properties: {
				name: { type: 'string' },
				description: { type: 'string' },
				duration: { type: 'string' },
				difficulty: { type: 'string' },
			},
			required: ['name', 'description', 'duration', 'difficulty'],
		},
		ingredients: {
			type: 'array',
			items: {
				type: 'object',
				properties: {
					id: { type: 'number' },
					amount: { type: 'number' },
				},
				required: ['id', 'amount'],
			},
		},
	},
	required: ['recipe', 'ingredients'],
};

module.exports = {
	getRecipeSchema,
	createRecipeSchema,
};
