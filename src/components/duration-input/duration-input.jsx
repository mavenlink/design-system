import PropTypes from 'prop-types';
import React, { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import Input from '../input/input.jsx';
import { formatTime, timeToMinutes } from './duration-formatter.js';

const DurationInput = forwardRef(function DurationInput(props, ref) {
  const ids = {
    label: `${props.id}-label`,
    tooltip: `${props.id}-tooltip`,
  };

  const inputRef = useRef();
  const [formattedValue, setFormattedValue] = useState(formatTime(props.value));

  useImperativeHandle(ref, () => ({
    get dirty() {
      const providedValue = props.value;
      return providedValue !== this.value;
    },
    get value() {
      const val = timeToMinutes(inputRef.current.value);
      return val;
    },
    get id() {
      return props.id;
    },
    get name() {
      return props.name;
    },
  }));

  function onBlur(e) {
    const duration = timeToMinutes(e.target.value);
    const formattedTime = formatTime(duration);
    if (formattedTime) {
      setFormattedValue(formattedTime);
    }
    props.onBlur(e);
  }

  return (
    <Input
      cssContainer={props.cssContainer}
      id={props.id}
      label={props.label}
      labelId={ids.label}
      name={props.name}
      ref={inputRef}
      readOnly={props.readOnly}
      required={props.required}
      tooltip={props.tooltip}
      autoFocus={props.autoFocus}
      className={props.className}
      describedBy={ids.tooltip}
      labelledBy={ids.label}
      maxLength={props.maxLength}
      onBlur={onBlur}
      onChange={props.onChange}
      onFocus={props.onFocus}
      onInput={props.onInput}
      onKeyDown={props.onKeyDown}
      placeholder={props.placeholder}
      validationMessage={props.validationMessage}
      value={formattedValue}
    />
  );
});

DurationInput.propTypes = {
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
  validationMessage: PropTypes.string,
  value: PropTypes.number,
};

DurationInput.defaultProps = {
  autoFocus: false,
  className: undefined,
  cssContainer: undefined,
  cssLabel: undefined,
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
  validationMessage: '',
  value: undefined,
};

export default DurationInput;
