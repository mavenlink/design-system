import PropTypes from 'prop-types';
import React, { useState } from 'react';

import CustomFieldInputText from '../custom-field-input-text/custom-field-input-text.jsx';
import CustomFieldInputTextStyles from '../custom-field-input-text/custom-field-input-text.css';
import useNumberValidator from '../../hooks/number-validator/number-validator.jsx';

function getRootClassName(className, error, disabled) {
  if (disabled) {
    return `${className} ${CustomFieldInputTextStyles.disabled}`;
  }

  if (error) {
    return `${className} ${CustomFieldInputTextStyles.error}`;
  }

  return className;
}

export default function CustomFieldInputNumber(props) {
  const [input, setInput] = useState('');
  const valid = props.useValidator(input);

  return (
    <CustomFieldInputText
      className={getRootClassName(props.className, props.error, props.disabled)}
      disabled={props.disabled}
      error={!valid}
      helpText={props.helpText}
      id={props.id}
      name={props.name}
      onChange={event => setInput(event.target.value)}
      onClick={props.onClick}
      placeholder={props.placeholder}
      required={props.required}
      value={props.value}
    />
  );
}

CustomFieldInputNumber.propTypes = {
  className: PropTypes.string,
  disabled: PropTypes.bool,
  error: PropTypes.bool,
  helpText: PropTypes.string,
  id: PropTypes.string,
  name: PropTypes.string,
  onClick: PropTypes.func,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  useValidator: PropTypes.func,
  value: PropTypes.string,
};

CustomFieldInputNumber.defaultProps = {
  className: CustomFieldInputTextStyles['custom-field-input-text'],
  disabled: false,
  error: false,
  helpText: undefined,
  id: undefined,
  name: undefined,
  onClick: () => {},
  placeholder: undefined,
  required: false,
  useValidator: useNumberValidator,
  value: undefined,
};
