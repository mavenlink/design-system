import React from 'react';
import PropTypes from 'prop-types';

export default function CustomFieldInputSingleChoice(props) {
  return (
    <div>
      <div>
        <label htmlFor="selectmeplease">{props.label}</label>
        <select id="selectmeplease" name="selectmeplease" />
      </div>
    </div>
  );
}

CustomFieldInputSingleChoice.propTypes = {
  label: PropTypes.string,
};

CustomFieldInputSingleChoice.defaultProps = {
  label: '',
};
