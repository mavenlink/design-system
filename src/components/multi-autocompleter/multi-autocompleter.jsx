import PropTypes from 'prop-types';
import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import FormControl from '../form-control/form-control.jsx';
import MultiAutocompleterControl from '../control/multi-autocompleter.jsx';
import useForwardedRef from '../../hooks/use-forwarded-ref.js';

function spread(ref1, ref2) {
  const newObject = {};

  Object.keys(ref1.current).reduce((acc, key) => (
    Object.defineProperty(acc, key, {
      get() { return ref1.current[key]; },
      configurable: true,
      enumerable: true,
    })
  ), newObject);

  Object.keys(ref2.current).reduce((acc, key) => (
    Object.defineProperty(acc, key, {
      get() { return ref2.current[key]; },
      configurable: true,
      enumerable: true,
    })
  ), newObject);

  return newObject;
}

const MultiAutocompleter = forwardRef(function MultiAutocompleter(props, forwardedRef) {
  const ref = useForwardedRef(forwardedRef);
  const [validationMessage, setValidationMessage] = useState(props.validationMessage);

  const refs = {
    control: useRef(),
    multiAutocompleter: useRef(),
  };

  function onInvalid(event) {
    setValidationMessage(event.detail.validationMessage);
  }

  useImperativeHandle(ref, () => spread(
    refs.control,
    refs.multiAutocompleter,
  ));

  return (
    <FormControl
      className={props.className}
      id={`${props.id}-autocomplete`}
      label={props.label}
      labelId={`${props.id}-label`}
      name={props.name}
      ref={refs.control}
      required={props.required}
      tooltip={props.tooltip}
      validationMessage={validationMessage}
    >
      <MultiAutocompleterControl
        apiEndpoint={props.apiEndpoint}
        containerRef={refs.control}
        filterOptions={false}
        id={props.id}
        label={props.label}
        name={props.name}
        onChange={props.onChange}
        onInvalid={onInvalid}
        optionIDGetter={props.optionIDGetter}
        optionLabelGetter={props.optionLabelGetter}
        placeholder={props.placeholder}
        readOnly={props.readOnly}
        ref={refs.multiAutocompleter}
        required={props.required}
        searchParam={props.searchParam}
        tooltip={props.tooltip}
        validationMessage={props.validationMessage}
        value={props.value}
      />
    </FormControl>
  );
});

MultiAutocompleter.propTypes = {
  /** `apiEndpoint` should be the route of the api's endpoint (excluding the base api), eg. `/workspaces`. */
  apiEndpoint: PropTypes.string.isRequired,
  className: PropTypes.string,
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  optionIDGetter: PropTypes.func,
  optionLabelGetter: PropTypes.func,
  placeholder: PropTypes.string,
  readOnly: PropTypes.bool,
  required: PropTypes.bool,
  searchParam: PropTypes.string,
  tooltip: PropTypes.string,
  validationMessage: PropTypes.string,
  /** value is an array of objects matching the shape of options */
  value: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.object),
    PropTypes.arrayOf(PropTypes.string),
  ]),
};

MultiAutocompleter.defaultProps = {
  className: undefined,
  onChange: () => {},
  optionIDGetter: (option) => { return option?.id || option; },
  optionLabelGetter: option => option.title || option.name || option.full_name || option.currency || option.label,
  placeholder: undefined,
  readOnly: false,
  required: false,
  searchParam: 'matching',
  tooltip: undefined,
  validationMessage: undefined,
  value: [],
};

export default MultiAutocompleter;
