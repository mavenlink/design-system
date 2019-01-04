import PropTypes from 'prop-types';
import React from 'react';
import Header from '../header';
import styles from './styleguide.css';

export default function Styleguide({ children, hasSidebar, toc }) {
  return (
    <div>
      <Header />
      <div className={styles.root}>
        {hasSidebar &&
          <nav className={styles.sidebar}>
            {toc}
          </nav>
        }
        <main className={styles.content}>
          {children}
        </main>
      </div>
    </div>
  );
}

Styleguide.propTypes = {
  children: PropTypes.node.isRequired,
  hasSidebar: PropTypes.bool.isRequired,
  toc: PropTypes.node.isRequired,
};
