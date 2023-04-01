import { useEffect, useState } from 'react';
import './App.css';

function App() {
	const [ingredients, setIngredients] = useState(null);
	const [recipes, setRecipes] = useState(null);

	useEffect(() => {
		fetch('/ingredient')
			.then((response) => response.json())
			.then((data) => setIngredients(data));
	}, []);

	useEffect(() => {
		fetch('/recipe')
			.then((response) => response.json())
			.then((data) => setRecipes(data));
	}, []);

	return (
		<div className="App">
			<header className="App-header">
				<p>Budget cookbook</p>
				<h1>Ingredients</h1>
				{ingredients?.length ? (
					<ul>
						{ingredients.map((ingredient) => (
							<li key={ingredient.id}>
								{ingredient.name} - {ingredient.description}
							</li>
						))}
					</ul>
				) : ingredients?.length === 0 ? (
					<p>Ingredients are empty</p>
				) : (
					<p>Loading ingredients...</p>
				)}
				<h1>Recipes</h1>
				{recipes?.length ? (
					<ul>
						{recipes.map((recipe) => (
							<li key={recipe.id}>
								{recipe.name} - {recipe.description}
							</li>
						))}
					</ul>
				) : recipes?.length === 0 ? (
					<p>Recipes are empty</p>
				) : (
					<p>Loading recipes...</p>
				)}
			</header>
		</div>
	);
}

export default App;
