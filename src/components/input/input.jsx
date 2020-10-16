import PropTypes from 'prop-types';
import React, {
  useEffect,
  useRef,
} from 'react';
import cautionSvg from '../../svgs/caution.svg';
import FormControl from '../form-control/form-control.jsx';
import Icon from '../icon/icon.jsx';
import styles from './input.css';
import useDidMount from '../../hooks/use-did-mount.js';

function getClassName(className, invalid, readOnly) {
  if (className) return className;
  return isInvalid(invalid, readOnly) ? styles['invalid-input'] : styles.input;
}

function isInvalid(invalid, readOnly) {
  return invalid && !readOnly;
}

export default function Input(props) {
  const fallbackRef = useRef();
  const ref = props.inputRef || fallbackRef;
  const [didMount] = useDidMount();

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
      error={props.invalid ? 'Invalid value.' : ''}
      id={props.id}
      label={props.label}
      readOnly={props.readOnly}
      required={props.required}
    >
      <input
        autoFocus={props.autoFocus} // eslint-disable-line jsx-a11y/no-autofocus
        className={getClassName(props.className, props.invalid, props.readOnly)}
        defaultValue={props.value}
        disabled={props.disabled}
        id={props.id}
        maxLength={props.maxLength}
        name={props.name}
        onBlur={props.onBlur}
        onChange={props.onChange}
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
}

Input.propTypes = {
  autoFocus: PropTypes.bool,
  className: PropTypes.string,
  cssContainer: PropTypes.string,
  defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  disabled: PropTypes.bool,
  id: PropTypes.string.isRequired,
  inputRef: PropTypes.shape({ current: PropTypes.any }),
  invalid: PropTypes.bool,
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
  value: PropTypes.string,
};

Input.defaultProps = {
  autoFocus: undefined,
  className: undefined,
  cssContainer: styles.container,
  cssLabel: undefined,
  defaultValue: undefined,
  disabled: undefined,
  invalid: false,
  inputRef: undefined,
  maxLength: undefined,
  name: undefined,
  onBlur: undefined,
  onChange: undefined,
  onFocus: undefined,
  onInput: undefined,
  onKeyDown: undefined,
  placeholder: undefined,
  readOnly: undefined,
  required: undefined,
  type: 'text',
  value: undefined,
};
