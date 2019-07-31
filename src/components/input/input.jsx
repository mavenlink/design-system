import PropTypes from 'prop-types';
import React from 'react';
import cautionSvg from '../../svgs/icon-caution-fill.svg';
import Icon from '../icon/icon';
import styles from './input.css';

function getClassName(className, invalid) {
  if (className) return className;
  return invalid ? styles.invalid : styles.input;
}

export default function Input(props) {
  return (
    <div className={styles.container}>
      <label htmlFor={props.id}>
        {props.label}
        {props.required && <span>(Required)</span>}
      </label>
      <input
        className={getClassName(props.className, props.invalid)}
        id={props.id}
        onChange={props.onChange}
        placeholder={props.placeholder}
        required={props.required}
        type="text"
        value={props.value}
      />
      {props.invalid && <Icon className={styles['invalid-icon']} currentColor="caution" name={cautionSvg.id} />}
    </div>
  );
}

Input.propTypes = {
  className: PropTypes.string,
  id: PropTypes.string.isRequired,
  invalid: PropTypes.bool,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  value: PropTypes.string,
};

Input.defaultProps = {
  className: undefined,
  invalid: false,
  onChange: undefined,
  placeholder: undefined,
  required: undefined,
  value: undefined,
};
