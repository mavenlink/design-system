import React from 'react';
import PropTypes from 'prop-types';
import CustomFieldInputText from '../custom-field-input-text/custom-field-input-text.jsx';

export default function CustomFieldInputDate(props) {
  return (<CustomFieldInputText
    label={props.label}
    type="date"
    id={props.id}
    value={props.value}
  />);
}

CustomFieldInputDate.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.string,
};

CustomFieldInputDate.defaultProps = {
  value: '',
};
