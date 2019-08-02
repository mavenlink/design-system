import PropTypes from 'prop-types';
import React from 'react';
import cautionSvg from '../../svgs/icon-caution-fill.svg';
import Icon from '../icon/icon.jsx';
import styles from './input.css';

function getLabelClassName(className, invalid) {
  if(className) return className;
  return invalid ? styles['invalid-label'] : styles.label;
}

function getClassName(className, invalid) {
  if (className) return className;
  return invalid ? styles['invalid-input'] : styles.input;
}

export default function Input(props) {
  return (
    <div>
      <label htmlFor={props.id} className={getLabelClassName(props.cssLabel, props.invalid)}>
        {props.label}
      </label>
      <div className={styles.container}>
        <input
          className={getClassName(props.className, props.invalid)}
          disabled={props.disabled}
          id={props.id}
          name={props.name}
          onChange={props.onChange}
          placeholder={props.placeholder}
          required={props.required}
          type="text"
          value={props.value}
        />
        {props.invalid && <Icon className={styles['invalid-icon']} currentColor="caution" name={cautionSvg.id} />}
      </div>
    </div>
  );
}

Input.propTypes = {
  className: PropTypes.string,
  id: PropTypes.string.isRequired,
  invalid: PropTypes.bool,
  label: PropTypes.string.isRequired,
  name: PropTypes.string,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  value: PropTypes.string,
};

Input.defaultProps = {
  className: undefined,
  disabled: undefined,
  invalid: false,
  name: undefined,
  onChange: undefined,
  placeholder: undefined,
  required: undefined,
  value: undefined,
};
