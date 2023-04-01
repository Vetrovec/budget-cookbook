const express = require('express');
const recipeDao = require('../dao/RecipeDao');

const router = express.Router();

router.get('/', async (req, res) => {
	// Get all recipes or a recipe by id
	const id = req.query.id;
	if (id) {
		const recipe = await recipeDao.getById(id);
		res.status(200).json(recipe);
		return;
	}
	const recipes = await recipeDao.getAll();
	res.status(200).json(recipes);
});

router.post('/', async (req, res) => {
	// Create a new recipe
	const recipe = req.body;
	const newRecipeId = await recipeDao.create(recipe);
	res.status(201).json({
		id: newRecipeId,
	});
});

module.exports = router;
