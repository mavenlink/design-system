module.exports = {
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
    ],
    rules: {
      'import/no-commonjs': 'off',
    },
  }, {
    files: [
      '**/file-picker/file-picker*',
    ],
    rules: {
      // Override: role button for file-picker's label allows it to
      // behave as a file dialog open button in my VoiceOver testing
      'jsx-a11y/no-noninteractive-element-to-interactive-role': [
        'error',
        {
          label: [
            'button',
          ],
        },
      ],
    },
  }],
};
