import React, { useEffect, useImperativeHandle, useLayoutEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import useValidation from '../../hooks/use-validation.jsx';
import useForwardedRef from '../../hooks/use-forwarded-ref.js';
import Icons from './icons.jsx';
import styles from '../number/number.css';

function getClassName(className, validationMessage) {
  if (className) return className;
  return validationMessage ? styles['invalid-input'] : styles.input;
}

const apiLimits = {
  max: 2 ** 31,
  min: -(2 ** 31),
};

const Number = React.forwardRef((props, forwardedRef) => {
  const ref = useForwardedRef(forwardedRef);
  const ids = {
    input: props.id,
    label: `${props.id}-label`,
    tooltip: `${props.id}-tooltip`,
    validationMessage: `${props.id}-validation-message`,
  };
  const refs = {
    input: useRef(),
  };

  const [validationMessage, validate] = useValidation(props.validationMessage, refs.input);

  function onBlur(event) {
    validate();
    props.onBlur(event);
  }

  useLayoutEffect(() => {
    // The MDS Number is using an uncontrolled `<input>`.
    // In order to set a new provided value prop, we
    // set the internal state of the `<input>`.
    if (props.value === undefined) {
      refs.input.current.value = null;
    } else {
      refs.input.current.value = props.value;
    }
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
    <div style={{ height: '100%', position: 'relative' }}>
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
      <Icons
        classNames={undefined}
        validationMessage={validationMessage}
        validationMessageId={ids.validationMessage}
        validationMessageTooltip={props.validationMessageTooltip}
      />
    </div>
  );
});

Number.propTypes = {
  className: PropTypes.string,
  id: PropTypes.string.isRequired,
  name: PropTypes.string,
  onBlur: PropTypes.func,
  /**
   * The handler is invoked for every native onchange event.
   * **Beware:** According to the HTML spec, the `event.target.value` is
   * an empty string when the input is invalid.
   */
  onChange: PropTypes.func,
  onInvalid: PropTypes.func,
  placeholder: PropTypes.string,
  readOnly: PropTypes.bool,
  required: PropTypes.bool,
  step: PropTypes.number,
  validationMessage: PropTypes.string,
  validationMessageTooltip: PropTypes.bool,
  value: PropTypes.number,
};

Number.defaultProps = {
  className: undefined,
  name: undefined,
  onBlur: () => {},
  onChange: () => {},
  onInvalid: () => {},
  placeholder: undefined,
  readOnly: false,
  required: false,
  step: 1,
  tooltip: undefined,
  validationMessage: '',
  validationMessageTooltip: false,
  value: undefined,
};

export default Number;
