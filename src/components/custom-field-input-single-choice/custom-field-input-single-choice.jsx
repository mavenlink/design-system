import React from 'react';
import PropTypes from 'prop-types';
import CustomFieldInputText from '../custom-field-input-text/custom-field-input-text.jsx';

export default function CustomFieldInputSingleChoice(props) {
  return (
    <CustomFieldInputText
      id={props.id}
      label={props.label}
      readOnly={props.readOnly}
      required={props.required}
      value={props.value}
    />
  );
}

CustomFieldInputSingleChoice.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  readOnly: PropTypes.bool,
  required: PropTypes.bool,
  value: PropTypes.string,
};

CustomFieldInputSingleChoice.defaultProps = {
  readOnly: false,
  required: false,
  value: undefined,
};
