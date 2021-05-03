import PropTypes from 'prop-types';
import React, {
  forwardRef,
  useImperativeHandle,
  useLayoutEffect,
  useRef,
} from 'react';
import FormControl from '../form-control/form-control.jsx';
import FormControlIcons from '../form-control-icons/form-control-icons.jsx';
import styles from './percentage.css';
import useValidation from '../../hooks/use-validation.jsx';

function getClassName(className, validationMessage) {
  if (className) return className;
  return validationMessage ? styles['invalid-input'] : styles.input;
}

const Percentage = forwardRef(function Percentage(props, forwardedRef) {
  const fallbackRef = useRef();
  const ref = forwardedRef || fallbackRef;
  const inputRef = useRef();
  const [validationMessage, validate] = useValidation(props.validationMessage, inputRef);
  const classNames = {
    container: props.cssContainer,
    input: props.className,
  };
  const ids = {
    validationMessage: `${props.id}Hint`,
  };

  function onBlur() {
    validate();
  }

  function onChange(event) {
    props.onChange(event);
  }

  useLayoutEffect(() => {
    inputRef.current.value = props.value || '';
  }, [props.value]);

  useImperativeHandle(ref, () => ({
    get dirty() {
      const providedValue = props.value || undefined;
      return !Object.is(providedValue, this.value);
    },
    id: props.id,
    name: props.name,
    get value() {
      return window.parseFloat(inputRef.current.value) || undefined;
    },
  }));

  return (
    <FormControl
      className={classNames.container}
      error={validationMessage}
      id={props.id}
      label={props.label}
      readOnly={props.readOnly}
      required={props.required}
    >
      <input
        aria-describedby={ids.validationMessage}
        className={getClassName(classNames.input, validationMessage)}
        defaultValue={props.value}
        id={props.id}
        max={100}
        min={0}
        step={0.01}
        name={props.name}
        onBlur={onBlur}
        onChange={onChange}
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
  className: PropTypes.string,
  cssContainer: PropTypes.string,
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  name: PropTypes.string,
  onChange: PropTypes.func,
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
  className: undefined,
  cssContainer: styles.container,
  name: undefined,
  onChange: () => {},
  onFocus: undefined,
  placeholder: undefined,
  readOnly: undefined,
  required: undefined,
  validationMessage: '',
  value: undefined,
};

export default Percentage;
