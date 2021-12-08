import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
} from 'react';
import PropTypes from 'prop-types';
import Autocompleter from '../autocompleter/autocompleter.jsx';
import useForwardedRef from '../../hooks/use-forwarded-ref.js';

const CustomFieldInputSingleChoice = forwardRef(function CustomFieldInputSingleChoice(props, forwardedRef) {
  const ref = useForwardedRef(forwardedRef);
  const autocompleterRef = useRef();

  useImperativeHandle(ref, () => ({
    ...autocompleterRef.current,
    get dirty() {
      return this.value.join(',') !== props.value.join(',');
    },
    get value() {
      const choice = autocompleterRef.current.value;
      return choice ? [choice] : [];
    },
  }));

  return (
    <Autocompleter
      apiEndpoint={`/custom_field_choices?for_custom_fields=${props.customFieldID}`}
      className={props.className}
      displayValueEvaluator={selectValue => (selectValue ? selectValue.label : '')}
      id={props.id}
      label={props.label}
      name={props.name}
      onChange={event => props.onChange({ target: { ...event.target, value: ref.current.value } })}
      placeholder={props.placeholder}
      readOnly={props.readOnly}
      ref={autocompleterRef}
      required={props.required}
      tooltip={props.tooltip}
      validationMessage={props.errorText}
      value={props.value.join(',')}
    />
  );
});

CustomFieldInputSingleChoice.propTypes = {
  className: PropTypes.string,
  /** Needs to be the Custom Field ID from the database for self-loading of choices */
  customFieldID: PropTypes.string.isRequired,
  errorText: PropTypes.string,
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  readOnly: PropTypes.bool,
  required: PropTypes.bool,
  tooltip: PropTypes.string,
  value: PropTypes.arrayOf(PropTypes.string),
};

CustomFieldInputSingleChoice.defaultProps = {
  className: undefined,
  errorText: undefined,
  onChange: () => {},
  placeholder: undefined,
  readOnly: false,
  required: false,
  tooltip: undefined,
  value: [],
};

export default CustomFieldInputSingleChoice;
