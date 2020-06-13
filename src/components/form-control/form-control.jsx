import React from 'react';
import PropTypes from 'prop-types';
import styles from './form-control.css';

function getLabelClassName(error) {
  if (error) return styles['invalid-label'];

  return styles.label;
}

function getRequiredClassName(error) {
  if (error) return styles['invalid-required'];

  return styles.required;
}

export default function FormControl(props) {
  return (
    <div className={props.className}>
      <label
        className={getLabelClassName(props.error)}
        htmlFor={props.id}
      >
        {props.label}
      </label>
      {props.required && (
        <span className={getRequiredClassName(props.error)}>
          (Required)
        </span>
      )}
      <div className={styles['control-container']}>
        {props.children}
      </div>
      {props.error && (
        <span className={styles['error-message']}>
          {props.error}
        </span>
      )}
    </div>
  );
}

FormControl.propTypes = {
  children: PropTypes.node.isRequired,
  error: PropTypes.string,
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  required: PropTypes.bool,
};

FormControl.defaultProps = {
  error: '',
  required: false,
};
