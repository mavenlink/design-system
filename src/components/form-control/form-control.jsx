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
    <div className={props.className} onKeyDown={props.onKeyDown} role="presentation">
      <label
        className={getLabelClassName(props.error, props.readOnly)}
        htmlFor={props.id}
        id={props.labelId}
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
        <span
          id={`${props.id}Hint`}
          className={styles['error-message']}
          aria-live="polite"
        >
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
  id: (props) => {
    if (props.id === undefined && props.labelId === undefined) {
      return new Error('Invalid prop `id` supplied to `FormControl`. Either `id` or `labelId` are required.');
    }

    if (typeof props.id !== 'string' && props.labelId === undefined) {
      return new Error('Invalid prop `id` supplied to `FormControl`. `id` must be a string.');
    }

    return undefined;
  },
  label: PropTypes.string.isRequired,
  labelId: (props) => {
    if (props.id === undefined && props.labelId === undefined) {
      return new Error('Invalid prop `labelId` supplied to `FormControl`. Either `id` or `labelId` are required.');
    }

    if (props.id === undefined && typeof props.labelId !== 'string') {
      return new Error('Invalid prop `labelId` supplied to `FormControl`. `labelId` must be a string.');
    }

    return undefined;
  },
  onKeyDown: PropTypes.func,
  readOnly: PropTypes.bool,
  required: PropTypes.bool,
};

FormControl.defaultProps = {
  className: undefined,
  error: '',
  id: undefined,
  labelId: undefined,
  onKeyDown: () => {},
  readOnly: false,
  required: false,
};
