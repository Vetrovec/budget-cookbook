const express = require('express');
const Ajv = require('ajv').default;
const ingredientDao = require('../dao/IngredientDao');
const { createIngredientSchema } = require('../schemas/ingredient-schemas');

const router = express.Router();

// Get overview of all ingredients
router.get('/', async (req, res) => {
	const ingredients = await ingredientDao.getAll();
	res.status(200).json(ingredients);
});

// Get details of a single ingredient
router.get('/:id', async (req, res) => {
	const id = req.params.id;
	const ingredient = await ingredientDao.getById(id);
	res.status(200).json(ingredient);
});

// Create a new ingredient
router.post('/', async (req, res) => {
	const ajv = new Ajv();
	const valid = ajv.validate(createIngredientSchema, req.body);
	if (valid) {
		const ingredient = req.body;
		const newIngredientId = await ingredientDao.create(ingredient);
		res.status(201).json({
			id: newIngredientId,
		});
	} else {
		res.status(400).send({
			errorMessage: 'validation of input failed',
			params: req.body,
			reason: ajv.errors,
		});
	}
});

module.exports = router;
