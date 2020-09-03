/* eslint-disable import/no-commonjs, no-unused-vars, prefer-template */

const fs = require('fs');
const path = require('path');

module.exports = {
  process(src, filename, config, options) {
    // This function implements the same interface as our SVG webpack loader.
    // Jest does not use webpack loaders due to unknown reasons.
    // For each SVG, it exports an object with:
    // - id
    // - viewbox

    const viewBox = fs
      .readFileSync(filename)
      .toString()
      .match(/viewBox=("[0-9]* [0-9]* [0-9]* [0-9]*")/)[1];
    return 'module.exports = { id: ' + JSON.stringify(path.basename(filename)) + ', viewBox: ' + viewBox + ' };';
  },
};
