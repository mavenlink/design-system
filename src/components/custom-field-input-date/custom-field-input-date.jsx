import React, { useState } from 'react';
import PropTypes from 'prop-types';
import CustomFieldInputText from '../custom-field-input-text/custom-field-input-text.jsx';
import { convertToFormat, validDate } from './format-date/format-date.js';

const isValidInput = (value) => {
  if (value === '' || value === undefined) {
    return true;
  }

  return validDate(value);
};

export default function CustomFieldInputDate(props) {
  const initialIsValid = () => {
    if (props.error) {
      return false;
    }

    return isValidInput(props.value);
  };

  const [isValid] = useState(initialIsValid());
  const value = validDate(props.value) ? convertToFormat(props.value, 'yyyy-mm-dd') : props.value;

  const helpText = () => {
    if (!isValid && !isValidInput(props.value)) {
      return `"${props.value}" is an invalid date`;
    }

    return props.helpText;
  };

  return (<CustomFieldInputText
    disabled={props.disabled}
    error={!isValid}
    helpText={helpText()}
    id={props.id}
    label={props.label}
    required={props.required}
    type="date"
    value={value}
  />);
}

CustomFieldInputDate.propTypes = {
  disabled: PropTypes.bool,
  error: PropTypes.bool,
  helpText: PropTypes.string,
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  required: PropTypes.bool,
  value: PropTypes.string,
};

CustomFieldInputDate.defaultProps = {
  disabled: false,
  error: false,
  helpText: '',
  required: false,
  value: '',
};
