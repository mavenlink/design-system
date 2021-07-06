module.exports = {
  env: {
    browser: true,
  },
  extends: 'mavenlint-react',
  parser: 'babel-eslint',
  rules: {
    'prefer-arrow-callback': ['error', {
      allowNamedFunctions: true,
    }],
    'import/extensions': ['error', 'always', {
      ignorePackages: true,
    }],
    'no-mixed-operators': ['error', {
      allowSamePrecedence: true,
    }],
  },
  overrides: [{
    files: [
      '**/*.test.js',
      '**/*.test.jsx',
    ],
    env: {
      jest: true,
      'jest/globals': true,
    },
    rules: {
      'jsx-a11y/label-has-for': 'off',
      'jsx-a11y/no-noninteractive-tabindex': 'off',
      'jsx-a11y/no-static-element-interactions': 'off',
      'max-len': 'off',
    },
  }, {
    files: [
      '.*.js',
      '*.config.js',
    ],
    rules: {
      'import/no-commonjs': 'off',
    },
  }],
};
