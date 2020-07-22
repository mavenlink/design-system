import PropTypes from 'prop-types';
import React, { useEffect, useRef, useState } from 'react';
import styles from '../__internal__/abstract-custom-field/abstract-custom-field.css';
import useValidation from '../../hooks/use-validation.jsx';
import AbstractCustomField from '../__internal__/abstract-custom-field/abstract-custom-field.jsx';

const apiLimits = {
  max: 2 ** 31,
  min: -(2 ** 31),
};

export default function CustomFieldInputNumber(props) {
  const fallbackRef = useRef(null);
  const inputRef = props.inputRef || fallbackRef;

  const [checkedValidity, setCheckedValidity] = useState(false);
  const validationMessage = useValidation(props.readOnly, props.errorText, inputRef, checkedValidity);

  function handleOnKeyUp(event) {
    setCheckedValidity(!event.target.checkValidity());
  }

  useEffect(() => {
    if (!inputRef.current) return;

    setCheckedValidity(!inputRef.current.validity.valid);
  });

  return (
    <AbstractCustomField
      className={props.className}
      defaultValue={props.value}
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
}

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
