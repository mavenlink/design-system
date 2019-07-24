module.exports = {
  extends: [
    'stylelint-config-standard',
  ],
  plugins: [
  ],
  rules: {
    'no-descending-specificity': null,
    'property-no-unknown': null, // TODO: We need to support CSS modules
    'selector-pseudo-class-no-unknown': null, // TODO: We need to support CSS modules
  },
};
