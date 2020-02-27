import PropTypes from 'prop-types';
import React, { useState, useRef, useEffect } from 'react';

import CustomFieldInputText from '../custom-field-input-text/custom-field-input-text.jsx';
import CustomFieldInputNumber from '../custom-field-input-number/custom-field-input-number.jsx';
import CurrencyCodeType from './currency-code-type.js';
import currencyMetaData from './currency-meta-data.js';
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

function getLocale() {
  if (navigator && navigator.languages) {
    return navigator.languages[0];
  }

  return 'en-IN';
}

function initialInputValid(inputValue, maximumFractionDigits) {
  const splitInputValue = inputValue.toString().split('.');
  if (splitInputValue.length === 1) {
    return true;
  }

  return splitInputValue[1].length <= maximumFractionDigits;
}

export default function CustomFieldInputCurrency(props) {
  const [input, setInput] = useState(props.value);
  const [isEditing, setIsEditing] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const numberRef = useRef(null);
  const metadata = currencyMetaData[props.currencyCode];

  function handleOnChange(event) {
    setInput(parseFloat(event.target.value));
    props.onChange(event);
  }

  function handleOnBlur() {
    if (numberRef.current && numberRef.current.validity.valid) {
      setIsEditing(false);
    }

    setIsFocused(false);
  }

  function handleOnFocus() {
    setIsEditing(true);
    setIsFocused(true);
  }

  useEffect(() => {
    if (!numberRef.current && !initialInputValid(props.value, metadata.maximumFractionDigits)) {
      setIsEditing(true);
    }
  }, []);

  useEffect(() => {
    if (isEditing && isFocused) {
      numberRef.current.focus();
    }
  });

  const sharedProps = {
    className: getRootClassName(props.className, props.error, props.disabled),
    disabled: props.disabled,
    helpText: props.helpText,
    id: props.id,
    label: props.label,
    name: props.name,
    onClick: props.onClick,
    placeholder: props.placeholder,
    required: props.required,
    type: props.type,
  };

  const formattedNumber = new Intl.NumberFormat(getLocale(), {
    style: 'currency',
    currency: props.currencyCode,
    maximumFractionDigits: metadata.maximumFractionDigits,
  }).format(input);

  if (isEditing) {
    return (
      <CustomFieldInputNumber
        {...sharedProps}
        onBlur={() => handleOnBlur()}
        onChange={event => handleOnChange(event)}
        inputRef={numberRef}
        step={metadata.step}
        value={input}
      />
    );
  }

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
  id: PropTypes.string.isRequired,
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
  className: styles['custom-field-input-text'],
  currencyCode: 'USD',
  disabled: false,
  error: false,
  helpText: undefined,
  name: undefined,
  onChange: () => {},
  onClick: undefined,
  placeholder: undefined,
  required: false,
  type: 'text', // Our validation can catch more issues than React/HTML with number input type, like --0.1.2
  value: 0,
};
