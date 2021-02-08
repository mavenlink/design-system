import jestServer from './src/mocks/jest-server.js';

/* eslint-disable no-undef */
beforeAll(() => jestServer.listen());
afterEach(() => jestServer.resetHandlers());
afterAll(() => jestServer.close());
/* eslint-enable no-undef */

//   During test development, it might be useful to comment out this error handling. It is useful for ensuring our tests
//   do not violate propTypes but it can make stack traces much harder to understand.

console.error = (message) => { // eslint-disable-line
  throw new Error(message);
};
