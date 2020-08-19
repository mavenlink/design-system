import PropTypes from 'prop-types';
import React from 'react';
import styles from './loader.css';

export default function Loader({ inline }) {
  return (
    <div
      aria-busy="true"
      aria-live="polite"
      className={inline ? styles.inlineWrapper : styles.wrapper}
      role="progressbar"
      tabIndex={0}
    >
      <span className={inline ? styles.inline : styles.spinner}>Loading...</span>
    </div>
  );
}

Loader.propTypes = {
  inline: PropTypes.bool,
};

Loader.defaultProps = {
  inline: false,
};
