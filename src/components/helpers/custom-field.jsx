import React from 'react';
import PropTypes from 'prop-types';

export default function CustomField(props) {
  return (<div>
    <div>
      <label htmlFor={props.id}>{props.label}</label>
    </div>
    <div>
      <input id={props.id} />
    </div>
  </div>);
}

CustomField.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

CustomField.defaultProps = {};
