/* eslint-disable import/no-commonjs, no-unused-vars, prefer-template */

const fs = require('fs');
const path = require('path');

module.exports = {
  process(src, filename, config, options) {
    // import iconCautionSvg from 'src/svgs/icon-caution-fill.svg';
    // results in
    // iconCautionSvg := {
    //   id: 'icon-caution-fill.svg',
    //   viewBox: minX minY width height,
    // }
    // which helps us assert we are using the appropriate SVG(s) in our components

    const viewBox = fs
      .readFileSync(filename)
      .toString()
      .match(/viewBox=("[0-9]* [0-9]* [0-9]* [0-9]*")/)[1];
    return 'module.exports = { id: ' + JSON.stringify(path.basename(filename)) + ', viewBox: ' + viewBox + ' };';
  },
};
