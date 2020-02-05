import PropTypes from 'prop-types';
import React, { useEffect, useRef, useState } from 'react';

import cautionSvg from '../../svgs/icon-caution-fill.svg';
import Icon from '../icon/icon.jsx';
import styles from './custom-field-input-text.css';

function getRootClassName(className, error, disabled) {
  if (disabled) {
    return `${className} ${styles.disabled}`;
  }

  if (error) {
    return `${className} ${styles.error}`;
  }

  return className;
}

export default function CustomFieldInputText(props) {
  const inputRef = props.inputRef || useRef(null);
  const [validationMessage, setValidationMessage] = useState('');

  useEffect(() => {
    if (!inputRef.current) return;

    if (props.error) {
      if (props.helpText) {
        inputRef.current.setCustomValidity(props.helpText);
        setValidationMessage(inputRef.current.validationMessage);
      } else {
        inputRef.current.setCustomValidity('');
        setValidationMessage(inputRef.current.validationMessage);
      }
    } else {
      inputRef.current.setCustomValidity('');
      setValidationMessage('');
    }
  });

  return (
    <div className={getRootClassName(props.className, props.error, props.disabled)} data-testid="custom-field-input" >
      <div className={styles['heading-container']}>
        <label className={styles.label} htmlFor={props.id}>{props.label}</label>
        {props.required && <span className={styles.optional}>(Required)</span>}
      </div>
      <div className={styles['input-container']}>
        <input
          className={styles.input}
          defaultValue={props.value}
          disabled={props.disabled}
          id={props.id}
          max={props.max}
          min={props.min}
          name={props.name}
          onKeyUp={props.onKeyUp}
          placeholder={props.placeholder}
          ref={inputRef}
          required={props.required}
          step={props.step}
          type={props.type}
        />
        {props.error &&
          <div className={styles['input-icon-container']}>
            <Icon className={styles['input-icon']} currentColor="caution" name={cautionSvg.id} size="medium" />
          </div>
        }
      </div>
      {props.error && <span className={styles.help}>{validationMessage}</span>}
    </div>
  );
}

CustomFieldInputText.propTypes = {
  className: PropTypes.string,
  disabled: PropTypes.bool,
  error: PropTypes.bool,
  helpText: PropTypes.string,
  id: PropTypes.string.isRequired,
  inputRef: PropTypes.shape({ current: PropTypes.any }),
  label: PropTypes.string.isRequired,
  max: PropTypes.number,
  min: PropTypes.number,
  name: PropTypes.string,
  onKeyUp: PropTypes.func,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  step: PropTypes.number,
  type: PropTypes.oneOf([
    'number',
    'text',
  ]),
  value: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
};

CustomFieldInputText.defaultProps = {
  className: styles['custom-field-input-text'],
  disabled: false,
  error: false,
  helpText: undefined,
  inputRef: undefined,
  max: undefined,
  min: undefined,
  name: undefined,
  onKeyUp: () => {},
  placeholder: undefined,
  required: false,
  step: undefined,
  type: 'text',
  value: undefined,
};
