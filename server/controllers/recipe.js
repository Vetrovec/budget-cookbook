const express = require('express');
const recipeDao = require('../dao/RecipeDao');
const recipeIngredientDao = require('../dao/RecipeIngredientDao');

const router = express.Router();

// Get overview of all recipes
router.get('/', async (req, res) => {
	const recipes = await recipeDao.getAll();
	res.status(200).json(recipes);
});

// Get details of a single recipe
router.get('/:id', async (req, res) => {
	const id = req.params.id;
	const recipe = await recipeDao.getById(id);
	const totalPrice = await recipeIngredientDao.getTotalRecipePrice(id);
	const response = {
		recipe,
		totalPrice,
	};
	res.status(200).json(response);
});

// Creates a new recipe
router.post('/', async (req, res) => {
	const { recipe } = req.body;
	const { name, description, ingredients } = recipe;
	// TODO: This should be done in a transaction
	const newRecipeId = await recipeDao.create({
		name,
		description,
	});
	for (const ingredient of ingredients) {
		await recipeIngredientDao.create({
			recipeId: newRecipeId,
			ingredientId: ingredient.id,
			amount: ingredient.amount,
		});
	}
	res.status(201).json({
		id: newRecipeId,
	});
});

module.exports = router;
