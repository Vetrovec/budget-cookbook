require('dotenv').config();
const fs = require('fs');
const path = require('path');
const express = require('express');
const { UPLOAD_DIR } = require('./config');
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

	if (!fs.existsSync(UPLOAD_DIR)) {
		fs.mkdirSync(UPLOAD_DIR, 0o744);
	}

	const app = express();

	app.use(express.static(path.join(__dirname, 'build')));
	app.get('/', function (_, res) {
		res.sendFile(path.join(__dirname, 'build', 'index.html'));
	});

	app.use(express.static(UPLOAD_DIR));

	app.use(express.json());
	app.use(express.urlencoded({ extended: true }));
	// Use the express-fileupload middleware
	app.use(
		fileUpload({
			limits: {
				fileSize: 10000000,
			},
			abortOnLimit: true,
		}),
	);

	app.use('/ingredient', ingredientRouter);
	app.use('/recipe', recipeRouter);

	app.listen(3000, () => {
		console.log('Express server listening on port 3000.');
	});
}

main();
