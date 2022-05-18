import React, { useEffect, useImperativeHandle, useLayoutEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import useValidation from '../../hooks/use-validation.js';
import useForwardedRef from '../../hooks/use-forwarded-ref.js';
import Icons from './icons.jsx';
import styles from './number.css';

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
    id: props.id,
    name: props.name,
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
        max={props.max}
        min={props.min}
        name={props.name}
        onBlur={onBlur}
        onChange={() => { props.onChange({ target: ref.current }); }}
        onFocus={props.onFocus}
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
      />
    </div>
  );
});

Number.propTypes = {
  className: PropTypes.string,
  id: PropTypes.string.isRequired,
  min: PropTypes.number,
  max: PropTypes.number,
  name: PropTypes.string,
  onBlur: PropTypes.func,
  /**
   * The handler is invoked for every native onchange event.
   * **Beware:** According to the HTML spec, the `event.target.value` is
   * an empty string when the input is invalid.
   */
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  onInvalid: PropTypes.func,
  placeholder: PropTypes.string,
  readOnly: PropTypes.bool,
  required: PropTypes.bool,
  step: PropTypes.number,
  validationMessage: PropTypes.string,
  value: PropTypes.number,
};

Number.defaultProps = {
  className: undefined,
  min: apiLimits.min,
  max: apiLimits.max,
  name: undefined,
  onBlur: () => {},
  onChange: () => {},
  onFocus: () => {},
  onInvalid: () => {},
  placeholder: undefined,
  readOnly: false,
  required: false,
  step: 1,
  tooltip: undefined,
  validationMessage: '',
  value: undefined,
};

export default Number;
