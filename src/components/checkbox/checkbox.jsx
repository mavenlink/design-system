import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import PropTypes from 'prop-types';
import FormControl from '../form-control/form-control.jsx';
import useMounted from '../../hooks/use-mounted.js';
import Icon from '../icon/icon.jsx';
import styles from './checkbox.css';
import cautionSvg from '../../svgs/caution.svg';

const Checkbox = forwardRef(function Checkbox(props, forwardedRef) {
  const fallbackRef = useRef();
  const ref = forwardedRef || fallbackRef;
  const inputRef = useRef();
  const mounted = useMounted();
  const [validationMessage, setValidationMessage] = useState(props.validationMessage);

  useEffect(() => {
    if (!mounted.current) return;

    inputRef.current.checked = props.checked;
  }, [props.checked]);

  useEffect(() => {
    setValidationMessage(props.validationMessage);
  }, [props.validationMessage]);

  useLayoutEffect(() => {
    inputRef.current.setCustomValidity(validationMessage);
  }, [validationMessage]);

  useImperativeHandle(ref, () => ({
    id: props.id,
    name: props.name,
    get value() {
      if (props.value) return props.value;

      return inputRef.current.checked ? 'on' : 'off';
    },
    get checked() {
      return inputRef.current.checked;
    },
    get dirty() {
      const providedValue = props.checked || false;
      return providedValue !== this.checked;
    },
  }));

  const className = props.className || styles.input;

  function onBlur(event) {
    inputRef.current.setCustomValidity('');
    setValidationMessage(inputRef.current.validationMessage);
    props.onBlur(event);
  }

  function onChange(event) {
    inputRef.current.setCustomValidity('');
    setValidationMessage(inputRef.current.validationMessage);
    props.onChange(event);
  }

  return (
    <FormControl
      className={props.cssContainer}
      error={validationMessage}
      id={props.id}
      label={props.label}
      readOnly={props.readOnly}
      required={props.required}
    >
      <input
        aria-describedby={`${props.id}Hint`}
        className={className}
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
  checked: PropTypes.bool,
  className: PropTypes.string,
  cssContainer: PropTypes.string,
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  name: PropTypes.string,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  readOnly: PropTypes.bool,
  required: PropTypes.bool,
  validationMessage: PropTypes.string,
  value: PropTypes.string,
};

Checkbox.defaultProps = {
  checked: undefined,
  className: undefined,
  cssContainer: undefined,
  name: undefined,
  onBlur: () => {},
  onChange: () => {},
  onFocus: () => {},
  readOnly: undefined,
  required: undefined,
  validationMessage: '',
  value: undefined,
};

export default Checkbox;
