module.exports = {
  extends: 'mavenlint',
  plugins: ['mavenlint'],
  rules: {
    'react/jsx-boolean-value': 'off',
    'mavenlint/use-flux-standard-actions': 'error',
    'mavenlint/use-css-composition': 'error',
    'mavenlint/no-unnecessary-jasmine-enzyme': 'error',
  },
};
