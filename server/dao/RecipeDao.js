const dbConnection = require('../dbConnection');
const recipeIngredientDao = require('./RecipeIngredientDao');

class RecipeDao {
	constructor(db) {
		this.db = db;
	}

	// Create table
	createTable() {
		return new Promise((resolve, reject) => {
			this.db.run(
				`CREATE TABLE IF NOT EXISTS recipe (
					id INTEGER PRIMARY KEY AUTOINCREMENT,
					name TEXT,
					description TEXT,
					duration INT,
					difficulty INT,
					total_price DECIMAL(10, 2)
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

	// Get all recipes
	getAll(filter) {
		return new Promise((resolve, reject) => {
			const params = [];
			let query = 'SELECT * FROM recipe WHERE 1';
			if (filter.ingredient) {
				query +=
					' AND id IN(SELECT recipe_id FROM recipe_ingredient WHERE recipe_ingredient.ingredient_id = ?)';
				params.push(filter.ingredient);
			}

			if (filter.price_lt) {
				query += ' AND total_price <= ?';
				params.push(filter.price_lt);
			}

			this.db.all(query, params, (err, rows) => {
				if (err) {
					reject(err);
					return;
				}
				resolve(rows);
			});
		});
	}

	// Get a recipe by id
	getById(id) {
		return new Promise((resolve, reject) => {
			this.db.get('SELECT * FROM recipe WHERE id = ?', [id], (err, row) => {
				if (err) {
					reject(err);
					return;
				}
				resolve(row);
			});
		});
	}

	// Create a new recipe
	async create(recipe, ingredients) {
		return new Promise((resolve, reject) => {
			const db = this.db;
			db.serialize(async function () {
				db.run('BEGIN');
				const recipeId = await new Promise((resolve, reject) => {
					db.run(
						'INSERT INTO recipe (name, description, duration, difficulty, total_price) VALUES (?, ?, ?, ?, ?)',
						[
							recipe.name,
							recipe.description,
							recipe.duration,
							recipe.difficulty,
							recipe.totalPrice,
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
				for (const ingredient of ingredients) {
					await recipeIngredientDao.create({
						recipeId: recipeId,
						ingredientId: ingredient.id,
						amount: ingredient.amount,
					});
				}
				db.exec('COMMIT');
				resolve(recipeId);
			});
		});
	}

	// Update a recipe
	update(recipe) {
		return new Promise((resolve, reject) => {
			this.db.run(
				'UPDATE recipe SET name = ?, description = ? WHERE id = ?',
				[recipe.name, recipe.description, recipe.id],
				function (err) {
					if (err) {
						reject(err);
						return;
					}
					resolve(this.changes);
				},
			);
		});
	}

	// Delete a recipe
	delete(id) {
		return new Promise((resolve, reject) => {
			this.db.run('DELETE FROM recipe WHERE id = ?', [id], function (err) {
				if (err) {
					reject(err);
					return;
				}
				resolve(this.changes);
			});
		});
	}
}

module.exports = new RecipeDao(dbConnection);
