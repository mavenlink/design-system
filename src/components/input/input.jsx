import PropTypes from 'prop-types';
import React, { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';
import cautionSvg from '../../svgs/caution.svg';
import FormControl from '../form-control/form-control.jsx';
import Icon from '../icon/icon.jsx';
import styles from './input.css';
import useMounted from '../../hooks/use-mounted.js';
import useValidation from '../../hooks/use-validation.jsx';

function getClassName(className, validationMessage) {
  if (className) return className;
  return validationMessage ? styles['invalid-input'] : styles.input;
}

const Input = forwardRef(function Input(props, forwardedRef) {
  const fallbackRef = useRef();
  const ref = forwardedRef || fallbackRef;
  const inputRef = useRef();
  const mounted = useMounted();
  const [validationMessage, validate] = useValidation(props.validationMessage, inputRef);

  const ids = {
    tooltip: `${props.id}-tooltip`,
    validation: `${props.id}Hint`,
  };

  function onBlur(event) {
    validate();
    props.onBlur(event);
  }

  useEffect(() => {
    if (!mounted.current) return;

    // The MDS Input is using an uncontrolled `<input>`.
    // In order to set a new provided value prop, we
    // set the internal state of the `<input>`.
    inputRef.current.value = props.value || '';
  }, [props.value]);

  useImperativeHandle(ref, () => ({
    get dirty() {
      const providedValue = props.value || '';
      return providedValue !== this.value;
    },
    id: props.id,
    name: props.name,
    get value() {
      return inputRef.current.value;
    },
  }));

  return (
    <FormControl
      className={props.cssContainer}
      error={validationMessage}
      id={props.id}
      label={props.label}
      readOnly={props.readOnly}
      required={props.required}
      tooltip={props.tooltip}
    >
      <input
        aria-describedby={`${ids.validation} ${ids.tooltip}`}
        autoFocus={props.autoFocus} // eslint-disable-line jsx-a11y/no-autofocus
        className={getClassName(props.className, validationMessage)}
        defaultValue={props.value}
        id={props.id}
        maxLength={props.maxLength}
        name={props.name}
        onBlur={onBlur}
        onChange={props.onChange}
        onFocus={props.onFocus}
        onInput={props.onInput}
        onKeyDown={props.onKeyDown}
        placeholder={props.placeholder}
        readOnly={props.readOnly}
        ref={inputRef}
        required={props.required}
        type={props.type}
      />
      {!!validationMessage && (
        <Icon
          className={styles['invalid-icon']}
          icon={cautionSvg}
          label={validationMessage}
        />
      )}
    </FormControl>
  );
});

Input.propTypes = {
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
  autoFocus: undefined,
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
  type: 'text',
  validationMessage: '',
  value: undefined,
};

export default Input;
