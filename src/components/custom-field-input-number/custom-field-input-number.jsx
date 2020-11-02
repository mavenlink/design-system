import PropTypes from 'prop-types';
import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import styles from '../__internal__/abstract-custom-field/abstract-custom-field.css';
import useValidation from '../../hooks/use-validation.jsx';
import Number from '../number/number.jsx';

const apiLimits = {
  max: 2 ** 31,
  min: -(2 ** 31),
};

const CustomFieldInputNumber = forwardRef(function CustomFieldInputNumber(props, ref) {
  const inputRef = useRef(null);
  const [validationMessage, validate] = useValidation(props.errorText, inputRef);

  function onChange() {
    // Do not expose this onChange to any parent component.
    // According to the HTML spec, the event.target.value is
    // an empty string when the input is invalid.
    validate();
  }

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
      return inputRef.current.value;
    },
  }));

  const value = props.value === undefined ? '' : props.value.toString();

  return (
    <Number
      className={props.className}
      defaultValue={value}
      disabled={props.disabled}
      errorText={validationMessage}
      id={props.id}
      label={props.label}
      max={apiLimits.max}
      min={apiLimits.min}
      name={props.name}
      onBlur={props.onBlur}
      onChange={onChange}
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
