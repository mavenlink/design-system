import PropTypes from 'prop-types';
import React from 'react';
import styles from './section.css';

export default function Section(props) {
  return (
    <section className={styles.section}>
      <h2 className={styles.subheading}>{props.title}</h2>
      {props.description && <p className={styles.description}>{props.description}</p>}
      {props.children}
    </section>
  );
}

Section.propTypes = {
  children: PropTypes.node,
  description: PropTypes.string,
  title: PropTypes.string.isRequired,
};

Section.defaultProps = {
  children: undefined,
  description: undefined,
};
