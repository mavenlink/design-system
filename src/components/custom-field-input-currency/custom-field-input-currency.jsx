import PropTypes from 'prop-types';
import React, { useState, useRef, useEffect } from 'react';

import CustomFieldInputText from '../custom-field-input-text/custom-field-input-text.jsx';
import CustomFieldInputNumber from '../custom-field-input-number/custom-field-input-number.jsx';
import currencyCodeType from './currency-code-type.js';
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

function initialInputValid(inputValue) {
  if (!inputValue) {
    return true;
  }

  if (inputValue.toString().split('.').length === 1) {
    return true;
  }

  return false;
}

function subunitToUnit(subunitValue, currencyCode) {
  if (!subunitValue) return '';

  return subunitValue / (10 ** currencyMetaData[currencyCode].maximumFractionDigits);
}

function formatValue(unitValue, currencyCode) {
  if (!unitValue) return '';

  return new Intl.NumberFormat(getLocale(), {
    style: 'currency',
    currency: currencyCode,
    maximumFractionDigits: currencyMetaData[currencyCode].maximumFractionDigits,
  }).format(unitValue);
}

export default function CustomFieldInputCurrency(props) {
  const [input, setInput] = useState(subunitToUnit(props.value, props.currencyCode));
  const [isEditing, setIsEditing] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const numberRef = useRef(null);

  function handleOnBlur(event) {
    if (numberRef.current.validity.valid) {
      setInput(parseFloat(event.target.value));
      setIsEditing(false);
    }

    setIsFocused(false);
  }

  function handleOnFocus() {
    if (props.disabled || props.readOnly) return;

    setIsEditing(true);
    setIsFocused(true);
  }

  useEffect(() => {
    if (!numberRef.current && !initialInputValid(props.value)) {
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
    id: props.id,
    label: props.label,
    name: props.name,
    placeholder: props.placeholder,
    readOnly: props.readOnly,
    required: props.required,
  };

  const formattedNumber = formatValue(input, props.currencyCode);

  if (isEditing) {
    return (
      <CustomFieldInputNumber
        {...sharedProps}
        onBlur={handleOnBlur}
        inputRef={numberRef}
        step={currencyMetaData[props.currencyCode].step}
        value={input}
      />
    );
  }

  return (
    <CustomFieldInputText
      {...sharedProps}
      dataAttributes={{'parent-input-type': 'currency', 'currency-code': props.currencyCode}}
      error={props.error}
      helpText={props.helpText}
      onFocus={handleOnFocus}
      type="text"
      value={formattedNumber}
    />
  );
}

CustomFieldInputCurrency.propTypes = {
  className: PropTypes.string,
  currencyCode: currencyCodeType,
  disabled: PropTypes.bool,
  error: PropTypes.bool,
  helpText: PropTypes.string,
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  name: PropTypes.string,
  // onChange: Do not expose an onChange handler. See commit for details.
  placeholder: PropTypes.string,
  readOnly: PropTypes.bool,
  required: PropTypes.bool,
  value: PropTypes.number,
};

CustomFieldInputCurrency.defaultProps = {
  className: styles['custom-field-input-text'],
  currencyCode: 'USD',
  disabled: false,
  error: false,
  helpText: undefined,
  name: undefined,
  placeholder: undefined,
  readOnly: false,
  required: false,
  value: undefined,
};
