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
  const inputEl = useRef(null);
  const [input, setInput] = useState(props.value);
  const [invalid, setInvalid] = useState(false);

  function handleOnChange(event) {
    setInput(event.target.value);
    props.onChange(event);
  }

  useEffect(() => {
    if (!inputEl.current) return;

    const invalidPropValue = input !== inputEl.current.value;
    const invalidInputEl = !inputEl.current.validity.valid;

    setInvalid(invalidPropValue || invalidInputEl);
  }, [input]);

  return (
    <CustomFieldInputText
      className={getRootClassName(props.className, invalid, props.disabled)}
      disabled={props.disabled}
      error={invalid}
      helpText={invalid ? inputEl.current.validationMessage : undefined}
      id={props.id}
      inputRef={inputEl}
      name={props.name}
      onChange={event => handleOnChange(event)}
      onClick={props.onClick}
      placeholder={props.placeholder}
      required={props.required}
      type="number"
      value={input}
    />
  );
}

CustomFieldInputNumber.propTypes = {
  className: PropTypes.string,
  disabled: PropTypes.bool,
  id: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func,
  onClick: PropTypes.func,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  value: PropTypes.string,
};

CustomFieldInputNumber.defaultProps = {
  className: styles['custom-field-input-text'],
  disabled: false,
  id: undefined,
  name: undefined,
  onChange: () => {},
  onClick: undefined,
  placeholder: undefined,
  required: false,
  value: '',
};
