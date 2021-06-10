const original = window.console.error;

window.console.error = function throwOnError(...args) {
  original(...args);
  throw new Error(...args);
};
