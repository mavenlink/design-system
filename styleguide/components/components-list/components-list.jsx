import PropTypes from 'prop-types';
import React from 'react';
import Link from '../link/index.js';
import styles from './components-list.css';

export default function ComponentsList({ items }) {
  const filteredItems = items.filter(item => item.name);

  if (!filteredItems.length) {
    return null;
  }

  return (
    <ul className={styles.list}>
      {filteredItems.map(({ name, href, content }) => (
        <li
          className={styles.item}
          key={name}
        >
          <Link
            className={styles.link}
            href={href}
          >
            {name}
          </Link>
          {content}
        </li>
      ))}
    </ul>
  );
}

ComponentsList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    content: PropTypes.node,
    href: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  })).isRequired,
};

ComponentsList.defaultProps = {
};
