const fs = require('fs');
const path = require('path');
const express = require('express');
const recipeRouter = require('./controllers/recipe');
const ingredientRouter = require('./controllers/ingredient');
const ingredientDao = require('./dao/IngredientDao');
const recipeDao = require('./dao/RecipeDao');
const recipeIngredientDao = require('./dao/RecipeIngredientDao');

const fileUpload = require('express-fileupload');

async function main() {
	await ingredientDao.createTable();
	await recipeDao.createTable();
	await recipeIngredientDao.createTable();

	let uploadDir = path.join(__dirname, '/upload')
	if (!fs.existsSync(uploadDir)) {
		fs.mkdirSync(uploadDir, 0o744);
	}

	console.log("Created");

	const app = express();
	// Use the express-fileupload middleware
	app.use(fileUpload({
		limits: {
			fileSize: 10000000,
		},
		abortOnLimit: true,
	}));


	app.use(express.static(path.join(__dirname, 'build')));
	app.use(express.static(path.join(__dirname, 'public')));
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
