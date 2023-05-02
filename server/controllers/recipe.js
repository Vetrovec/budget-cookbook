const express = require("express");
const path = require("path");
const ingredientDao = require("../dao/IngredientDao");
const recipeDao = require("../dao/RecipeDao");
const recipeIngredientDao = require("../dao/RecipeIngredientDao");
const error = require("../helpers/error");

const router = express.Router();

const UPLOAD_DIR = path.join(__dirname, "/../public/upload");

// Get overview of all recipes
router.get("/", async (req, res) => {
  const filter = {};
  const { ingredient, maxPrice } = req.query;
  if (ingredient) {
    if (!ingredient instanceof Number) {
      res
        .status(400)
        .json(
          error.formatHttpError("Wrong ingredient ID", "err-wrong-ingredient")
        );
      return;
    }
    filter.ingredient = ingredient;
  }

  if (maxPrice) {
    if (!maxPrice instanceof Number) {
      res
        .status(400)
        .json(error.formatHttpError("Wrong maxPrice", "err-wrong-max-price"));
      return;
    }
    filter.maxPrice = maxPrice;
  }

  const recipes = await recipeDao.getAll(filter);
  res.status(200).json(recipes);
});

// Get details of a single recipe
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const recipe = await recipeDao.getById(id);
  if (!recipe) {
    res.status(404).end();
    return;
  }
  const ingredients = await recipeIngredientDao.getRecipeIngredients(id);
  const response = {
    recipe,
    ingredients,
  };
  res.status(200).json(response);
});

router.post("/image/:id", async (req, res) => {
  const id = req.params.id;
  const { image } = req.files;
  if (!image) {
    res
      .status(400)
      .json(error.formatHttpError("Image is missing", "err-missing-image"));
    return;
  }

  // If does not have image mime type prevent from uploading
  if (!/^image/.test(image.mimetype)) {
    res
      .status(400)
      .json(error.formatHttpError("File is not image", "err-not-image"));
    return;
  }

  await image.mv(path.join(UPLOAD_DIR, id));

  res.status(200).end();
});

// Creates a new recipe
router.post("/", async (req, res) => {
  const { recipe, ingredients } = req.body;
  if (!recipe) {
    res
      .status(400)
      .json(error.formatHttpError("Missing recipe", "err-missing-recipe"));
    return;
  }
  if (!ingredients || !Array.isArray(ingredients) || ingredients.length === 0) {
    res
      .status(400)
      .json(
        error.formatHttpError("Missing ingredients", "err-missing-ingredients")
      );
    return;
  }

  for (const ingredient of ingredients) {
    if (!ingredient.id || !ingredient.amount) {
      res
        .status(400)
        .json(
          error.formatHttpError(
            "Invalid ingredients",
            "err-invalid-ingredients"
          )
        );
      return;
    }
  }

  const { name, description, duration, difficulty } = recipe;
  if (!name || !name instanceof String) {
    res
      .status(400)
      .json(error.formatHttpError("Invalid name", "err-invalid-name"));
    return;
  }
  if (!description || !description instanceof String) {
    res
      .status(400)
      .json(
        error.formatHttpError("Invalid description", "err-invalid-description")
      );
    return;
  }
  if (!duration || !duration instanceof Number) {
    res
      .status(400)
      .json(error.formatHttpError("Invalid duration", "err-invalid-duration"));
    return;
  }
  if (!difficulty || !duration instanceof Number) {
    res
      .status(400)
      .json(
        error.formatHttpError("Invalid difficulty", "err-invalid-difficulty")
      );
    return;
  }

  const fetchedIngredients = await ingredientDao.getByIds(
    ingredients.map((i) => {
      return i.id;
    })
  );
  if (fetchedIngredients.length != ingredients.length) {
    res
      .status(400)
      .json(
        error.formatHttpError(
          "Non existent ingredient",
          "err-non-existent-ingredient"
        )
      );
    return;
  }

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
});

module.exports = router;
