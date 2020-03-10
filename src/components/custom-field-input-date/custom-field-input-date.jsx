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

const isValueValid = (value, error, isInputValid = false) => {
  if (error) {
    return false;
  }

  if (!isInputValid) {
    return false;
  }

  return isValidInput(value);
};

export default function CustomFieldInputDate(props) {
  const inputRef = useRef(null);
  const [isValid, setIsValid] = useState(isValueValid(props.value, props.error, true));
  const [isFocused] = useState(false);

  useEffect(() => {
    if (inputRef && inputRef.current) {
      const isInputValid = inputRef.current.validity.valid;
      setIsValid(isValueValid(props.value, props.error, isInputValid));
    }
  });

  const onChange = (event) => {
    if (inputRef && inputRef.current) {
      const isInputValid = inputRef.current.validity.valid;
      const newDate = convertToFormat(event.target.value, 'yyyy-mm-dd');
      setIsValid(isValueValid(newDate, props.error, isInputValid) && validDate(newDate));
    }
  };

  const helpText = () => {
    if (!isValid && !isValidInput(props.value)) {
      return `"${props.value}" is an invalid date`;
    }

    return props.helpText;
  };

  const sharedProps = {
    className: props.className,
    disabled: props.disabled,
    label: props.label,
    required: props.required,
  };

  if (isFocused || !isValid) {
    const value = validDate(props.value) ? convertToFormat(props.value, 'yyyy-mm-dd') : props.value;

    return (<CustomFieldInputText
      {...sharedProps}
      error={!isValid}
      helpText={helpText()}
      id={props.id}
      inputRef={inputRef}
      min={convertToFormat(props.min, 'yyyy-mm-dd')}
      max={convertToFormat(props.max, 'yyyy-mm-dd')}
      onChange={e => onChange(e)}
      step={0}
      type="date"
      value={value}
    />);
  }

  return (<CustomFieldInputText
    {...sharedProps}
    id={props.id}
    type="text"
    value={convertToFormat(props.value, 'Month dd, yyyy')}
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
