import React, { useEffect, useImperativeHandle, useRef } from 'react';
import PropTypes from 'prop-types';
import FormControl from '../form-control/form-control.jsx';
import useValidation from '../../hooks/use-validation.jsx';
import useDidMount from '../../hooks/use-did-mount.js';
import Icon from '../icon/icon.jsx';
import cautionSvg from '../../svgs/caution.svg';
import styles from './number.css';

function getClassName(className, validationMessage) {
  if (className) return className;
  return validationMessage ? styles['invalid-input'] : styles.input;
}

const apiLimits = {
  max: 2 ** 31,
  min: -(2 ** 31),
};

const Number = React.forwardRef((props, ref) => {
  const inputRef = useRef();
  const [didMount] = useDidMount();
  const [validationMessage, validate] = useValidation(props.validationMessage, inputRef);

  useEffect(() => {
    if (!didMount) return;

    // The MDS Number is using an uncontrolled `<input>`.
    // In order to set a new provided value prop, we
    // set the internal state of the `<input>`.
    inputRef.current.value = props.value;
  }, [props.value]);

  function onBlur(event) {
    validate();
    props.onBlur(event);
  }

  function onChange(event) {
    // Do not expose this onChange to any parent component.
    // According to the HTML spec, the event.target.value is
    // an empty string when the input is invalid.
    validate();
    props.onChange(event);
  }

  useImperativeHandle(ref, () => ({
    get dirty() {
      return props.value !== this.value;
    },
    focus() {
      inputRef.current.focus();
    },
    name: props.name,
    get value() {
      if (inputRef.current.value) {
        return parseInt(inputRef.current.value, 10);
      }

      return undefined;
    },
    get validity() {
      return inputRef.current.validity;
    },
  }));

  return (
    <FormControl
      error={validationMessage}
      id={props.id}
      label={props.label}
      readOnly={props.readOnly}
      required={props.required}
    >
      <input
        aria-describedby={`${props.id}Hint`}
        className={getClassName(props.className, validationMessage)}
        defaultValue={props.value}
        id={props.id}
        max={apiLimits.max}
        min={apiLimits.min}
        name={props.name}
        onBlur={onBlur}
        onChange={onChange}
        placeholder={props.placeholder}
        ref={inputRef}
        readOnly={props.readOnly}
        required={props.required}
        step={props.step}
        type="number"
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

Number.propTypes = {
  className: PropTypes.string,
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  name: PropTypes.string,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  readOnly: PropTypes.bool,
  required: PropTypes.bool,
  step: PropTypes.number,
  validationMessage: PropTypes.string,
  value: PropTypes.number,
};

Number.defaultProps = {
  className: undefined,
  name: undefined,
  onBlur: () => {},
  onChange: () => {},
  placeholder: undefined,
  readOnly: false,
  required: false,
  step: 1,
  validationMessage: '',
  value: undefined,
};

export default Number;
