import PropTypes from 'prop-types';
import React, { useRef } from 'react';
import useValidation from '../../hooks/use-validation.jsx';
import AbstractCustomField from '../__internal__/abstract-custom-field.jsx';

export default function CustomFieldInputText(props) {
  const defaultRef = useRef(null);
  const inputRef = props.inputRef || defaultRef;
  const labelId = `${props.id}-label`;

  const validationMessage = useValidation(props.readOnly, props.errorText, inputRef);

  // TODO: When other custom fields are decoupled from this one, remove a few props:
  // icon
  // min/max (maybe they're only used with number?)
  // step
  // type
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
      labelId={labelId}
      max={props.max}
      min={props.min}
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
      step={props.step}
      type={props.type}
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
  max: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
  min: PropTypes.oneOfType([
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
  step: PropTypes.number,
  type: PropTypes.oneOf([
    'date',
    'number',
    'text',
  ]),
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
  max: undefined,
  min: undefined,
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
  step: undefined,
  type: 'text',
  value: undefined,
};
