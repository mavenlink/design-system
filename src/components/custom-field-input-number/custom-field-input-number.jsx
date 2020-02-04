import PropTypes from 'prop-types';
import React, { useEffect, useRef, useState } from 'react';

import CustomFieldInputText from '../custom-field-input-text/custom-field-input-text.jsx';
import styles from '../custom-field-input-text/custom-field-input-text.css';

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
  const inputRef = useRef(null);
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
      max={2 ** 31} // This value is sourced from the API
      min={-(2 ** 31)} // This value is sourced from the API
      name={props.name}
      onKeyUp={handleOnKeyUp}
      placeholder={props.placeholder}
      required={props.required}
      step={1}
      type="number"
      value={props.value}
    />
  );
}

CustomFieldInputNumber.propTypes = {
  className: PropTypes.string,
  disabled: PropTypes.bool,
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  value: PropTypes.number,
};

CustomFieldInputNumber.defaultProps = {
  className: styles['custom-field-input-text'],
  disabled: false,
  name: undefined,
  placeholder: undefined,
  required: false,
  value: undefined,
};
