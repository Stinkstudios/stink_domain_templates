module.exports = {
	env: {
		browser: true,
		es6: true
	},
	extends: [
		'eslint:recommended',
		'plugin:react/recommended',
		'plugin:prettier/recommended',
		'standard',
		'prettier',
		'prettier/react',
		'plugin:jsx-a11y/recommended'
	],
	globals: {
		Atomics: 'readonly',
		SharedArrayBuffer: 'readonly',
		PropTypes: 'readonly'
	},
	parserOptions: {
		ecmaFeatures: {
			jsx: true
		},
		ecmaVersion: 2018,
		sourceType: 'module'
	},
	plugins: ['react', 'prettier', 'import', 'jsx-a11y'],
	rules: {
		semi: ['error', 'never'],
		'react/react-in-jsx-scope': 'off',
		'react/jsx-max-depth': ['error', { max: 6 }],
		'import/no-unresolved': 'off',
		'react/display-name': 'error',
		'max-lines': ['error', 200],
		'react/prop-types': 'off',
		'no-console': 'error',
		'jsx-a11y/label-has-associated-control': [
			2,
			{
				required: {
					every: ['nesting', 'id']
				}
			}
		],
		'arrow-parens': ['error', 'always']
	},
	settings: {
		react: {
			version: '16.11.0'
		}
	},
	parser: 'babel-eslint'
}
