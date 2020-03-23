module.exports = {
  env: {
    browser: true,
  },
  extends: 'mavenlint-react',
  parser: 'babel-eslint',
  rules: {
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
