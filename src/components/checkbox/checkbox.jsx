import React, {forwardRef, useEffect, useImperativeHandle, useLayoutEffect, useRef, useState} from 'react';
import FormControl from '../form-control/form-control.jsx';
import useMounted from '../../hooks/use-mounted';
import Icon from "../icon";
import styles from "../input/input.css";
import cautionSvg from "../../svgs/caution.svg";
import PropTypes from "prop-types";

function getClassName(className, validationMessage) {
  if (className) return className;
  return validationMessage ? styles['invalid-input'] : styles.input;
}

const useValidatedEvents = ({ ref, props }) => {
  const [validationMessage, setValidationMessage] = useState(props.validationMessage);

  useEffect(() => {
    setValidationMessage(props.validationMessage);
  }, [props.validationMessage]);

  useLayoutEffect(() => {
    ref.current.setCustomValidity(validationMessage);
  }, [validationMessage]);

  function onBlur(event) {
    ref.current.setCustomValidity('');
    setValidationMessage(ref.current.validationMessage);
    props.onBlur(event);
  }

  function onChange(event) {
    ref.current.setCustomValidity('');
    setValidationMessage(ref.current.validationMessage);
    props.onChange(event);
  }

  return {
    validationMessage,
    onChange,
    onBlur
  }
}

const Checkbox = forwardRef(function Checkbox(props, forwardedRef) {
  const fallbackRef = useRef();
  const ref = forwardedRef || fallbackRef;
  const inputRef = useRef();
  const mounted = useMounted();
  const { validationMessage, onChange, onBlur } = useValidatedEvents({ ref: inputRef, props })

  useEffect(() => {
    if (!mounted.current) return;

    inputRef.current.checked = props.checked ?? false;
  }, [props.checked]);

  useImperativeHandle(ref, () => ({
    id: props.id,
    name: props.name,
    get checked() {
      return inputRef.current.checked;
    },
    get dirty() {
      const providedValue = props.checked ?? false;
      return providedValue !== this.checked;
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
        defaultChecked={props.checked}
        id={props.id}
        name={props.name}
        onBlur={onBlur}
        onChange={onChange}
        onFocus={props.onFocus}
        readOnly={props.readOnly}
        ref={inputRef}
        required={props.required}
        type="checkbox"
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

Checkbox.propTypes = {
  className: PropTypes.string,
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  name: PropTypes.string,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  readOnly: PropTypes.bool,
  required: PropTypes.bool,
  validationMessage: PropTypes.string,
  checked: PropTypes.bool,
}

Checkbox.defaultProps = {
  className: undefined,
  name: undefined,
  onBlur: () => {},
  onChange: () => {},
  onFocus: () => {},
  readOnly: undefined,
  required: undefined,
  validationMessage: '',
  checked: undefined,
}


export default Checkbox;
