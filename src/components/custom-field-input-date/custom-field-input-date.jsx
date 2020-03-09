import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import CustomFieldInputText from '../custom-field-input-text/custom-field-input-text.jsx';
import { convertToFormat, validDate } from './format/format-date.js';

const isValidInput = (value) => {
  if (value === '' || value === undefined) {
    return true;
  }

  return validDate(value);
};

export default function CustomFieldInputDate(props) {
  const initialIsValid = (isInputValid = false) => {
    if (props.error) {
      return false;
    }

    if (!isInputValid) {
      return false;
    }

    return isValidInput(props.value);
  };

  const inputRef = useRef(null);
  const [isValid, setIsValid] = useState(initialIsValid());
  const value = validDate(props.value) ? convertToFormat(props.value, 'yyyy-mm-dd') : props.value;

  useEffect(() => {
    if (inputRef && inputRef.current) {
      const isInputValid = inputRef.current.validity.valid;
      setIsValid(initialIsValid(isInputValid));
    }
  });

  const helpText = () => {
    if (!isValid && !isValidInput(props.value)) {
      return `"${props.value}" is an invalid date`;
    }

    return props.helpText;
  };

  return (<CustomFieldInputText
    className={props.className}
    disabled={props.disabled}
    error={!isValid}
    helpText={helpText()}
    id={props.id}
    inputRef={inputRef}
    label={props.label}
    min={convertToFormat(props.min, 'yyyy-mm-dd')}
    max={convertToFormat(props.max, 'yyyy-mm-dd')}
    required={props.required}
    step={0}
    type="date"
    value={value}
  />);
}

CustomFieldInputDate.propTypes = {
  className: PropTypes.string,
  disabled: PropTypes.bool,
  error: PropTypes.bool,
  helpText: PropTypes.string,
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  min: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  max: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  required: PropTypes.bool,
  value: PropTypes.string,
};

CustomFieldInputDate.defaultProps = {
  className: undefined,
  disabled: false,
  error: false,
  helpText: '',
  min: undefined,
  max: undefined,
  required: false,
  value: '',
};
