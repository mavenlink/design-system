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
    'import/extensions': 'off',
    'no-mixed-operators': ['error', {
      allowSamePrecedence: true,
    }],
  },
  overrides: [{
    files: [
      '**/jest*',
      '**/*.test.js',
      '**/*.test.jsx',
    ],
    env: {
      jest: true,
    },
    rules: {
      'jsx-a11y/label-has-for': 'off',
      'jsx-a11y/no-noninteractive-tabindex': 'off',
      'jsx-a11y/no-static-element-interactions': 'off',
      'max-len': 'off',
      'react/prop-types': 'off',
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
