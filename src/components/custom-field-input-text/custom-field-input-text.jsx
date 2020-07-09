import PropTypes from 'prop-types';
import React, { useRef } from 'react';
import useValidation from '../../hooks/use-validation.jsx';
import AbstractCustomField from '../__internal__/abstract-custom-field.jsx';

export default function CustomFieldInputText(props) {
  const defaultRef = useRef(null);
  const inputRef = props.inputRef || defaultRef;

  const validationMessage = useValidation(props.readOnly, props.errorText, inputRef);

  // TODO: When other custom fields are decoupled from this one, remove a few props:
  // icon
  return (
    <AbstractCustomField
      ariaProps={props.ariaProps}
      className={props.className}
      defaultValue={props.defaultValue}
      disabled={props.disabled}
      errorText={validationMessage}
      icon={props.icon}
      id={props.id}
      inputRef={inputRef}
      label={props.label}
      name={props.name}
      onBlur={props.onBlur}
      onChange={props.onChange}
      onClick={props.onClick}
      onFocus={props.onFocus}
      onKeyDown={props.onKeyDown}
      onKeyUp={props.onKeyUp}
      placeholder={props.placeholder}
      readOnly={props.readOnly}
      required={props.required}
      type="text"
      value={props.value}
    />
  );
}

CustomFieldInputText.propTypes = {
  ariaProps: PropTypes.shape({
    autocomplete: PropTypes.string,
    haspopup: PropTypes.string,
  }),
  className: PropTypes.string,
  defaultValue: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
  disabled: PropTypes.bool,
  errorText: PropTypes.string,
  icon: PropTypes.node,
  id: PropTypes.string.isRequired,
  inputRef: PropTypes.shape({ current: PropTypes.any }),
  label: PropTypes.string.isRequired,
  name: PropTypes.string,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  onClick: PropTypes.func,
  onFocus: PropTypes.func,
  onKeyDown: PropTypes.func,
  onKeyUp: PropTypes.func,
  placeholder: PropTypes.string,
  readOnly: PropTypes.bool,
  required: PropTypes.bool,
  value: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
};

CustomFieldInputText.defaultProps = {
  ariaProps: {},
  className: undefined,
  defaultValue: undefined,
  disabled: false,
  errorText: '',
  icon: undefined,
  inputRef: undefined,
  name: undefined,
  onBlur: () => {},
  onChange: () => {},
  onClick: () => {},
  onFocus: () => {},
  onKeyDown: () => {},
  onKeyUp: () => {},
  placeholder: undefined,
  readOnly: false,
  required: false,
  value: undefined,
};
