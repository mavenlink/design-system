import PropTypes from 'prop-types';
import React, {
  forwardRef,
  useEffect,
  useRef,
} from 'react';
import cautionSvg from '../../svgs/caution.svg';
import FormControl from '../form-control/form-control.jsx';
import Icon from '../icon/icon.jsx';
import styles from './input.css';
import useDidMount from '../../hooks/use-did-mount.js';
import useValidation from '../../hooks/use-validation.jsx';

function getClassName(className, invalid, readOnly) {
  if (className) return className;
  return isInvalid(invalid, readOnly) ? styles['invalid-input'] : styles.input;
}

function isInvalid(invalid, readOnly) {
  return invalid && !readOnly;
}

const Input = forwardRef(function Input(props, forwardedRef) {
  const fallbackRef = useRef();
  const ref = forwardedRef || fallbackRef;
  const [didMount] = useDidMount();
  const [validationMessage, validate] = useValidation(props.validationMessage, ref);

  function onBlur(event) {
    validate();
    props.onBlur(event);
  }

  function onChange(event) {
    validate();
    props.onChange(event);
  }

  useEffect(() => {
    if (!didMount) return;

    // The MDS Input is using an uncontrolled `<input>`.
    // In order to set a new provided value prop, we
    // set the internal state of the `<input>`.
    ref.current.value = props.value;
  }, [props.value]);

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
        autoFocus={props.autoFocus} // eslint-disable-line jsx-a11y/no-autofocus
        className={getClassName(props.className, props.invalid, props.readOnly)}
        defaultValue={props.value}
        id={props.id}
        maxLength={props.maxLength}
        name={props.name}
        onBlur={onBlur}
        onChange={onChange}
        onFocus={props.onFocus}
        onInput={props.onInput}
        onKeyDown={props.onKeyDown}
        placeholder={props.placeholder}
        readOnly={props.readOnly}
        ref={ref}
        required={props.required}
        type={props.type}
      />
      {isInvalid(props.invalid, props.readOnly) && (
        <Icon
          className={styles['invalid-icon']}
          icon={cautionSvg}
          label="Invalid input"
        />
      )}
    </FormControl>
  );
});

Input.propTypes = {
  autoFocus: PropTypes.bool,
  className: PropTypes.string,
  cssContainer: PropTypes.string,
  defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
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
  cssContainer: styles.container,
  cssLabel: undefined,
  defaultValue: undefined,
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
  type: 'text',
  validationMessage: '',
  value: undefined,
};

export default Input;
