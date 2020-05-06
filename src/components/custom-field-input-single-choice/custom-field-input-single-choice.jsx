import React from 'react';
import PropTypes from 'prop-types';

export default function CustomFieldInputSingleChoice(props) {
  return (
    <div>
      <label htmlFor={props.id}>{props.label}</label>
      <input
        id={props.id}
        defaultValue={props.value}
        required={props.required}
      />
    </div>
  );
}

CustomFieldInputSingleChoice.propTypes = {
  label: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  required: PropTypes.bool,
  value: PropTypes.string,
};

CustomFieldInputSingleChoice.defaultProps = {
  required: false,
  value: undefined,
};
