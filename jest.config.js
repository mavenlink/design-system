module.exports = {
  moduleNameMapper: {
    css$: 'identity-obj-proxy',
  },
  // Key is deprecated in future version in favor of setupFilesAfterEnv
  setupTestFrameworkScriptFile: '<rootDir>/setup-test-framework.js',
  testPathIgnorePatterns: [
    'node_modules',
    'styleguide/cypress/integration',
  ],
  transform: {
    js$: 'babel-jest',
    jsx$: 'babel-jest',
    svg$: '<rootDir>/jest.config.transform.svg.js',
  },
  verbose: true,
};
