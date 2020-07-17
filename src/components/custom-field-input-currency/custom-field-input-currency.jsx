import PropTypes from 'prop-types';
import React, { forwardRef, useImperativeHandle, useState, useRef, useEffect } from 'react';
import CustomFieldInputText from '../custom-field-input-text/custom-field-input-text.jsx';
import CustomFieldInputNumber from '../custom-field-input-number/custom-field-input-number.jsx';
import currencyCodeType from './currency-code-type.js';
import currencyMetaData from './currency-meta-data.js';
import styles from '../__internal__/abstract-custom-field.css';

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

  return inputValue.toString()
    .split('.').length === 1;
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

const CustomFieldInputCurrency = forwardRef(function CustomFieldInputCurrency(props, ref) {
  const componentRef = useRef(null);
  const [input, setInput] = useState(subunitToUnit(props.value, props.currencyCode));
  const [isEditing, setIsEditing] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const numberRef = useRef(null);
  const valueRef = isEditing ? numberRef : componentRef;

  function handleOnBlur(event) {
    if (numberRef.current.validity.valid) {
      setInput(event.target.value === '' ? '' : parseFloat(event.target.value));
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

  useImperativeHandle(ref, () => ({
    id: props.id,
    get value() {
      let numberValue;

      if (valueRef.current.value === '') {
        numberValue = '';
      } else if (isEditing) {
        numberValue = parseFloat(
          valueRef.current.value * (10 ** currencyMetaData[props.currencyCode].maximumFractionDigits),
        );
      } else {
        numberValue = parseInt(valueRef.current.value.replace(/\D/g, ''), 10);
      }

      return [numberValue, props.currencyCode];
    },
  }));

  const sharedProps = {
    className: props.className,
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
      defaultValue={formattedNumber}
      errorText={props.errorText}
      onFocus={handleOnFocus}
      ref={componentRef}
      type="text"
    />
  );
});

CustomFieldInputCurrency.propTypes = {
  className: PropTypes.string,
  currencyCode: currencyCodeType,
  disabled: PropTypes.bool,
  errorText: PropTypes.string,
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
  errorText: undefined,
  name: undefined,
  placeholder: undefined,
  readOnly: false,
  required: false,
  value: undefined,
};

export default CustomFieldInputCurrency;
