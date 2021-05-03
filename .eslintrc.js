module.exports = {
  env: {
    browser: true,
    jest: true,
  },
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['import', '@typescript-eslint'],
  rules: {
    '@typescript-eslint/camelcase': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/prefer-interface': 'off',
    "@typescript-eslint/no-unused-vars": 'error',
    'no-return-assign': 0,
    'no-console': 2,
    'import/order': ['error', {
      'groups': ['builtin', 'external', 'internal', 'index', 'sibling', 'parent'],
      'newlines-between': 'always',
    }],
    'import/no-named-export': 0,
    'import/newline-after-import': 2,
    'import/named': 0, // ref: https://github.com/benmosher/eslint-plugin-import/issues/1282
  },
  settings: { },
}
