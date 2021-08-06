import PropTypes from 'prop-types';
import React, { forwardRef, useImperativeHandle, useRef } from 'react';
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
      return inputRef.current.value;
    },
  }));

  return (
    <Number
      className={props.className}
      id={props.id}
      label={props.label}
      max={apiLimits.max}
      min={apiLimits.min}
      name={props.name}
      onBlur={props.onBlur}
      onChange={props.onChange}
      placeholder={props.placeholder}
      readOnly={props.readOnly || props.disabled}
      ref={inputRef}
      required={props.required}
      step={props.step}
      tooltip={props.tooltip}
      type="number"
      validationMessage={props.errorText}
      value={props.value}
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
  /**
   * The handler is invoked for every native onchange event.
   * **Beware:** According to the HTML spec, the `event.target.value` is
   * an empty string when the input is invalid.
   */
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  readOnly: PropTypes.bool,
  required: PropTypes.bool,
  step: PropTypes.number,
  tooltip: PropTypes.string,
  value: PropTypes.number,
};

CustomFieldInputNumber.defaultProps = {
  className: undefined,
  disabled: false,
  errorText: '',
  name: undefined,
  onBlur: () => {},
  onChange: () => {},
  placeholder: undefined,
  readOnly: false,
  required: false,
  step: 1,
  tooltip: undefined,
  value: undefined,
};

export default CustomFieldInputNumber;
