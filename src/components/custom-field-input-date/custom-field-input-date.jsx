import React from 'react';
import PropTypes from 'prop-types';
import CustomFieldInputText from '../custom-field-input-text/custom-field-input-text.jsx';

export default function CustomFieldInputDate(props) {
  return (<CustomFieldInputText
    disabled={props.disabled}
    label={props.label}
    id={props.id}
    type="date"
    value={props.value}
  />);
}

CustomFieldInputDate.propTypes = {
  disabled: PropTypes.bool,
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.string,
};

CustomFieldInputDate.defaultProps = {
  disabled: false,
  value: '',
};
