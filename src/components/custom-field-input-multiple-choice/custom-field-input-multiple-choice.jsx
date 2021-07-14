import React, {
  useImperativeHandle,
  useRef,
  forwardRef,
} from 'react';
import PropTypes from 'prop-types';
import MultiAutocompleter from '../multi-autocompleter/multi-autocompleter.jsx';

const CustomFieldInputMultipleChoice = forwardRef(function CustomFieldInputMultipleChoice(props, ref) {
  const multiAutocompleterRef = useRef();

  useImperativeHandle(ref, () => ({
    id: multiAutocompleterRef.current.id,
    name: multiAutocompleterRef.current.name,
    get dirty() {
      return multiAutocompleterRef.current.dirty;
    },
    get value() {
      return multiAutocompleterRef.current.value.map(value => value.id);
    },
  }));

  return (
    <MultiAutocompleter
      apiEndpoint="/custom_field_choices"
      className={props.className}
      extraParams={`for_custom_fields=${props.customFieldID}`}
      id={props.id}
      label={props.label}
      name={props.name}
      optionIDGetter={option => option.id}
      onChange={props.onChange}
      placeholder={props.placeholder}
      readOnly={props.readOnly}
      ref={multiAutocompleterRef}
      required={props.required}
      tooltip={props.tooltip}
      validationMessage={props.validationMessage}
      value={props.value}
    />
  );
});

CustomFieldInputMultipleChoice.propTypes = {
  className: PropTypes.string,
  customFieldID: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  readOnly: PropTypes.bool,
  required: PropTypes.bool,
  tooltip: PropTypes.string,
  validationMessage: PropTypes.string,
  value: PropTypes.arrayOf(PropTypes.object),
};

CustomFieldInputMultipleChoice.defaultProps = {
  className: undefined,
  onChange: () => {},
  placeholder: undefined,
  readOnly: false,
  required: false,
  tooltip: undefined,
  validationMessage: undefined,
  value: [],
};

export default CustomFieldInputMultipleChoice;
