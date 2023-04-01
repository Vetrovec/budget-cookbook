const dbConnection = require('../dbConnection');

// Create IngredientDao class with CRUD methods same as RecipeDao
class IngredientDao {
	constructor(db) {
		this.db = db;
	}

	// Create table
	createTable() {
		return new Promise((resolve, reject) => {
			this.db.run(
				'CREATE TABLE IF NOT EXISTS ingredient (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, description TEXT)',
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

	// Get all ingredients
	getAll() {
		return new Promise((resolve, reject) => {
			this.db.all('SELECT * FROM ingredient', (err, rows) => {
				if (err) {
					reject(err);
					return;
				}
				resolve(rows);
			});
		});
	}

	// Get an ingredient by id
	getById(id) {
		return new Promise((resolve, reject) => {
			this.db.get('SELECT * FROM ingredient WHERE id = ?', [id], (err, row) => {
				if (err) {
					reject(err);
					return;
				}
				resolve(row);
			});
		});
	}

	// Create a new ingredient
	create(ingredient) {
		return new Promise((resolve, reject) => {
			this.db.run(
				'INSERT INTO ingredient (name, description) VALUES (?, ?)',
				[ingredient.name, ingredient.description],
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

	// Update an ingredient
	update(ingredient) {
		return new Promise((resolve, reject) => {
			this.db.run(
				'UPDATE ingredient SET name = ?, description = ? WHERE id = ?',
				[ingredient.name, ingredient.description, ingredient.id],
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

	// Delete an ingredient
	delete(id) {
		return new Promise((resolve, reject) => {
			this.db.run('DELETE FROM ingredient WHERE id = ?', [id], (err) => {
				if (err) {
					reject(err);
					return;
				}
				resolve();
			});
		});
	}
}

module.exports = new IngredientDao(dbConnection);
