import PropTypes from 'prop-types';
import React from 'react';
import Link from '../link';
import styles from './components-list.css';

export default function ComponentsList({ current, items }) {
  const filteredItems = items.filter(item => item.name);

  if (!filteredItems.length) {
    return null;
  }

  return (
    <ul className={styles.list}>
      {filteredItems.map(({ name, href, content }) => {
        if (current === name) {
          console.log(`current: ${current}`);
          console.log(`content: ${content}`);
          console.log(`href: ${href}`);
          console.log(`name: ${name}`);
        }
        return (
          <li
            className={styles.item}
            key={name}
          >
            <Link
              className={current === name ? styles.current : styles.link}
              href={href}
            >
              {name}
            </Link>
            {content}
          </li>
        );
      })}
    </ul>
  );
}

ComponentsList.propTypes = {
  current: PropTypes.string,
  items: PropTypes.arrayOf(PropTypes.shape({
    content: PropTypes.node,
    href: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  })).isRequired,
};

ComponentsList.defaultProps = {
  current: undefined,
};
