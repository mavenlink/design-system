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
  const [input, setInput] = useState(props.value);
  const valid = props.useValidator(input);

  function handleOnChange(event) {
    setInput(event.target.value);
    props.onChange(event);
  }

  return (
    <CustomFieldInputText
      className={getRootClassName(props.className, props.error, props.disabled)}
      disabled={props.disabled}
      error={!valid}
      helpText={props.helpText}
      id={props.id}
      name={props.name}
      onChange={event => handleOnChange(event)}
      onClick={props.onClick}
      placeholder={props.placeholder}
      required={props.required}
      type="number"
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
  onChange: PropTypes.func,
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
  onChange: () => {},
  onClick: undefined,
  placeholder: undefined,
  required: false,
  useValidator: useNumberValidator,
  value: undefined,
};
