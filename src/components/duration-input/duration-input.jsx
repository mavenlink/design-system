import PropTypes from 'prop-types';
import React, { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import FormControl from '../form-control/form-control.jsx';
import InputControl from '../control/input.jsx';
import useForwardedRef from '../../hooks/use-forwarded-ref.js';
import { formatTime, timeToMinutes } from './duration-formatter.js';

const DurationInput = forwardRef(function DurationInput(props, forwardedRef) {
  const ids = {
    label: `${props.id}-label`,
    tooltip: `${props.id}-tooltip`,
  };
  const refs = {
    control: useRef(),
    input: useRef(),
  };

  const ref = useForwardedRef(forwardedRef);
  const [invalid, setInvalid] = useState('');
  const [formattedValue, setFormattedValue] = useState(formatTime(props.value));

  useImperativeHandle(ref, () => ({
    get dirty() {
      const providedValue = props.value;
      return providedValue !== this.value;
    },
    get value() {
      const val = timeToMinutes(refs.input.current.value);
      return val;
    },
    contains(node) {
      return refs.control.current.contains(node);
    },
    get id() {
      return refs.control.current.id;
    },
    get name() {
      return refs.control.current.name;
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
    <FormControl
      className={props.cssContainer}
      error={invalid}
      id={props.id}
      label={props.label}
      labelId={ids.label}
      name={props.name}
      readOnly={props.readOnly}
      ref={refs.control}
      required={props.required}
      tooltip={props.tooltip}
    >
      <InputControl
        autoFocus={props.autoFocus}
        className={props.className}
        describedBy={ids.tooltip}
        id={props.id}
        labelledBy={ids.label}
        maxLength={props.maxLength}
        name={props.name}
        onBlur={onBlur}
        onChange={props.onChange}
        onFocus={props.onFocus}
        onInput={props.onInput}
        onInvalid={event => setInvalid(event.detail.validationMessage)}
        onKeyDown={props.onKeyDown}
        placeholder={props.placeholder}
        readOnly={props.readOnly}
        ref={refs.input}
        required={props.required}
        validationMessage={props.validationMessage}
        value={formattedValue}
      />
    </FormControl>
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
