import jestServer from './src/mocks/jest-server.js';

beforeAll(() => jestServer.listen({
  onUnhandledRequest: 'error',
}));
afterEach(() => jestServer.resetHandlers());
afterAll(() => jestServer.close());

//   During test development, it might be useful to comment out this error handling. It is useful for ensuring our tests
//   do not violate propTypes but it can make stack traces much harder to understand.

const allowedErrors = [
  /^Error: Not implemented: window\.computedStyle\(elt, pseudoElt\)/, // This is an irritating code design in JSDOM
];

console.error = (message) => { // eslint-disable-line
  if (!allowedErrors.some(error => error.test(message))) {
    throw new Error(message);
  }
};
