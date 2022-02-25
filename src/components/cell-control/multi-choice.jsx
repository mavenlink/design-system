import React, {
  forwardRef,
} from 'react';
import PropTypes from 'prop-types';
import MultiAutocompleter from './multi-autocompleter.jsx';

const MultiChoice = forwardRef(function MultiChoice(props, ref) {
  return (
    <MultiAutocompleter
      apiEndpoint={`/custom_field_choices?active=true&for_custom_fields=${props.customFieldID}`}
      classNames={props.classNames}
      id={props.id}
      labelledBy={props.labelledBy}
      optionIDGetter={option => option.id}
      onChange={props.onChange}
      placeholder={props.placeholder}
      readOnly={props.readOnly}
      ref={ref}
      required={props.required}
      validationMessage={props.validationMessage}
      value={props.value.map(id => ({ id }))}
    />
  );
});

MultiChoice.propTypes = {
  classNames: PropTypes.shape({}),
  customFieldID: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  labelledBy: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  readOnly: PropTypes.bool,
  required: PropTypes.bool,
  validationMessage: PropTypes.string,
  value: PropTypes.arrayOf(PropTypes.string),
};

MultiChoice.defaultProps = {
  classNames: {},
  onChange: () => {},
  placeholder: undefined,
  readOnly: false,
  required: false,
  validationMessage: '',
  value: [],
};

export default MultiChoice;
