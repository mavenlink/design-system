import React, { useEffect, useImperativeHandle, useRef } from 'react';
import PropTypes from 'prop-types';
import FormControl from '../form-control/form-control.jsx';
import useValidation from '../../hooks/use-validation.jsx';
import useMounted from '../../hooks/use-mounted.js';
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
  const ids = {
    input: props.id,
    label: `${props.id}-label`,
    tooltip: `${props.id}-tooltip`,
    validationMessage: `${props.id}-validation-message`,
  };
  const refs = {
    control: useRef(),
    input: useRef(),
  };

  const mounted = useMounted();
  const [validationMessage, validate] = useValidation(props.validationMessage, refs.input);

  useEffect(() => {
    if (!mounted.current) return;

    // The MDS Number is using an uncontrolled `<input>`.
    // In order to set a new provided value prop, we
    // set the internal state of the `<input>`.
    if (props.value === undefined) {
      refs.input.current.value = null;
    } else {
      refs.input.current.value = props.value;
    }
  }, [props.value]);

  function onBlur(event) {
    validate();
    props.onBlur(event);
  }

  useImperativeHandle(ref, () => ({
    ...refs.control.current,
    get dirty() {
      return props.value !== this.value;
    },
    focus() {
      refs.input.current.focus();
    },
    get value() {
      if (refs.input.current.value) {
        return props.step < 1
          ? parseFloat(refs.input.current.value)
          : parseInt(refs.input.current.value, 10);
      }

      return undefined;
    },
    get validity() {
      return refs.input.current.validity;
    },
  }));

  return (
    <FormControl
      error={validationMessage}
      id={ids.input}
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
          aria-describedby={`${ids.tooltip} ${ids.validationMessage}`}
          className={getClassName(props.className, validationMessage)}
          defaultValue={props.value}
          id={ids.input}
          max={apiLimits.max}
          min={apiLimits.min}
          name={props.name}
          onBlur={onBlur}
          onChange={props.onChange}
          placeholder={props.placeholder}
          ref={refs.input}
          readOnly={props.readOnly}
          required={props.required}
          step={props.step}
          type="number"
        />
        {!!validationMessage && (
          <Icon
            className={styles['invalid-icon']}
            icon={cautionSvg}
            id={ids.validationMessage}
            label={validationMessage}
          />
        )}
      </div>
    </FormControl>
  );
});

Number.propTypes = {
  className: PropTypes.string,
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  name: PropTypes.string,
  onBlur: PropTypes.func,
  /**
   * The handler is invoked for every native onchange event.
   * **Beware:** According to the HTML spec, the `event.target.value` is
   * an empty string when the input is invalid.
   */
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  readOnly: PropTypes.bool,
  required: PropTypes.bool,
  step: PropTypes.number,
  tooltip: PropTypes.string,
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
  tooltip: undefined,
  validationMessage: '',
  value: undefined,
};

export default Number;
