import React, { useState } from 'react';
import PropTypes from 'prop-types';
import CustomFieldInputText from '../custom-field-input-text/custom-field-input-text.jsx';
import { convertToFormat, validDate } from './format-date/format-date.js';

export default function CustomFieldInputDate(props) {
  const [isValid] = useState(validDate(props.value));
  const value = isValid ? convertToFormat(props.value, 'yyyy-mm-dd') : props.value;

  const helpText = () => {
    if (!isValid && !validDate(props.value)) {
      return `"${props.value}" is an invalid date`;
    }

    return '';
  };

  return (<CustomFieldInputText
    disabled={props.disabled}
    error={!isValid}
    helpText={helpText()}
    label={props.label}
    id={props.id}
    type="date"
    value={value}
  />);
}

CustomFieldInputDate.propTypes = {
  disabled: PropTypes.bool,
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.string,
};

CustomFieldInputDate.defaultProps = {
  disabled: false,
  value: '',
};
