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
    'no-descending-specificity': null,
  },
};
