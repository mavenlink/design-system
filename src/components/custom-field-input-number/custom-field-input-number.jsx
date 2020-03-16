import PropTypes from 'prop-types';
import React, { useEffect, useRef, useState } from 'react';

import CustomFieldInputText from '../custom-field-input-text/custom-field-input-text.jsx';
import styles from '../custom-field-input-text/custom-field-input-text.css';

const apiLimits = {
  max: 2 ** 31,
  min: -(2 ** 31),
};

function getRootClassName(className, error, disabled) {
  if (disabled) {
    return `${className} ${styles.disabled}`;
  }

  if (error) {
    return `${className} ${styles.error}`;
  }

  return className;
}

export default function CustomFieldInputNumber(props) {
  const inputRef = props.inputRef || useRef(null);
  const [invalid, setInvalid] = useState(false);

  function handleOnKeyUp(event) {
    setInvalid(!event.target.checkValidity());
  }

  useEffect(() => {
    if (!inputRef.current) return;

    setInvalid(!inputRef.current.validity.valid);
  });

  return (
    <CustomFieldInputText
      className={getRootClassName(props.className, invalid, props.disabled)}
      disabled={props.disabled}
      error={invalid}
      id={props.id}
      inputRef={inputRef}
      label={props.label}
      max={apiLimits.max}
      min={apiLimits.min}
      name={props.name}
      onBlur={props.onBlur}
      onKeyUp={handleOnKeyUp}
      placeholder={props.placeholder}
      required={props.required}
      step={props.step}
      type="number"
      value={props.value}
    />
  );
}

CustomFieldInputNumber.propTypes = {
  className: PropTypes.string,
  disabled: PropTypes.bool,
  id: PropTypes.string.isRequired,
  inputRef: PropTypes.shape({ current: PropTypes.any }),
  label: PropTypes.string.isRequired,
  name: PropTypes.string,
  onBlur: PropTypes.func,
  // onChange: Do not expose the onChange handler. See commit for details.
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  step: PropTypes.number,
  value: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.oneOf(['']),
  ]),
};

CustomFieldInputNumber.defaultProps = {
  className: styles['custom-field-input-text'],
  disabled: false,
  inputRef: undefined,
  name: undefined,
  onBlur: () => {},
  placeholder: undefined,
  required: false,
  step: 1,
  value: '',
};
