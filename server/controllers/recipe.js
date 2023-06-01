const fs = require('fs');
const path = require('path');
const express = require('express');
const Ajv = require('ajv').default;
const ingredientDao = require('../dao/IngredientDao');
const recipeDao = require('../dao/RecipeDao');
const recipeIngredientDao = require('../dao/RecipeIngredientDao');
const error = require('../helpers/error');

const router = express.Router();

const UPLOAD_DIR = path.join(__dirname, '/../public/upload');

//Object schema
const schema = {
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

// Get overview of all recipes
router.get('/', async (req, res) => {
	const filter = {};
	const { ingredient, price_lt } = req.query;
	if (ingredient) {
		if (!ingredient instanceof Number) {
			res
				.status(400)
				.json(
					error.formatHttpError('Wrong ingredient ID', 'err-wrong-ingredient'),
				);
			return;
		}
		filter.ingredient = ingredient;
	}

	if (price_lt) {
		if (!price_lt instanceof Number) {
			res
				.status(400)
				.json(error.formatHttpError('Wrong maxPrice', 'err-wrong-max-price'));
			return;
		}
		filter.price_lt = price_lt;
	}

	const recipes = await recipeDao.getAll(filter);
	res.status(200).json(recipes);
});

// Get details of a single recipe
router.get('/:id', async (req, res) => {
	const id = req.params.id;
	const recipe = await recipeDao.getById(id);
	if (!recipe) {
		res.status(404).end();
		return;
	}
	const ingredients = await recipeIngredientDao.getRecipeIngredients(id);
	const imagePath = path.join(UPLOAD_DIR, id);
	const hasImage = fs.existsSync(imagePath);
	const response = {
		recipe,
		ingredients,
		has_image: hasImage,
	};
	res.status(200).json(response);
});

router.post('/image/:id', async (req, res) => {
	const id = req.params.id;
	const { image } = req.files;
	if (!image) {
		res
			.status(400)
			.json(error.formatHttpError('Image is missing', 'err-missing-image'));
		return;
	}

	// If does not have image mime type prevent from uploading
	if (!/^image/.test(image.mimetype)) {
		res
			.status(400)
			.json(error.formatHttpError('File is not image', 'err-not-image'));
		return;
	}

	await image.mv(path.join(UPLOAD_DIR, id));

	res.status(200).end();
});

// Creates a new recipe
router.post('/', async (req, res) => {
	const { recipe, ingredients } = req.body;

	const ajv = new Ajv();
	const valid = ajv.validate(schema, req.body);
	if (valid) {
		const fetchedIngredients = await ingredientDao.getByIds(
			ingredients.map((i) => {
				return i.id;
			}),
		);

		let totalPrice = 0;
		for (const fetchedIngredient of fetchedIngredients) {
			for (const ingredient of ingredients) {
				if (fetchedIngredient.id == ingredient.id) {
					totalPrice += ingredient.amount * fetchedIngredient.price_per_unit;
				}
			}
		}
		recipe.totalPrice = totalPrice;

		const newRecipeId = await recipeDao.create(recipe, ingredients);

		res.status(201).json({
			id: newRecipeId,
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
