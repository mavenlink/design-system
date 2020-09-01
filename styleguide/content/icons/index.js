const allSvgsModules = require.context('../../../src/svgs/', true, /svg$/);

function getProps(iconName) {
  const legacyIcons = [
    'icon-calendar-fill.svg',
    'icon-clear-small.svg',
    'icon-caution-fill',
  ];

  if (iconName === 'icon-caution-fill') {
    // This is a one-off.
    // We might want to not provide icon specific colors?
    return {
      currentColor: 'caution',
      fill: 'undefined',
      stroke: 'undefined',
      size: 'medium',
    };
  }

  if (legacyIcons.includes(iconName)) {
    return {
      currentColor: 'undefined',
      fill: 'primary',
      stroke: 'undefined',
      size: 'medium',
    };
  }

  return {
    currentColor: 'skip',
    fill: 'skip',
    stroke: 'skip',
    size: 'medium',
  };
}

export default allSvgsModules.keys().reduce((icons, file) => {
  const iconNameWithoutDot = file.slice(2); // strip './'
  const iconName = file.slice(2, -4); // strip './' and '.svg'
  return icons.concat([[{
    name: iconName,
    ...getProps(iconName),
  }, {
    path: `@mavenlink/design-system/svgs/${iconNameWithoutDot}`,
  }]]);
}, []);
