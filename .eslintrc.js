module.exports = {
  env: {
    node: true,
    jest: true,
    es6: true
  },
  extends: ['standard', 'prettier'],
  plugins: ['prettier'],
  ignorePatterns: ['.eslintrc.js', 'jest.config.js'],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module'
  },
  rules: {
    semi: ['error', 'always'],
    'no-extra-boolean-cast': 'off',
    indent: ['error', 2],
    'comma-spacing': ['error', { before: false, after: true }],
    quotes: ['error', 'single'],
    'object-curly-spacing': [1, 'always'],
    'no-undef': 'off',
    'one-var': 'off',
    'no-unused-vars': ['warn', { vars: 'all', args: 'after-used', ignoreRestSiblings: false }],
    camelcase: 'off',
    'no-console': 'warn',
    'comma-dangle': ['error', 'never']
  }
};
