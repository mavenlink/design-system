import PropTypes from 'prop-types';
import React, { forwardRef, useImperativeHandle, useEffect, useRef, useState } from 'react';
import styles from '../__internal__/abstract-custom-field/abstract-custom-field.css';
import useValidation from '../../hooks/use-validation.jsx';
import AbstractCustomField from '../__internal__/abstract-custom-field/abstract-custom-field.jsx';

const apiLimits = {
  max: 2 ** 31,
  min: -(2 ** 31),
};

const CustomFieldInputNumber = forwardRef(function CustomFieldInputNumber(props, ref) {
  const inputRef = useRef(null);

  const [checkedValidity, setCheckedValidity] = useState(false);
  const validationMessage = useValidation(props.readOnly, props.errorText, inputRef, checkedValidity);

  function handleOnKeyUp(event) {
    setCheckedValidity(!event.target.checkValidity());
  }

  useEffect(() => {
    if (!inputRef.current) return;

    setCheckedValidity(!inputRef.current.validity.valid);
  });

  useImperativeHandle(ref, () => ({
    get dirty() {
      const providedValue = props.value ? String(props.value) : '';
      return providedValue !== this.value;
    },
    focus: () => {
      return inputRef.current.focus();
    },
    id: props.id,
    name: props.name,
    get validity() {
      return inputRef.current.validity;
    },
    get value() {
      return inputRef.current.value;
    },
  }));

  const value = props.value === undefined ? '' : props.value.toString();

  return (
    <AbstractCustomField
      className={props.className}
      defaultValue={value}
      disabled={props.disabled}
      errorText={validationMessage}
      id={props.id}
      inputRef={inputRef}
      label={props.label}
      max={apiLimits.max}
      min={apiLimits.min}
      name={props.name}
      onBlur={props.onBlur}
      onKeyUp={handleOnKeyUp}
      placeholder={props.placeholder}
      readOnly={props.readOnly}
      required={props.required}
      step={props.step}
      type="number"
    />
  );
});

CustomFieldInputNumber.propTypes = {
  className: PropTypes.string,
  disabled: PropTypes.bool,
  errorText: PropTypes.string,
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  name: PropTypes.string,
  onBlur: PropTypes.func,
  // onChange: Do not expose the onChange handler. See commit for details.
  placeholder: PropTypes.string,
  readOnly: PropTypes.bool,
  required: PropTypes.bool,
  step: PropTypes.number,
  value: PropTypes.number,
};

CustomFieldInputNumber.defaultProps = {
  className: styles['custom-field-input-text'],
  disabled: false,
  errorText: '',
  name: undefined,
  onBlur: () => {},
  placeholder: undefined,
  readOnly: false,
  required: false,
  step: 1,
  value: undefined,
};

export default CustomFieldInputNumber;
