import PropTypes from 'prop-types';
import React, {
  forwardRef,
  useImperativeHandle,
  useLayoutEffect,
  useRef,
} from 'react';
import FormControl from '../form-control/form-control.jsx';
import Icons from '../control/icons.jsx';
import styles from './percentage.css';
import useValidation from '../../hooks/use-validation.js';

function getClassName(className, validationMessage) {
  if (className) return className;
  return validationMessage ? styles['invalid-input'] : styles.input;
}

const Percentage = forwardRef(function Percentage(props, forwardedRef) {
  const fallbackRef = useRef();
  const ref = forwardedRef || fallbackRef;

  const classNames = {
    container: props.cssContainer,
    input: props.className,
  };
  const ids = {
    label: `${props.id}-label`,
    validationMessage: `${props.id}Hint`,
    tooltip: `${props.id}-tooltip`,
  };
  const refs = {
    control: useRef(),
    input: useRef(),
  };

  const [validationMessage, validate] = useValidation(props.validationMessage, refs.input);

  function onBlur() {
    validate();
  }

  function onChange(event) {
    props.onChange(event);
  }

  useLayoutEffect(() => {
    refs.input.current.value = props.value || '';
  }, [props.value]);

  useImperativeHandle(ref, () => ({
    ...refs.control.current,
    get dirty() {
      const providedValue = props.value || undefined;
      return !Object.is(providedValue, this.value);
    },
    get value() {
      return window.parseFloat(refs.input.current.value) || undefined;
    },
  }));

  return (
    <FormControl
      className={classNames.container}
      error={validationMessage}
      id={props.id}
      label={props.label}
      labelId={ids.label}
      name={props.name}
      readOnly={props.readOnly}
      ref={refs.control}
      required={props.required}
      tooltip={props.tooltip}
      validationMessage={validationMessage}
    >
      <div style={{ position: 'relative' }}>
        <input
          aria-describedby={`${ids.validationMessage} ${ids.tooltip}`}
          className={getClassName(classNames.input, validationMessage)}
          defaultValue={props.value}
          id={props.id}
          max={100}
          min={0}
          name={props.name}
          onBlur={onBlur}
          onChange={onChange}
          placeholder={props.placeholder}
          readOnly={props.readOnly}
          ref={refs.input}
          required={props.required}
          step={0.01}
          type="number"
        />
        <Icons
          validationMessage={validationMessage}
          validationMessageId={ids.validationMessage}
        >
          <span className={styles['percent-sign']}>%</span>
        </Icons>
      </div>
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
  tooltip: PropTypes.string,
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
  tooltip: undefined,
  validationMessage: '',
  value: undefined,
};

export default Percentage;
