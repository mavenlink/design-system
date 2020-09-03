const allSvgsModules = require.context('../../../src/svgs/', true, /svg$/);

function getProps(iconName, iconModule) {
  const legacyIcons = [
  ];

  if (legacyIcons.includes(iconName)) {
    return {
      currentColor: 'undefined',
      fill: 'primary',
      stroke: 'undefined',
      size: 'medium',
      v: 1,
    };
  }

  return {
    currentColor: 'skip',
    fill: 'skip',
    icon: iconModule,
    stroke: 'skip',
    size: 'medium',
    v: 2,
  };
}

export default allSvgsModules.keys().reduce((icons, file) => {
  const iconNameWithoutDot = file.slice(2); // strip './'
  const iconName = file.slice(2, -4); // strip './' and '.svg'
  return icons.concat([[{
    name: iconName,
    ...getProps(iconName, allSvgsModules(file).default),
  }, {
    path: `@mavenlink/design-system/svgs/${iconNameWithoutDot}`,
  }]]);
}, []);
