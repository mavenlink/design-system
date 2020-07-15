import PropTypes from 'prop-types';
import React, { forwardRef, useImperativeHandle, useEffect, useRef, useState } from 'react';
import styles from '../__internal__/abstract-custom-field.css';
import useValidation from '../../hooks/use-validation.jsx';
import AbstractCustomField from '../__internal__/abstract-custom-field.jsx';
import useCustomFieldValue from '../../hooks/use-custom-field-value';

const apiLimits = {
  max: 2 ** 31,
  min: -(2 ** 31),
};

const CustomFieldInputNumber = forwardRef(function CustomFieldInputNumber(props, ref) {
  const inputRef = props.inputRef || useRef(null);

  const validationMessage = useValidation(props.readOnly, props.errorText, inputRef);
  const [invalid, setInvalid] = useState(validationMessage !== '');
  useCustomFieldValue(props.id, ref, () => inputRef.current.value);

  function handleOnKeyUp(event) {
    setInvalid(!event.target.checkValidity());
  }

  useEffect(() => {
    if (!inputRef.current) return;

    setInvalid(!inputRef.current.validity.valid);
  });

  useEffect(() => {
    const hasError = props.errorText.length > 0;
    setInvalid(hasError);
  }, [props.errorText]);

  return (
    <AbstractCustomField
      className={props.className}
      defaultValue={props.value}
      disabled={props.disabled}
      error={invalid}
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
      respectNativeValidity
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
  inputRef: PropTypes.shape({ current: PropTypes.any }),
  label: PropTypes.string.isRequired,
  name: PropTypes.string,
  onBlur: PropTypes.func,
  // onChange: Do not expose the onChange handler. See commit for details.
  placeholder: PropTypes.string,
  readOnly: PropTypes.bool,
  required: PropTypes.bool,
  step: PropTypes.number,
  value: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.oneOf(['']),
  ]),
};

CustomFieldInputNumber.defaultProps = {
  className: styles['custom-field-input-text'],
  disabled: false,
  errorText: '',
  inputRef: undefined,
  name: undefined,
  onBlur: () => {},
  placeholder: undefined,
  readOnly: false,
  required: false,
  step: 1,
  value: '',
};

export default CustomFieldInputNumber;
