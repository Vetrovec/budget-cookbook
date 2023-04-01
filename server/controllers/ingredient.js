const express = require('express');
const ingredientDao = require('../dao/IngredientDao');

const router = express.Router();

router.get('/', async (req, res) => {
	// Get all ingredients or a ingredient by id
	const id = req.query.id;
	if (id) {
		const ingredient = await ingredientDao.getById(id);
		res.status(200).json(ingredient);
		return;
	}
	const ingredients = await ingredientDao.getAll();
	res.status(200).json(ingredients);
});

router.post('/', async (req, res) => {
	// Create a new ingredient
	const ingredient = req.body;
	const newIngredientId = await ingredientDao.create(ingredient);
	res.status(201).json({
		id: newIngredientId,
	});
});

module.exports = router;
