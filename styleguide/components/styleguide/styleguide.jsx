import PropTypes from 'prop-types';
import React from 'react';
import Header from '../header/index.js';
import styles from './styleguide.css';

export default function Styleguide({ children, hasSidebar, toc }) {
  return (
    <div className={styles.root}>
      <Header />
      {hasSidebar &&
        <nav className={styles.sidebar}>
          {toc}
        </nav>
      }
      <main className={styles.main}>
        {children}
      </main>
    </div>
  );
}

Styleguide.propTypes = {
  children: PropTypes.node.isRequired,
  hasSidebar: PropTypes.bool.isRequired,
  toc: PropTypes.node.isRequired,
};
