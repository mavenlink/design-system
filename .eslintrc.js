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
  },
  overrides: [{
    files: [
      '**/*.test.js',
      '**/*.test.jsx',
    ],
    env: {
      jest: true,
    },
    rules: {
      'jsx-a11y/label-has-for': 'off',
      'jsx-a11y/no-noninteractive-tabindex': 'off',
    },
  }, {
    files: [
      '.eslintrc.js',
      '.stylintrc.js',
      'jest.config.js',
    ],
    rules: {
      'import/no-commonjs': 'off',
    },
  }],
};
