import PropTypes from 'prop-types';
import React, { forwardRef, useImperativeHandle, useState, useRef, useEffect } from 'react';
import CustomFieldInputText from '../custom-field-input-text/custom-field-input-text.jsx';
import CustomFieldInputNumber from '../custom-field-input-number/custom-field-input-number.jsx';
import currencyCodeType from './currency-code-type.js';
import currencyMetaData from './currency-meta-data.js';
import useForwardedRef from '../../hooks/use-forwarded-ref.js';
import { initialInputValid, subunitToUnit, formatValue } from '../control/money-formatter.js';

const CustomFieldInputCurrency = forwardRef(function CustomFieldInputCurrency(props, forwardedRef) {
  const [input, setInput] = useState(subunitToUnit(props.value, props.currencyCode));
  const [isEditing, setIsEditing] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const componentRef = useRef(null);
  const numberRef = useRef(null);
  const valueRef = isEditing ? numberRef : componentRef;
  const ref = useForwardedRef(forwardedRef);

  function handleOnBlur(event) {
    if (numberRef.current.validity.valid) {
      setInput(event.target.value === '' ? undefined : parseFloat(event.target.value));
      setIsEditing(false);
    }

    setIsFocused(false);
  }

  function handleOnFocus() {
    if (props.readOnly) return;

    setIsEditing(true);
    setIsFocused(true);
  }

  function onChange() {
    props.onChange({ target: ref.current });
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

  useEffect(() => {
    setInput(subunitToUnit(props.value, props.currencyCode));
  }, [props.value]);

  useImperativeHandle(ref, () => ({
    get dirty() {
      const currentValue = this.value ? this.value[0] : this.value;
      return props.value !== currentValue;
    },
    id: props.id,
    name: props.name,
    get value() {
      let numberValue;

      if (valueRef.current.value === '') {
        return undefined;
      }

      if (isEditing) {
        const value = valueRef.current.value;

        if (isNaN(value)) {
          return undefined;
        }

        numberValue = parseFloat(
          value * (10 ** currencyMetaData[props.currencyCode].maximumFractionDigits),
        );
      } else {
        numberValue = parseInt(valueRef.current.value.replace(/[^0-9-]/g, ''), 10);
      }

      return [numberValue, props.currencyCode];
    },
  }));

  const sharedProps = {
    className: props.className,
    id: props.id,
    label: props.label,
    name: props.name,
    placeholder: props.placeholder,
    readOnly: props.readOnly,
    required: props.required,
    tooltip: props.tooltip,
  };

  const formattedNumber = formatValue(input, props.currencyCode);

  if (isEditing) {
    return (
      <CustomFieldInputNumber
        {...sharedProps}
        onBlur={handleOnBlur}
        onChange={onChange}
        ref={numberRef}
        step={currencyMetaData[props.currencyCode].step}
        value={input}
      />
    );
  }

  return (
    <CustomFieldInputText
      {...sharedProps}
      errorText={props.errorText}
      onFocus={handleOnFocus}
      ref={componentRef}
      type="text"
      value={formattedNumber}
    />
  );
});

CustomFieldInputCurrency.propTypes = {
  className: PropTypes.string,
  currencyCode: currencyCodeType,
  errorText: PropTypes.string,
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  /**
   * The handler is invoked for every native onchange event.
   * The handler will be invoked with the forwarded ref.
   */
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  readOnly: PropTypes.bool,
  required: PropTypes.bool,
  tooltip: PropTypes.string,
  value: PropTypes.number,
};

CustomFieldInputCurrency.defaultProps = {
  className: undefined,
  currencyCode: 'USD',
  errorText: undefined,
  name: undefined,
  onChange: () => {},
  placeholder: undefined,
  readOnly: false,
  required: false,
  tooltip: undefined,
  value: undefined,
};

export default CustomFieldInputCurrency;
