/* eslint-disable import/no-commonjs */

const allSvgsModules = require.context('../../../src/svgs/', true, /svg$/);

export default allSvgsModules.keys().map(file => [
  { icon: allSvgsModules(file).default, label: file.slice(2, -4) },
  { path: `@mavenlink/design-system/src/svgs/${file.slice(2)}` },
]);
