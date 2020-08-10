module.exports = {
  moduleNameMapper: {
    '\\.css$': 'identity-obj-proxy',
  },
  setupFilesAfterEnv: [
    '@testing-library/jest-dom/extend-expect.js',
    '<rootDir>/jest.config.setup.files.after.env.js',
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
  globalSetup: './jest.config.globalSetup.js',
};
