import React from 'react';
import allIcons from '../../helpers/load-icons';
import styles from './icon-all.css';

const icons = allIcons();

const setupIcon = (iconName) => {
  const defaultClasses = `${styles.icon}`;
  // const defaultClasses = `${styles.icon} ${styles.large} ${styles.fill-primary}`;
  return (
    <svg className={defaultClasses}>
      <use xlinkHref={`#${iconName}`} />
    </svg>
  );
};

/**
 * This is just a kitchen sink dump of mavenlink-js svg icons.
 * Please do NOT use this as an individual component. Also note,
 * we will be adding an `<Icon>` component soon.
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
