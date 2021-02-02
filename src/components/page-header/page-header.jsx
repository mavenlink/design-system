import PropTypes from 'prop-types';
import React from 'react';
import styles from './page-header.css';

export default function PageHeader(props) {
  return (
    <header className={props.className}>
      <h1 className={styles.heading}>{props.title}</h1>
      {props.description && (
        <p className={styles.description}>{props.description}</p>
      )}
    </header>
  );
}

PageHeader.propTypes = {
  className: PropTypes.string,
  description: PropTypes.string,
  title: PropTypes.string.isRequired,
};

PageHeader.defaultProps = {
  className: undefined,
  description: undefined,
};
