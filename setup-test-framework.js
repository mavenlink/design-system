import '@testing-library/jest-dom/extend-expect.js';

console.error = (message) => { // eslint-disable-line
  // During test development, it might be useful to comment out
  // this error handling. It is useful for ensuring our tests
  // do not violate propTypes but it can make stack traces
  // much harder to understand.
  throw new Error(message);
};
