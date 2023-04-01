module.exports = {
	env: {
		browser: true,
		es2021: true,
	},
	extends: [
		'eslint:recommended',
		'plugin:react/recommended',
		'prettier',
		'plugin:react/jsx-runtime',
	],
	overrides: [
		{
			files: ['**/*.test.js', '**/*.test.jsx'],
			env: {
				jest: true,
			},
		},
	],
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
	},
	plugins: ['react'],
	ignorePattern: ['node_modules/', 'build/', 'eslintrc.js'],
};
