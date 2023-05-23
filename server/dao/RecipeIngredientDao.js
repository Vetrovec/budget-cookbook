const dbConnection = require('../dbConnection');

class RecipeDao {
	constructor(db) {
		this.db = db;
	}

	createTable() {
		return new Promise((resolve, reject) => {
			this.db.run(
				`CREATE TABLE IF NOT EXISTS recipe_ingredient (
					recipe_id INTEGER,
					ingredient_id INTEGER,
					amount REAL,
					PRIMARY KEY (recipe_id, ingredient_id),
					FOREIGN KEY (recipe_id) REFERENCES recipeDao(id) ON DELETE CASCADE,
					FOREIGN KEY (ingredient_id) REFERENCES ingredientDao(id) ON DELETE RESTRICT
				)`,
				(err) => {
					if (err) {
						reject(err);
						return;
					}
					resolve();
				},
			);
		});
	}

	getRecipeIngredients(recipeId) {
		return new Promise((resolve, reject) => {
			this.db.all(
				`SELECT *
				FROM recipe_ingredient
				LEFT JOIN ingredient ON recipe_ingredient.ingredient_id = ingredient.id
				WHERE recipe_ingredient.recipe_id = ?`,
				[recipeId],
				(err, rows) => {
					if (err) {
						reject(err);
						return;
					}
					resolve(rows);
				},
			);
		});
	}

	// Create a new recipe
	create(recipeIngredient) {
		return new Promise((resolve, reject) => {
			this.db.run(
				'INSERT INTO recipe_ingredient (recipe_id, ingredient_id, amount) VALUES (?, ?, ?)',
				[
					recipeIngredient.recipeId,
					recipeIngredient.ingredientId,
					recipeIngredient.amount,
				],
				function (err) {
					if (err) {
						reject(err);
						return;
					}
					resolve(this.lastID);
				},
			);
		});
	}
}

module.exports = new RecipeDao(dbConnection);
