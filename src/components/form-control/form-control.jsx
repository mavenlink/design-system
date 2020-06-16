import React from 'react';
import PropTypes from 'prop-types';
import styles from './form-control.css';

function getLabelClassName(error, readOnly) {
  if (isInvalid(error, readOnly)) return styles['invalid-label'];

  return styles.label;
}

function getRequiredClassName(error, readOnly) {
  if (isInvalid(error, readOnly)) return styles['invalid-required'];

  return styles.required;
}

function isInvalid(error, readOnly) {
  return !!error && !readOnly;
}

export default function FormControl(props) {
  return (
    <div className={props.className}>
      <label
        className={getLabelClassName(props.error, props.readOnly)}
        htmlFor={props.id}
      >
        {props.label}
      </label>
      {props.required && (
        <span className={getRequiredClassName(props.error, props.readOnly)}>
          (Required)
        </span>
      )}
      <div className={styles['control-container']}>
        {props.children}
      </div>
      {isInvalid(props.error, props.readOnly) && (
        <span className={styles['error-message']}>
          {props.error}
        </span>
      )}
    </div>
  );
}

FormControl.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
  error: PropTypes.string,
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  readOnly: PropTypes.bool,
  required: PropTypes.bool,
};

FormControl.defaultProps = {
  className: undefined,
  error: '',
  readOnly: false,
  required: false,
};
