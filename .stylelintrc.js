module.exports = {
  extends: [
    'stylelint-config-standard',
    'stylelint-config-css-modules',
  ],
  plugins: [
    'stylelint-css-modules',
  ],
  rules: {
    'css-modules/composed-class-names': true,
    'css-modules/css-variables': true,
    'no-descending-specificity': null,
  },
};
