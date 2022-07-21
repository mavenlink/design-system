import PropTypes from 'prop-types';
import React, { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import AutocompleteControl from '../control/autocompleter.jsx';
import FormControl from '../form-control/form-control.jsx';

const Autocompleter = forwardRef(function Autocompleter(props, ref) {
  const [validationMessage, setValidationMessage] = useState('');

  const ids = {
    input: props.id,
    label: `${props.id}-label`,
  };
  const refs = {
    control: useRef(),
    input: useRef(),
  };

  useImperativeHandle(ref, () => ({
    ...refs.control.current,
    get dirty() { return refs.input.current.dirty; }, // TODO: Dynamic composition?
    get value() { return refs.input.current.value; }, // Spread operator does not work with getters
  }));

  return (
    <FormControl
      className={props.className}
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
      <AutocompleteControl
        apiEndpoint={props.apiEndpoint}
        displayValueEvaluator={props.displayValueEvaluator}
        id={props.id}
        labelledBy={ids.label}
        models={props.models}
        name={props.name}
        onChange={props.onChange}
        onInvalid={event => setValidationMessage(event.detail.validationMessage)}
        placeholder={props.placeholder}
        readOnly={props.readOnly}
        ref={refs.input}
        required={props.required}
        searchParam={props.searchParam}
        validationMessage={props.validationMessage}
        value={props.value}
        wrapperRef={refs.control}
      >
        { props.children }
      </AutocompleteControl>
    </FormControl>
  );
});

Autocompleter.propTypes = {
  /** `apiEndpoint` should be the route of the api's endpoint (excluding the base api), eg. `/workspaces`. */
  apiEndpoint: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.func,
  /** displayValueEvaluator is handled if the key following: `title`, `name`, `full_name`, `currency`; Otherwise, pass in something like `displayValueEvaluator: (model) -> { model.rate_card_name }` */
  displayValueEvaluator: PropTypes.func,
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
  /** `value` and `models` shape is expected to be an object(s) with an `id` key */
  models: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.required,
  })),
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  readOnly: PropTypes.bool,
  required: PropTypes.bool,
  searchParam: PropTypes.string,
  tooltip: PropTypes.string,
  validationMessage: PropTypes.string,
  /** The `value` prop expects an `id` used to fetch a model on the API. */
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

Autocompleter.defaultProps = {
  apiEndpoint: undefined,
  className: undefined,
  children: () => {},
  displayValueEvaluator: undefined,
  label: undefined,
  models: [],
  onChange: () => {},
  placeholder: undefined,
  readOnly: false,
  required: false,
  searchParam: 'matching',
  tooltip: undefined,
  validationMessage: undefined,
  value: undefined,
};

export default Autocompleter;
