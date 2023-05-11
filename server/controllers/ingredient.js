const express = require("express");
const ingredientDao = require("../dao/IngredientDao");

const router = express.Router();

// Get overview of all ingredients
router.get("/", async (req, res) => {
  const ingredients = await ingredientDao.getAll();
  res.status(200).json(ingredients);
});

// Get details of a single ingredient
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const ingredient = await ingredientDao.getById(id);
  res.status(200).json(ingredient);
});

// Create a new ingredient
router.post("/", async (req, res) => {
  const ingredient = req.body;
  const newIngredientId = await ingredientDao.create(ingredient);
  res.status(201).json({
    id: newIngredientId,
  });
});

module.exports = router;
