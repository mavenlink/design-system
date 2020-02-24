import PropTypes from 'prop-types';
import React, { useState } from 'react';

import CustomFieldInputText from '../custom-field-input-text/custom-field-input-text.jsx';
import CustomFieldInputTextStyles from '../custom-field-input-text/custom-field-input-text.css';
import useCurrencyValidator from '../../hooks/currency-validator/currency-validator.jsx';

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
  const valid = props.useValidator(input, props.currencySymbol);

  function handleOnChange(event) {
    let correctedInput = event.target.value;

    if (correctedInput !== '' && correctedInput.indexOf(props.currencySymbol) === -1) {
      correctedInput = `${props.currencySymbol}${correctedInput}`;
    }

    setInput(correctedInput);
    props.onChange(event);
  }

  return (
    <CustomFieldInputText
      className={getRootClassName(props.className, props.error, props.disabled)}
      disabled={props.disabled}
      error={!valid}
      helpText={props.helpText}
      id={props.id}
      label={props.label}
      name={props.name}
      onChange={event => handleOnChange(event)}
      onClick={props.onClick}
      placeholder={props.placeholder}
      required={props.required}
      type={props.type}
      value={input}
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
  useValidator: PropTypes.func,
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
  useValidator: useCurrencyValidator,
  value: '',
};
