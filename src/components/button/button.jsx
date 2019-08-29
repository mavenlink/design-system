import PropTypes from 'prop-types';
import React from 'react';
import styles from './button.css';

export default function Button(props) {
  return (
    <button
      className={props.className || styles[props.color]}
      disabled={props.disabled}
      id={props.id}
      onClick={props.onClick}
      type={props.type}
    >
      {props.children}
    </button>
  );
}

Button.propTypes = {
  className: PropTypes.string,
  color: PropTypes.oneOf([
    'primary',
    'secondary',
  ]),
  children: PropTypes.node.isRequired,
  disabled: PropTypes.bool,
  id: PropTypes.string,
  onClick: PropTypes.func,
  type: PropTypes.oneOf([
    'button',
    'reset',
    'submit',
  ]),
};

Button.defaultProps = {
  className: undefined,
  color: 'primary',
  disabled: undefined,
  id: undefined,
  onClick: () => {},
  type: undefined,
};
