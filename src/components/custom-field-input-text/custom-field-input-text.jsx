import PropTypes from 'prop-types';
import React, { useEffect, useRef, useState } from 'react';
import CustomField from '../helpers/custom-field.jsx';
import styles from './custom-field-input-text.css';

export default function CustomFieldInputText(props) {
  const defaultRef = useRef(null);
  const [validationMessage, setValidationMessage] = useState('');

  const inputRef = props.inputRef || defaultRef;

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

  return (<CustomField
    className={props.className}
    controlled={false}
    disabled={props.disabled}
    error={props.error}
    helpText={validationMessage}
    id={props.id}
    inputRef={inputRef}
    label={props.label}
    name={props.name}
    onBlur={props.onBlur}
    onChange={props.onChange}
    onFocus={props.onFocus}
    onKeyUp={props.onKeyUp}
    placeholder={props.placeholder}
    readOnly={props.readOnly}
    required={props.required}
    type="text"
    value={props.value}
  />);
}

CustomFieldInputText.propTypes = {
  className: PropTypes.string,
  disabled: PropTypes.bool,
  error: PropTypes.bool,
  helpText: PropTypes.string,
  id: PropTypes.string.isRequired,
  inputRef: PropTypes.shape({ current: PropTypes.any }),
  label: PropTypes.string.isRequired,
  name: PropTypes.string,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  onKeyUp: PropTypes.func,
  placeholder: PropTypes.string,
  readOnly: PropTypes.bool,
  required: PropTypes.bool,
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
  onBlur: () => {},
  onChange: () => {},
  onFocus: () => {},
  onKeyUp: () => {},
  placeholder: undefined,
  readOnly: false,
  required: false,
  step: undefined,
  type: 'text',
  value: undefined,
};
