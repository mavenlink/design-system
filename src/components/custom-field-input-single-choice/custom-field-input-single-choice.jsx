import React from 'react';
import PropTypes from 'prop-types';

export default function CustomFieldInputSingleChoice(props) {
  return (
    <div>
      <label htmlFor={props.id}>{props.label}</label>
      <input
        id={props.id}
        defaultValue={props.value}
      />
    </div>
  );
}

CustomFieldInputSingleChoice.propTypes = {
  label: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  value: PropTypes.string,
};

CustomFieldInputSingleChoice.defaultProps = {
  value: undefined,
};
