import React from 'react';
import PropTypes from 'prop-types';
import Input from './input.jsx';

export default function CustomField(props) {
  return (<div>
    <div>
      <label htmlFor={props.id}>{props.label}</label>
      {props.required && <span>(Required)</span>}
    </div>
    <div>
      <Input
        id={props.id}
        inputRef={props.inputRef}
        required={props.required}
      />
    </div>
  </div>);
}

CustomField.propTypes = {
  id: PropTypes.string.isRequired,
  inputRef: PropTypes.shape({ current: PropTypes.any }),
  label: PropTypes.string.isRequired,
  required: PropTypes.bool,
};

CustomField.defaultProps = {
  inputRef: undefined,
  required: false,
};
