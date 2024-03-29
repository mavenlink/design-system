import PropTypes from 'prop-types';
import React, { forwardRef, useImperativeHandle, useState, useRef, useEffect } from 'react';
import Input from './input.jsx';
import Number from './number.jsx';
import currencyCodeType from '../../utils/currency-code-type.js';
import currencyMetaData from '../../utils/currency-meta-data.js';
import { initialInputValid, subunitToUnit, formatValue } from '../../utils/money-formatter.js';

const Money = forwardRef(function Money(props, ref) {
  const [input, setInput] = useState(subunitToUnit(props.value, props.currencyCode));
  const [isFocused, setIsFocused] = useState(false);
  const [validationMessage, setValidationMessage] = useState(props.validationMessage);
  const [isEditing, setIsEditing] = useState(!!validationMessage);
  const componentRef = useRef(null);
  const numberRef = useRef(null);
  const valueRef = isEditing ? numberRef : componentRef;

  function handleOnBlur(event) {
    if (numberRef.current.validity.valid) {
      setInput(event.target.value === '' ? undefined : parseFloat(event.target.value));
      setValidationMessage('');
      setIsEditing(false);
    }

    props.onBlur(event);
    setIsFocused(false);
  }

  function handleOnFocus(event) {
    if (props.readOnly) return;
    props.onFocus(event);
    setIsEditing(true);
    setIsFocused(true);
  }

  function onInvalid(event) {
    setValidationMessage(event.detail.validationMessage);
  }

  useEffect(() => {
    if (!numberRef.current && !initialInputValid(props.value)) {
      setIsEditing(true);
    }
  }, []);

  useEffect(() => {
    props.onInvalid({ detail: { validationMessage } });
  }, [validationMessage]);

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
      return props.value !== this.value;
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

      return numberValue;
    },
  }));

  const formattedNumber = formatValue(input, props.currencyCode);

  if (isEditing) {
    return (
      <Number
        className={props.className}
        id={props.id}
        name={props.name}
        onBlur={handleOnBlur}
        onChange={props.onChange}
        onInvalid={onInvalid}
        placeholder={props.placeholder}
        readOnly={props.readOnly}
        required={props.required}
        ref={numberRef}
        step={currencyMetaData[props.currencyCode].step}
        validationMessage={props.validationMessage}
        value={input}
      />
    );
  }

  return (
    <Input
      classNames={props.className ? {
        input: props.className,
      } : undefined}
      describedBy={props.describedBy}
      id={props.id}
      name={props.name}
      onFocus={handleOnFocus}
      onInvalid={onInvalid}
      placeholder={props.placeholder}
      readOnly={props.readOnly}
      required={props.required}
      ref={componentRef}
      type="text"
      validationMessage={props.validationMessage}
      value={formattedNumber}
    />
  );
});

Money.propTypes = {
  className: PropTypes.string,
  currencyCode: currencyCodeType,
  describedBy: PropTypes.string,
  id: PropTypes.string.isRequired,
  name: PropTypes.string,
  /**
   * The handler is invoked for every native onchange event.
   * The handler will be invoked with the forwarded ref.
   */
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  onInvalid: PropTypes.func,
  placeholder: PropTypes.string,
  readOnly: PropTypes.bool,
  required: PropTypes.bool,
  validationMessage: PropTypes.string,
  value: PropTypes.number,
};

Money.defaultProps = {
  className: undefined,
  currencyCode: 'USD',
  describedBy: '',
  errorText: undefined,
  name: undefined,
  onBlur: () => {},
  onChange: () => {},
  onInvalid: () => {},
  onFocus: () => {},
  placeholder: undefined,
  readOnly: false,
  required: false,
  tooltip: undefined,
  validationMessage: '',
  value: undefined,
};

export default Money;
