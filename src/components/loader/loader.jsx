import PropTypes from 'prop-types';
import React from 'react';
import styles from './loader.css';

export default function Loader({ cssInline, cssSpinner, cssInlineWrapper, cssWrapper, inline }) {
  return (
    <div
      aria-busy="true"
      aria-live="polite"
      className={inline ? cssInlineWrapper : cssWrapper}
      data-testid="loader"
      role="progressbar"
      tabIndex={0}
    >
      <span className={inline ? cssInline : cssSpinner}>Loading...</span>
    </div>
  );
}

Loader.propTypes = {
  cssInline: PropTypes.string,
  cssSpinner: PropTypes.string,
  cssWrapper: PropTypes.string,
  cssInlineWrapper: PropTypes.string,
  inline: PropTypes.bool,
};

Loader.defaultProps = {
  cssInline: styles.inline,
  cssSpinner: styles.spinner,
  cssWrapper: styles.wrapper,
  cssInlineWrapper: styles.inlineWrapper,
  inline: false,
};
