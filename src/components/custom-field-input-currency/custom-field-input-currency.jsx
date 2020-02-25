import PropTypes from 'prop-types';
import React, { useState } from 'react';

import CustomFieldInputText from '../custom-field-input-text/custom-field-input-text.jsx';
import CustomFieldInputTextStyles from '../custom-field-input-text/custom-field-input-text.css';
import CustomFieldInputNumber from "../custom-field-input-number/custom-field-input-number";

function getRootClassName(className, error, disabled) {
  if (disabled) {
    return `${className} ${CustomFieldInputTextStyles.disabled}`;
  }

  if (error) {
    return `${className} ${CustomFieldInputTextStyles.error}`;
  }

  return className;
}

export default function CustomFieldInputCurrency(props) {
  const [input, setInput] = useState(props.value);
  const [isEditing, setIsEditing] = useState(false);

  function handleOnChange(event) {
    let correctedInput = event.target.value;

    if (correctedInput !== '' && correctedInput.indexOf(props.currencySymbol) === -1) {
      correctedInput = `${props.currencySymbol}${correctedInput}`;
    }

    setInput(correctedInput);
    props.onChange(event);
  }

  const sharedProps = {
    className: getRootClassName(props.className, props.error, props.disabled),
    helpText: props.helpText,
    id: props.id,
    label: props.label,
    name: props.name,
    onClick: props.onClick,
    placeholder: props.placeholder,
    required: props.required,
    type: props.type,
  };

  if (isEditing) {
    return (
      <CustomFieldInputNumber
        {...sharedProps}
        value={input}
        onChange={event => handleOnChange(event)}
      />
    );
  }

  return (
    <CustomFieldInputText
      {...sharedProps}
      value={input}
      onChange={event => handleOnChange(event)}
    />
  );
}

CustomFieldInputCurrency.propTypes = {
  className: PropTypes.string,
  currencySymbol: PropTypes.string,
  disabled: PropTypes.bool,
  error: PropTypes.bool,
  helpText: PropTypes.string,
  id: PropTypes.string,
  label: PropTypes.string.isRequired,
  name: PropTypes.string,
  onChange: PropTypes.func,
  onClick: PropTypes.func,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  type: PropTypes.string,
  value: PropTypes.string,
};

CustomFieldInputCurrency.defaultProps = {
  className: CustomFieldInputTextStyles['custom-field-input-text'],
  currencySymbol: '$',
  disabled: false,
  error: false,
  helpText: undefined,
  id: undefined,
  name: undefined,
  onChange: () => {},
  onClick: undefined,
  placeholder: undefined,
  required: false,
  type: 'text', // Our validation can catch more issues than React/HTML with number input type, like --0.1.2
  value: '',
};
