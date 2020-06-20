module.exports = {
	env: {
		browser: true,
		es6: true,
	},
	extends: [
		'plugin:react/recommended',
		'airbnb',
	],
	globals: {
		Atomics: 'readonly',
		SharedArrayBuffer: 'readonly',
	},
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaFeatures: {
			jsx: true,
		},
		ecmaVersion: 2018,
	},
	plugins: [
		'react',
		'@typescript-eslint',
	],
	rules: {
		'import/prefer-default-export': 0,
		'react/jsx-filename-extension': [
			1,
			{
				extensions:
        ['.js', '.jsx', '.ts', '.tsx'],
			},
    ],
    indent: 0,
    'eol-last': 0,
		'import/extensions': 0,
		'no-tabs': [0, { allowIndentationTabs: true }],
	},
	settings: {
		'import/parsers': {
			'@typescript-eslint/parser': ['.ts', '.tsx'],
		},
		'import/resolver': {
			node: {
				extensions: ['.js', '.jsx', '.ts', '.tsx'],
			},
		},
	},
};
