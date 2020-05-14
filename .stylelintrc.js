module.exports = {
  extends: [
    'stylelint-config-standard',
    'stylelint-config-css-modules',
  ],
  plugins: [
    'stylelint-css-modules',
    './src/linters/colors.js',
  ],
  rules: {
    'css-modules/composed-class-names': true,
    'css-modules/css-variables': true,
    'no-descending-specificity': null,
    'mds/colors': true,
  },
};
