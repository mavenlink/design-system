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
import Icons from '../control/icons.jsx';
import styles from './checkbox.css';

const Checkbox = forwardRef(function Checkbox(props, forwardedRef) {
  const fallbackRef = useRef();
  const ref = forwardedRef || fallbackRef;
  const [validationMessage, setValidationMessage] = useState(props.validationMessage);

  // TODO: Automate with object proxy. Always props.id + key.
  const ids = {
    input: props.id,
    label: `${props.id}-label`,
    tooltip: `${props.id}-tooltip`,
    validation: `${props.id}Hint`,
  };
  const refs = {
    control: useRef(),
    input: useRef(),
  };

  useLayoutEffect(() => {
    refs.input.current.checked = props.checked;
  }, [props.checked]);

  useEffect(() => {
    setValidationMessage(props.validationMessage);
  }, [props.validationMessage]);

  useLayoutEffect(() => {
    refs.input.current.setCustomValidity(validationMessage);
  }, [validationMessage]);

  useImperativeHandle(ref, () => ({
    ...refs.control.current,
    get value() {
      if (props.value) return props.value;

      return refs.input.current.checked ? 'on' : 'off';
    },
    get checked() {
      return refs.input.current.checked;
    },
    get dirty() {
      const providedValue = props.checked || false;
      return providedValue !== this.checked;
    },
  }));

  function onBlur(event) {
    refs.input.current.setCustomValidity('');
    setValidationMessage(refs.input.current.validationMessage);
    props.onBlur(event);
  }

  function onClick(event) {
    if (props.readOnly) event.preventDefault();
  }

  function onKeyDown(event) {
    if (props.readOnly && event.key === ' ') event.preventDefault();
  }

  return (
    <FormControl
      className={props.cssContainer}
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
          aria-describedby={`${ids.tooltip} ${ids.validation}`}
          className={props.className}
          defaultChecked={props.checked}
          id={props.id}
          name={props.name}
          onBlur={onBlur}
          onChange={props.onChange}
          onClick={onClick}
          onFocus={props.onFocus}
          onKeyDown={onKeyDown}
          readOnly={props.readOnly}
          ref={refs.input}
          required={props.required}
          type="checkbox"
        />
        <Icons
          validationMessage={validationMessage}
          validationMessageId={ids.validation}
        />
      </div>
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
  tooltip: PropTypes.string,
  validationMessage: PropTypes.string,
  value: PropTypes.string,
};

Checkbox.defaultProps = {
  checked: undefined,
  className: styles.input,
  cssContainer: undefined,
  name: undefined,
  onBlur: () => {},
  onChange: () => {},
  onFocus: () => {},
  readOnly: undefined,
  required: undefined,
  tooltip: undefined,
  validationMessage: '',
  value: undefined,
};

export default Checkbox;
