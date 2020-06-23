import React from 'react';
import Logo from '../logo/index.js';
import styles from './header.css';

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles['header-content']}>
        <div className={styles.section}>
          <Logo />
          <span className={styles.title}>
            Design System
          </span>
          <span className={styles.title2}>
            &nbsp;/ Front-end
          </span>
        </div>
        <div className={styles.section}>
          <a className={styles.github} href="https://github.com/mavenlink/design-system">Github</a>
        </div>
      </div>
    </header>
  );
}
