const dbConnection = require('../dbConnection');

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
					description TEXT
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
	getAll() {
		return new Promise((resolve, reject) => {
			this.db.all('SELECT * FROM recipe', (err, rows) => {
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
	create(recipe) {
		return new Promise((resolve, reject) => {
			this.db.run(
				'INSERT INTO recipe (name, description) VALUES (?, ?)',
				[recipe.name, recipe.description],
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
