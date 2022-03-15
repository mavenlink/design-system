import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import PropTypes from 'prop-types';
import FormControl from '../form-control/form-control.jsx';
import SelectControl from '../control/select.jsx';
import useForwardedRef from '../../hooks/use-forwarded-ref.js';
import styles from './select.css';

const Select = forwardRef(function Select(props, forwardedRef) {
  const ref = useForwardedRef(forwardedRef);
  const [validationMessage, setValidationMessage] = useState('');

  const classNames = {
    container: props.className,
  };
  const ids = {
    input: props.id,
    label: `${props.id}-label`,
  };
  const refs = {
    container: useRef(),
    control: useRef(),
    input: useRef(),
  };

  useImperativeHandle(ref, () => ({
    ...refs.control.current,
    get dirty() { return refs.input.current.dirty; }, // TODO: Dynamic composition?
    get value() { return refs.input.current.value; }, // Spread operator does not work with getters
  }));

  return (
    <div ref={refs.container} className={classNames.container}>
      <FormControl
        id={ids.input}
        labelId={ids.label}
        label={props.label}
        name={props.name}
        readOnly={props.readOnly}
        ref={refs.control}
        required={props.required}
        tooltip={props.tooltip}
        validationMessage={validationMessage}
      >
        <SelectControl
          displayValueEvaluator={props.displayValueEvaluator}
          id={props.id}
          labelledBy={ids.label}
          listOptionRefs={props.listOptionRefs}
          name={props.name}
          onChange={props.onChange}
          onInput={props.onInput}
          onInvalid={event => setValidationMessage(event.detail.validationMessage)}
          placeholder={props.placeholder}
          readOnly={props.readOnly}
          ref={refs.input}
          required={props.required}
          validationMessage={props.errorText}
          value={props.value}
          wrapperRef={refs.container}
        >
          {props.children}
        </SelectControl>
      </FormControl>
    </div>
  );
});

const ListOptionRefType = PropTypes.shape({
  current: PropTypes.shape({
    contains: PropTypes.func,
    setActive: PropTypes.func,
    value: PropTypes.any,
  }),
});

Select.propTypes = {
  children: PropTypes.func,
  className: PropTypes.string,
  /** Function is passed `value`, default returns value without modification, should always return a `string`. You *should* set this if your `value` is not of type `string`. Pass in `false` to prevent filtering. */
  displayValueEvaluator: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.bool,
  ]),
  errorText: PropTypes.string,
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  listOptionRefs: PropTypes.arrayOf(ListOptionRefType).isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  onInput: PropTypes.func,
  placeholder: PropTypes.string,
  readOnly: PropTypes.bool,
  required: PropTypes.bool,
  tooltip: PropTypes.string,
  value: PropTypes.any, // eslint-disable-line react/forbid-prop-types
};

Select.defaultProps = {
  children: () => {},
  className: styles.container,
  displayValueEvaluator: value => value,
  errorText: '',
  onChange: () => {},
  onInput: () => {},
  placeholder: undefined,
  readOnly: false,
  required: false,
  tooltip: undefined,
  value: undefined,
};

export default Select;
