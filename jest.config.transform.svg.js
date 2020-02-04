/* eslint-disable import/no-commonjs, no-unused-vars, prefer-template */

const path = require('path');

module.exports = {
  process(src, filename, config, options) {
    // import iconCautionSvg from 'src/svgs/icon-caution-fill.svg';
    // results in
    // iconCautionSvg := { id: 'icon-caution-fill.svg' }
    // which helps us assert we are using the appropriate SVG(s) in our components
    return 'module.exports = { id: ' + JSON.stringify(path.basename(filename)) + ' };';
  },
};
