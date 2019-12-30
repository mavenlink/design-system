import PropTypes from 'prop-types';
import React from 'react';
import cautionSvg from '../../svgs/icon-caution-fill.svg';
import Icon from '../icon/icon.jsx';
import styles from './input.css';

function getLabelClassName(className, invalid) {
  if (className) return className;
  return invalid ? styles['invalid-label'] : styles.label;
}

function getClassName(className, invalid) {
  if (className) return className;
  return invalid ? styles['invalid-input'] : styles.input;
}

export default function Input(props) {
  return (
    <React.Fragment>
      <label htmlFor={props.id} className={getLabelClassName(props.cssLabel, props.invalid)}>
        {props.label}
      </label>
      <div className={props.cssContainer}>
        <input
          className={getClassName(props.className, props.invalid)}
          disabled={props.disabled}
          id={props.id}
          maxLength={props.maxLength}
          name={props.name}
          onBlur={props.onBlur}
          onChange={props.onChange}
          onFocus={props.onFocus}
          onInput={props.onInput}
          onKeyDown={props.onKeyDown}
          placeholder={props.placeholder}
          readOnly={props.readOnly}
          ref={props.inputRef}
          required={props.required}
          type={props.type}
          value={props.value}
        />
        {props.invalid && <Icon className={styles['invalid-icon']} currentColor="caution" name={cautionSvg.id} />}
      </div>
    </React.Fragment>
  );
}

Input.propTypes = {
  className: PropTypes.string,
  cssContainer: PropTypes.string,
  cssLabel: PropTypes.string,
  disabled: PropTypes.bool,
  id: PropTypes.string.isRequired,
  inputRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(HTMLInputElement) }),
  ]),
  invalid: PropTypes.bool,
  label: PropTypes.string.isRequired,
  maxLength: PropTypes.number,
  name: PropTypes.string,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  onInput: PropTypes.func,
  onKeyDown: PropTypes.func,
  placeholder: PropTypes.string,
  readOnly: PropTypes.bool,
  required: PropTypes.bool,
  type: PropTypes.oneOf([
    'email',
    'password',
    'text',
  ]),
  value: PropTypes.string,
};

Input.defaultProps = {
  className: undefined,
  cssContainer: styles.container,
  cssLabel: undefined,
  disabled: undefined,
  invalid: false,
  inputRef: undefined,
  maxLength: undefined,
  name: undefined,
  onBlur: undefined,
  onChange: undefined,
  onFocus: undefined,
  onInput: undefined,
  onKeyDown: undefined,
  placeholder: undefined,
  readOnly: undefined,
  required: undefined,
  type: 'text',
  value: undefined,
};
