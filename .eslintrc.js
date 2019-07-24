module.exports = {
  extends: 'mavenlint-react',
  parser: 'babel-eslint',
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
    ],
    rules: {
      'import/no-commonjs': 'off',
    },
  }],
};
