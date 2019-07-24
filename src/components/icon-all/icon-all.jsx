import React from 'react';
import allIcons from '../../helpers/load-icons';
import styles from './icon-all.css';
import Icon from '../icon/icon';

const icons = allIcons();

// these have currentColor but no stroke
const currentColorIcons = [
  'icon-caution-fill',
];

// As we add more icons we'll need to assemble lists as we do
// in bigmaven: `frontend/components/icon/icon-all/icon-all.jsx`
const setupIcon = (iconName) => {
  let currentColor;
  let stroke;
  let fill;
  const id = icons[iconName].id;

  if (currentColorIcons.includes(iconName)) {
    currentColor = 'primary';
    if (iconName === 'icon-caution-fill') {
      currentColor = 'caution';
    }
  } else {
    fill = 'primary';
  }

  return (
    <Icon
      name={id}
      size="large"
      stroke={stroke}
      fill={fill}
      title={id}
      currentColor={currentColor}
    />
  );
};

/**
 * Please do NOT use this as an individual component.
 * This is just a kitchen sink dump of mavenlink-js svg icons.
 * See `<Icon>` for how to use one of these icons instead.
 */
export default function IconAll() {
  return (
    <ul className={styles.list}>
      {Object.keys(icons).map((iconName) => {
        return (
          <li key={iconName}>
            <span className={styles['icon-name']}>{iconName}</span>
            <span className={styles['icon-render']}>{ setupIcon(iconName) }</span>
          </li>
        );
      })}
    </ul>
  );
}
