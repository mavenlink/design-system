module.exports = {
  moduleNameMapper: {
    '\.css$': 'identity-obj-proxy',
  },
  // Key is deprecated in future version in favor of setupFilesAfterEnv
  setupTestFrameworkScriptFile: '<rootDir>/setup-enzyme.js',
  testPathIgnorePatterns: [
    'node_modules',
    'styleguide/cypress/integration',
  ],
  verbose: true,
};
