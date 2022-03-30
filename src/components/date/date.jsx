import PropTypes from 'prop-types';
import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import DateControl from '../control/date.jsx';
import FormControl from '../form-control/form-control.jsx';
import combineRefs from '../../utils/combine-refs.js';
import styles from './date.css';
import useForwardedRef from '../../hooks/use-forwarded-ref.js';

const Date = forwardRef(function Date(props, forwardedRef) {
  const ref = useForwardedRef(forwardedRef);
  const [validationMessage, setValidationMessage] = useState(props.validationMessage);

  function onInvalid(event) {
    setValidationMessage(event.detail.validationMessage);
  }

  const classNames = {
    container: undefined,
    input: styles.input,
    invalidInput: styles['invalid-input'],
    ...props.classNames,
  };
  const ids = {
    input: props.id,
    label: `${props.id}-label`,
    tooltip: `${props.id}-tooltip`,
    validationMessage: `${props.id}Hint`,
  };
  const refs = {
    container: useRef(),
    control: useRef(),
    input: useRef(),
  };

  useImperativeHandle(ref, () => combineRefs(
    refs.control,
    refs.input,
  ));

  return (
    <FormControl
      className={classNames.container}
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
      <DateControl
        classNames={{
          input: classNames.input,
          invalidInput: classNames.invalidInput,
        }}
        id={props.id}
        labelledBy={ids.label}
        max={props.max}
        min={props.min}
        name={props.name}
        onChange={props.onChange}
        onInvalid={onInvalid}
        placeholder={props.placeholder}
        readOnly={props.readOnly}
        required={props.required}
        ref={refs.input}
        validationMessage={props.validationMessage}
        value={props.value}
      />
    </FormControl>
  );
});

Date.propTypes = {
  classNames: PropTypes.shape({
    input: PropTypes.string,
    layout: PropTypes.shape({
      container: PropTypes.string,
      calendar: PropTypes.string,
    }),
  }),
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  /** The latest date to accept in full-date format (i.e. yyyy-mm-dd) */
  max: PropTypes.string,
  /** The earliest date to accept in full-date format (i.e. yyyy-mm-dd) */
  min: PropTypes.string,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  readOnly: PropTypes.bool,
  required: PropTypes.bool,
  tooltip: PropTypes.string,
  validationMessage: PropTypes.string,
  /** A date in full-date format (i.e. yyyy-mm-dd) */
  value: PropTypes.string,
};

Date.defaultProps = {
  classNames: {},
  max: undefined,
  min: undefined,
  onChange: undefined,
  placeholder: undefined,
  readOnly: false,
  required: false,
  tooltip: undefined,
  validationMessage: '',
  value: undefined,
};

export default Date;
