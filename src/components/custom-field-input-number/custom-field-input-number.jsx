import PropTypes from 'prop-types';
import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import styles from '../__internal__/abstract-custom-field/abstract-custom-field.css';
import Number from '../number/number.jsx';

const apiLimits = {
  max: 2 ** 31,
  min: -(2 ** 31),
};

const CustomFieldInputNumber = forwardRef(function CustomFieldInputNumber(props, ref) {
  const inputRef = useRef(null);

  useImperativeHandle(ref, () => ({
    get dirty() {
      return inputRef.current.dirty;
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
      return String(inputRef.current.value);
    },
  }));

  return (
    <Number
      className={props.className}
      value={props.value}
      disabled={props.disabled}
      errorText={props.errorText}
      id={props.id}
      label={props.label}
      max={apiLimits.max}
      min={apiLimits.min}
      name={props.name}
      onBlur={props.onBlur}
      placeholder={props.placeholder}
      readOnly={props.readOnly}
      ref={inputRef}
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
