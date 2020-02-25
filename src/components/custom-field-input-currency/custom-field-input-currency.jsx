import PropTypes from 'prop-types';
import React, { useState, useRef, useEffect } from 'react';

import CustomFieldInputText from '../custom-field-input-text/custom-field-input-text.jsx';
import CustomFieldInputTextStyles from '../custom-field-input-text/custom-field-input-text.css';
import CustomFieldInputNumber from '../custom-field-input-number/custom-field-input-number.jsx';
import CurrencyCodeType from './currency.js';

function getRootClassName(className, error, disabled) {
  if (disabled) {
    return `${className} ${CustomFieldInputTextStyles.disabled}`;
  }

  if (error) {
    return `${className} ${CustomFieldInputTextStyles.error}`;
  }

  return className;
}

function getLocale() {
  if (navigator && navigator.languages) {
    return navigator.languages[0];
  }

  return 'en-IN';
}

export default function CustomFieldInputCurrency(props) {
  const [input, setInput] = useState(props.value);
  const [isEditing, setIsEditing] = useState(false);
  const numberRef = useRef(null);

  function handleOnChange(event) {
    setInput(parseFloat(event.target.value));
    props.onChange(event);
  }

  function handleOnBlur() {
    setIsEditing(false);
  }

  function handleOnFocus() {
    setIsEditing(true);
  }

  useEffect(() => {
    if (isEditing && numberRef.current) {
      numberRef.current.focus();
    }
  });

  const sharedProps = {
    className: getRootClassName(props.className, props.error, props.disabled),
    helpText: props.helpText,
    id: props.id,
    label: props.label,
    name: props.name,
    onClick: props.onClick,
    placeholder: props.placeholder,
    required: props.required,
    type: props.type,
  };

  if (isEditing) {
    return (
      <CustomFieldInputNumber
        {...sharedProps}
        onBlur={() => handleOnBlur()}
        onChange={event => handleOnChange(event)}
        inputRef={numberRef}
        step={0.01}
        value={input}
      />
    );
  }

  const formattedNumber = new Intl.NumberFormat(getLocale(), { style: 'currency', currency: props.currencyCode }).format(input);

  return (
    <CustomFieldInputText
      {...sharedProps}
      value={formattedNumber}
      onFocus={() => handleOnFocus()}
    />
  );
}

CustomFieldInputCurrency.propTypes = {
  className: PropTypes.string,
  currencyCode: CurrencyCodeType,
  disabled: PropTypes.bool,
  error: PropTypes.bool,
  helpText: PropTypes.string,
  id: PropTypes.string,
  label: PropTypes.string.isRequired,
  name: PropTypes.string,
  onChange: PropTypes.func,
  onClick: PropTypes.func,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  type: PropTypes.string,
  value: PropTypes.number,
};

CustomFieldInputCurrency.defaultProps = {
  className: CustomFieldInputTextStyles['custom-field-input-text'],
  currencyCode: 'USD',
  disabled: false,
  error: false,
  helpText: undefined,
  id: undefined,
  name: undefined,
  onChange: () => {},
  onClick: undefined,
  placeholder: undefined,
  required: false,
  type: 'text', // Our validation can catch more issues than React/HTML with number input type, like --0.1.2
  value: 0,
};
