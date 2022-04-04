import PropTypes from 'prop-types';
import React, { forwardRef, useEffect, useImperativeHandle, useLayoutEffect, useRef } from 'react';
import Icons from './icons.jsx';
import styles from './input.css';
import useForwardedRef from '../../hooks/use-forwarded-ref.js';
import useValidation from '../../hooks/use-validation.js';

const Input = forwardRef(function Input(props, forwardedRef) {
  const classNames = {
    container: styles.container,
    input: styles.input,
    invalidInput: styles['invalid-input'],
    ...props.classNames,
  };
  const ids = {
    label: `${props.id}-label`,
    tooltip: `${props.id}-tooltip`,
    validation: props.validationMessageId ?? `${props.id}-validation-message`,
  };
  const refs = {
    input: useRef(),
  };

  const ref = useForwardedRef(forwardedRef);
  const [validationMessage, validate] = useValidation(props.validationMessage, refs.input);

  function onBlur(event) {
    validate();
    props.onBlur(event);
  }

  useLayoutEffect(() => {
    // The MDS Input is using an uncontrolled `<input>`.
    // In order to set a new provided value prop, we
    // set the internal state of the `<input>`.
    refs.input.current.value = props.value || '';
  }, [props.value]);

  useEffect(() => {
    props.onInvalid({
      target: ref.current,
      detail: {
        validationMessage,
      },
    });
  }, [validationMessage]);

  useImperativeHandle(ref, () => ({
    get dirty() {
      const providedValue = props.value || '';
      return providedValue !== this.value;
    },
    /** The name of the control element which is used to reference the data after submitting the control. */
    name: props.name,
    get value() {
      return refs.input.current.value;
    },
  }));

  return (
    <div className={classNames.container} style={{ height: '100%', position: 'relative' }}>
      <input
        autoFocus={props.autoFocus} // eslint-disable-line jsx-a11y/no-autofocus
        aria-describedby={`${ids.validation} ${props.describedBy}`}
        className={validationMessage ? classNames.invalidInput : classNames.input}
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
        ref={refs.input}
        required={props.required}
        type={props.type}
      />
      <Icons
        validationMessage={validationMessage}
        validationMessageId={ids.validation}
      />
    </div>
  );
});

Input.propTypes = {
  autoFocus: PropTypes.bool,
  classNames: PropTypes.shape({
    container: PropTypes.string,
    input: PropTypes.string,
    invalidInput: PropTypes.string,
  }),
  describedBy: PropTypes.string,
  id: PropTypes.string.isRequired,
  maxLength: PropTypes.number,
  name: PropTypes.string,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  onInput: PropTypes.func,
  onInvalid: PropTypes.func,
  onKeyDown: PropTypes.func,
  placeholder: PropTypes.string,
  readOnly: PropTypes.bool,
  required: PropTypes.bool,
  type: PropTypes.oneOf([
    'email',
    'password',
    'text',
  ]),
  validationMessage: PropTypes.string,
  validationMessageId: PropTypes.string,
  value: PropTypes.string,
};

Input.defaultProps = {
  autoFocus: false,
  classNames: {},
  describedBy: '',
  maxLength: undefined,
  name: undefined,
  onBlur: () => {},
  onChange: () => {},
  onFocus: undefined,
  onInput: undefined,
  onInvalid: () => {},
  onKeyDown: undefined,
  placeholder: undefined,
  readOnly: undefined,
  required: undefined,
  tooltip: undefined,
  type: 'text',
  validationMessage: '',
  validationMessageId: undefined,
  value: undefined,
};

export default Input;
