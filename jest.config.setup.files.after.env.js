import jestServer from './src/mocks/jest-server.js';

beforeAll(() => jestServer.listen({
  onUnhandledRequest: 'error',
}));
afterEach(() => jestServer.resetHandlers());
afterAll(() => jestServer.close());

beforeEach(() => {
  // TODO Remove when jest-dom is upgraded.
  // In the version of jsdom that we have, `getBoundingClientRect` does not return `x` and `y`, which is needed for
  // the tooltip component. It was recently added to jsdom (https://github.com/jsdom/jsdom/pull/3187), but that
  // change is not yet reflected in jest-dom.
  // This is needed for every test which uses the tooltip, it could be added to them individually but having it in one
  // place only makes it easier to rip out after an upgrade.
  jest.spyOn(Element.prototype, 'getBoundingClientRect').mockImplementation(() => ({
    width: 120,
    height: 120,
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    x: 0,
    y: 0,
  }));
});

//   During test development, it might be useful to comment out this error handling. It is useful for ensuring our tests
//   do not violate propTypes but it can make stack traces much harder to understand.

const allowedErrors = [
  /^Error: Not implemented: window\.computedStyle\(elt, pseudoElt\)/, // This is an irritating code design in JSDOM
  /^Error: Expected key descriptor but found "" in ""/, // This is a false negative in @testing-library/user-event
];

const originalError = window.console.error;
window.console.error = (message, ...args) => {
  if (allowedErrors.some(error => error.test(message))) return;

  originalError(message, ...args);
  // eslint-disable-next-line max-len
  throw new Error(`Your test produced an unexpected console.error. See above for original message. This is the unprocessed message: ${message}`);
};
