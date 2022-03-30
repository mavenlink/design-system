import PropTypes from 'prop-types';
import React, { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import FormControl from '../form-control/form-control.jsx';
import InputControl from '../control/input.jsx';

const Input = forwardRef(function Input(props, ref) {
  const ids = {
    label: `${props.id}-label`,
    tooltip: `${props.id}-tooltip`,
  };
  const refs = {
    control: useRef(),
    input: useRef(),
  };

  const [validationMessage, setValidationMessage] = useState('');

  useImperativeHandle(ref, () => ({
    ...refs.control.current,
    get dirty() { return refs.input.current.dirty; }, // TODO: Dynamic composition?
    get value() { return refs.input.current.value; }, // Spread operator does not work with getters
  }));

  return (
    <FormControl
      className={props.cssContainer}
      id={props.id}
      label={props.label}
      labelId={ids.label}
      name={props.name}
      readOnly={props.readOnly}
      ref={refs.control}
      required={props.required}
      tooltip={props.tooltip}
      validationMessage={validationMessage}
    >
      <InputControl
        autoFocus={props.autoFocus}
        classNames={props.className ? {
          input: props.className,
        } : undefined}
        describedBy={ids.tooltip}
        id={props.id}
        labelledBy={ids.label}
        maxLength={props.maxLength}
        name={props.name}
        onBlur={props.onBlur}
        onChange={props.onChange}
        onFocus={props.onFocus}
        onInput={props.onInput}
        onInvalid={event => setValidationMessage(event.detail.validationMessage)}
        onKeyDown={props.onKeyDown}
        placeholder={props.placeholder}
        readOnly={props.readOnly}
        ref={refs.input}
        required={props.required}
        type={props.type}
        validationMessage={props.validationMessage}
        value={props.value}
      />
    </FormControl>
  );
});

Input.propTypes = {
  /** Auto-focus the input control when mounted. */
  autoFocus: PropTypes.bool,
  className: PropTypes.string,
  cssContainer: PropTypes.string,
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  maxLength: PropTypes.number,
  name: PropTypes.string,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  onInput: PropTypes.func,
  onKeyDown: PropTypes.func,
  placeholder: PropTypes.string,
  readOnly: PropTypes.bool,
  required: PropTypes.bool,
  tooltip: PropTypes.string,
  type: PropTypes.oneOf([
    'email',
    'password',
    'text',
  ]),
  validationMessage: PropTypes.string,
  value: PropTypes.string,
};

Input.defaultProps = {
  autoFocus: false,
  className: undefined,
  cssContainer: undefined,
  cssLabel: undefined,
  controlRef: undefined,
  inputRef: undefined,
  maxLength: undefined,
  name: undefined,
  onBlur: () => {},
  onChange: () => {},
  onFocus: undefined,
  onInput: undefined,
  onKeyDown: undefined,
  placeholder: undefined,
  readOnly: undefined,
  required: undefined,
  tooltip: undefined,
  type: 'text',
  validationMessage: '',
  value: undefined,
};

export default Input;
