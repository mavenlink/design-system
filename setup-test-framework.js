import '@testing-library/jest-dom/extend-expect.js';

console.error = (message) => { // eslint-disable-line
  throw new Error(message);
};
