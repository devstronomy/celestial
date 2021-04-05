module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true,
    node: true,
  },

  parserOptions: {
    sourceType: 'module',
  },

  extends: ['eslint:recommended'],

  rules: {
    'no-case-declarations': ['off'],
    'no-unused-vars': [
      'error',
      {
        ignoreRestSiblings: true,
        argsIgnorePattern: '^_',
      },
    ],
  },
}
