module.exports = {
  moduleNameMapper: {
    css$: 'identity-obj-proxy',
  },
  setupFilesAfterEnv: [
    '@testing-library/jest-dom/extend-expect.js',
  ],
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
