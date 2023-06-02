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
	createRecipeSchema,
};
