import PropTypes from 'prop-types';
import React from 'react';
import styles from './button.css';

export default function Button(props) {
  const {
    children,
    className,
    color,
    disabled,
    name,
    onClick,
    type,
    value,
  } = props;

  return (
    <button
      className={className || styles[color]}
      disabled={disabled}
      name={name}
      onClick={onClick}
      type={type}
      value={value}
    >
      {children}
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
  name: PropTypes.string,
  onClick: PropTypes.func,
  type: PropTypes.oneOf([
    'button',
    'reset',
    'submit',
  ]),
  value: PropTypes.string,
};

Button.defaultProps = {
  className: undefined,
  color: 'primary',
  disabled: undefined,
  name: undefined,
  onClick: () => {},
  type: undefined,
  value: undefined,
};
