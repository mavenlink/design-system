import PropTypes from 'prop-types';
import React, { forwardRef } from 'react';
import Autocompleter from './autocompleter.jsx';
import useForwardedRef from '../../hooks/use-forwarded-ref.js';

const Choice = forwardRef(function Choice(props, forwardedRef) {
  const ref = useForwardedRef(forwardedRef);

  return (
    <Autocompleter
      apiEndpoint={`/custom_field_choices?for_custom_fields=${props.customFieldID}`}
      displayValueEvaluator={selectValue => (selectValue ? selectValue.label : '')}
      id={props.id}
      labelledBy={props.labelledBy}
      name={props.name}
      onChange={event => props.onChange({ target: { ...event.target, value: ref.current.value } })}
      placeholder={props.placeholder}
      readOnly={props.readOnly}
      ref={ref}
      required={props.required}
      validationMessage={props.validationMessage}
      value={props.value.join(',')}
    />
  );
});

Choice.propTypes = {
  customFieldID: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  labelledBy: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  readOnly: PropTypes.bool,
  required: PropTypes.bool,
  validationMessage: PropTypes.string,
  value: PropTypes.arrayOf(PropTypes.string),
};

Choice.defaultProps = {
  onChange: () => {},
  placeholder: undefined,
  readOnly: false,
  required: false,
  validationMessage: '',
  value: [],
};

export default Choice;
