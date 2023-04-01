const path = require('path');
const express = require('express');
const recipeRouter = require('./controllers/recipe');
const ingredientRouter = require('./controllers/ingredient');
const ingredientDao = require('./dao/IngredientDao');
const recipeDao = require('./dao/RecipeDao');

async function main() {
	await ingredientDao.createTable();
	await recipeDao.createTable();

	const app = express();

	app.use(express.static(path.join(__dirname, 'build')));
	app.get('/', function (req, res) {
		res.sendFile(path.join(__dirname, 'build', 'index.html'));
	});

	app.use(express.json());
	app.use(express.urlencoded({ extended: true }));

	app.use('/ingredient', ingredientRouter);
	app.use('/recipe', recipeRouter);

	app.listen(3000, () => {
		console.log('Express server listening on port 3000.');
	});
}

main();
