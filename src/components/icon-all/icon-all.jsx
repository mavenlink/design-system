import React from 'react';
import styles from './icon-all.css';
import Icon from '../icon/icon.jsx';

const generateColors = (svgFilePath) => {
  // These have currentColor, no stroke, no fill
  const currentColorIcons = [
    'icon-caution-fill',
  ];

  const iconName = svgFilePath.slice(2, -4);

  if (currentColorIcons.includes(iconName)) {
    if (iconName === 'icon-caution-fill') {
      // This is a one-off.
      // We might want to not provide icon specific colors?
      return { currentColor: 'caution' };
    }

    return { currentColor: 'primary' };
  }

  return { fill: 'primary' };
};

export default function IconAll() {
  const allSvgsModules = require.context('../../svgs/', true, /svg$/);

  return (
    <ul className={styles.list}>
      {allSvgsModules.keys().map(svgFilePath => (
        <li key={svgFilePath}>
          <span className={styles['icon-name']}>
            {`@mavenlink/design-system/src/svgs/${svgFilePath.slice(2)}`}
          </span>
          <span>
            {<Icon
              name={allSvgsModules(svgFilePath).default.id}
              size="large"
              title={allSvgsModules(svgFilePath).default.id}
              {...generateColors(svgFilePath)}
            />}
          </span>
        </li>
      ))}
    </ul>
  );
}
