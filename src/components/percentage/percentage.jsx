import PropTypes from 'prop-types';
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
} from 'react';
import FormControl from '../form-control/form-control.jsx';
import FormControlIcons from '../form-control-icons/form-control-icons.jsx';
import styles from './percentage.css';
import useMounted from '../../hooks/use-mounted.js';
import useValidation from '../../hooks/use-validation.jsx';

function getClassName(className, validationMessage) {
  if (className) return className;
  return validationMessage ? styles['invalid-input'] : styles.input;
}

const Percentage = forwardRef(function Percentage(props, forwardedRef) {
  const fallbackRef = useRef();
  const ref = forwardedRef || fallbackRef;
  const inputRef = useRef();
  const mounted = useMounted();
  const [validationMessage, validate] = useValidation(props.validationMessage, inputRef);

  function onBlur(event) {
    validate();
    props.onBlur(event);
  }

  function onChange(event) {
    validate();
    props.onChange(event);
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
      const providedValue = props.value || NaN;
      return !Object.is(providedValue, this.value);
    },
    id: props.id,
    name: props.name,
    get value() {
      return parseFloat(inputRef.current.value);
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
    >
      <input
        aria-describedby={`${props.id}Hint`}
        autoFocus={props.autoFocus} // eslint-disable-line jsx-a11y/no-autofocus
        className={getClassName(props.className, validationMessage)}
        defaultValue={props.value}
        id={props.id}
        max={100}
        min={0}
        step={0.01}
        name={props.name}
        onBlur={onBlur}
        onChange={onChange}
        onFocus={props.onFocus}
        onInput={props.onInput}
        onKeyDown={props.onKeyDown}
        placeholder={props.placeholder}
        readOnly={props.readOnly}
        ref={inputRef}
        required={props.required}
        type="number"
      />
      <FormControlIcons validationMessage={validationMessage} className={styles['icons-container']}>
        <span className={styles['percent-sign']}>%</span>
      </FormControlIcons>
    </FormControl>
  );
});

Percentage.propTypes = {
  autoFocus: PropTypes.bool,
  className: PropTypes.string,
  cssContainer: PropTypes.string,
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  name: PropTypes.string,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  onInput: PropTypes.func,
  onKeyDown: PropTypes.func,
  placeholder: PropTypes.string,
  readOnly: PropTypes.bool,
  required: PropTypes.bool,
  validationMessage: PropTypes.string,
  value: (props, propName, componentName) => {
    const propValue = props[propName];

    if (propValue === undefined) {
      return undefined;
    }

    if (typeof propValue !== 'number') {
      return new Error(`Invalid prop "value" supplied to ${componentName}: must be a number.`);
    }

    if (propValue > 100 || propValue < 0) {
      return new Error(`Invalid prop "value" supplied to ${componentName}: ` +
      `must be less than 100 and greater than 0 (was ${propValue}).`);
    }

    return undefined;
  },
};

Percentage.defaultProps = {
  autoFocus: undefined,
  className: undefined,
  cssContainer: styles.container,
  cssLabel: undefined,
  name: undefined,
  onBlur: () => {},
  onChange: () => {},
  onFocus: undefined,
  onInput: undefined,
  onKeyDown: undefined,
  placeholder: undefined,
  readOnly: undefined,
  required: undefined,
  validationMessage: '',
  value: undefined,
};

export default Percentage;
