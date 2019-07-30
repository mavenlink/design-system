import PropTypes from 'prop-types';
import React from 'react';
import styles from './input.css';

export default function Input(props) {
  return (
    <React.Fragment>
      <label for={props.id}>{props.label}</label>
      <input
        className={props.className}
        id={props.id}
        onChange={props.onChange}
        placeholder={props.placeholder}
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
  value: PropTypes.string,
};

Input.defaultProps = {
  className: styles.input,
  onChange: undefined,
  placeholder: undefined,
  value: undefined,
};
