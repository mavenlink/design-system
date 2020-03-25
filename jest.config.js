module.exports = {
  testEnvironment: 'jest-environment-jsdom-sixteen',
  moduleNameMapper: {
    css$: 'identity-obj-proxy',
  },
  setupFilesAfterEnv: [
    '@testing-library/jest-dom/extend-expect.js',
    '<rootDir>/jest.config.setup.files.after.env.js',
  ],
  testEnvironment: 'jest-environment-jsdom-sixteen',
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
