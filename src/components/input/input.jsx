import PropTypes from 'prop-types';
import React from 'react';
import styles from './input.css';

export default function Input(props) {
  return (
    <React.Fragment>
      <label for={props.id}>
        {props.label}
        {props.required && <span>(Required)</span>}
      </label>
      <input
        className={props.className}
        id={props.id}
        onChange={props.onChange}
        placeholder={props.placeholder}
        required={props.required}
        type="text"
        value={props.value}
      />
    </React.Fragment>
  );
}

Input.propTypes = {
  className: PropTypes.string,
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  value: PropTypes.string,
};

Input.defaultProps = {
  className: styles.input,
  onChange: undefined,
  placeholder: undefined,
  required: undefined,
  value: undefined,
};
