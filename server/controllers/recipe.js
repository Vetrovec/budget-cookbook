const express = require('express');
const recipeDao = require('../dao/RecipeDao');
const recipeIngredientDao = require('../dao/RecipeIngredientDao');

const router = express.Router();

// Get overview of all recipes
router.get('/', async (req, res) => {
	const { price_lt: priceLessThan } = req.query;
	if (priceLessThan) {
		const recipes = await recipeIngredientDao.getRecipesWithPriceLessThan(
			Number(priceLessThan),
		);
		res.status(200).json(recipes);
		return;
	}
	const recipes = await recipeIngredientDao.getRecipesWithPrice();
	res.status(200).json(recipes);
});

// Get details of a single recipe
router.get('/:id', async (req, res) => {
	const id = req.params.id;
	const recipe = await recipeIngredientDao.getRecipeWithPrice(id);
	res.status(200).json(recipe);
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
