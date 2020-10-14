import PropTypes from 'prop-types';
import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import useValidation from '../../hooks/use-validation.jsx';
import AbstractCustomField from '../__internal__/abstract-custom-field/abstract-custom-field.jsx';

const CustomFieldInputText = forwardRef(function CustomFieldInputText(props, ref) {
  const inputRef = useRef(null);

  const [validationMessage, validate] = useValidation(props.errorText, inputRef);

  function onChange(event) {
    validate();
    props.onChange(event);
  }

  useImperativeHandle(ref, () => ({
    get dirty() {
      const providedValue = props.defaultValue || '';
      return providedValue !== this.value;
    },
    id: props.id,
    name: props.name,
    get value() {
      return inputRef.current.value;
    },
  }));

  return (
    <AbstractCustomField
      ariaProps={props.ariaProps}
      className={props.className}
      defaultValue={props.defaultValue}
      disabled={props.disabled}
      errorText={validationMessage}
      id={props.id}
      inputRef={inputRef}
      label={props.label}
      maxLength={props.maxLength}
      name={props.name}
      onBlur={props.onBlur}
      onChange={onChange}
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
});

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
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  maxLength: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
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
  maxLength: undefined,
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

export default CustomFieldInputText;
