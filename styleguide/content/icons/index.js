/* eslint-disable import/no-commonjs */

const path = require('path');

const allSvgsModules = require.context('../../../src/svgs/', true, /svg$/);

export default allSvgsModules.keys().map(file => [
  { icon: allSvgsModules(file).default, label: path.basename(file, '.svg') },
  { path: path.join('@mavenlink/design-system/src/svgs/', file) },
]);
