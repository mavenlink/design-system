import PropTypes from 'prop-types';
import React from 'react';
import styles from './input.css';
import labelPropType from './label-prop-type';

export default function Input(props) {
  return (
    <input
      aria-labelledby={props['aria-labelledby']}
      className={props.className}
      id={props.id}
      onChange={props.onChange}
      type="text"
      value={props.value}
    />
  );
}

Input.propTypes = {
  'aria-labelledby': labelPropType,
  className: PropTypes.string,
  id: labelPropType,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  value: PropTypes.string,
};

Input.defaultProps = {
  'aria-labelledby': undefined,
  className: styles.input,
  id: undefined,
  onChange: undefined,
  placeholder: undefined,
  value: undefined,
};
