import React, { useImperativeHandle, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import FormControl from '../form-control/form-control.jsx';
import NumberControl from '../control/number.jsx';

// Create new object based of two other objects.
// Ensures getter functions are not evaluated until runtime.
function spread(obj1, obj2) {
  const newObject = {};

  Object.keys(obj1).reduce((acc, key) => (
    Object.defineProperty(acc, key, {
      get() { return obj1[key]; },
      configurable: true,
      enumerable: true,
    })
  ), newObject);

  Object.keys(obj2).reduce((acc, key) => (
    Object.defineProperty(acc, key, {
      get() { return obj2[key]; },
      configurable: true,
      enumerable: true,
    })
  ), newObject);

  return newObject;
}

const Number = React.forwardRef((props, ref) => {
  const ids = {
    label: `${props.id}-label`,
  };
  const refs = {
    control: useRef(),
    input: useRef(),
  };

  const [validationMessage, setValidationMessage] = useState('');

  function onInvalid(event) {
    setValidationMessage(event.detail.validationMessage);
  }

  useImperativeHandle(ref, () => spread(
    refs.control.current,
    refs.input.current,
  ));

  return (
    <FormControl
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
      <NumberControl
        className={props.className}
        id={props.id}
        name={props.name}
        onBlur={props.onBlur}
        onChange={props.onChange}
        onInvalid={onInvalid}
        placeholder={props.placeholder}
        readOnly={props.readOnly}
        ref={refs.input}
        required={props.required}
        step={props.step}
        validationMessage={props.validationMessage}
        value={props.value}
      />
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
