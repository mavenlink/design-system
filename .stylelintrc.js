module.exports = {
  extends: [
    'stylelint-config-standard',
    'stylelint-config-css-modules',
  ],
  plugins: [
    'stylelint-css-modules',
    './src/linters/colors.js',
    './src/linters/typography.js',
    './src/linters/spacing.js',
  ],
  rules: {
    'css-modules/composed-class-names': true,
    'css-modules/css-variables': true,
    'no-descending-specificity': null,
    'mds/colors': true,
    'mds/typography': true,
    'mds/spacing': true,
  },
};
