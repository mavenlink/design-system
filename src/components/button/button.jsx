import PropTypes from 'prop-types';
import React from 'react';
import styles from './button.css';

export default function Button(props) {
  const {
    children,
    className,
    color,
    disabled,
    type,
  } = props;

  return (
    <button
      className={className || styles[color]}
      disabled={disabled}
      type={type}
    >
      {children}
    </button>
  );
}

Button.propTypes = {
  className: PropTypes.string,
  color: PropTypes.oneOf([
    'blank',
    'primary',
    'secondary',
  ]),
  children: PropTypes.node.isRequired,
  disabled: PropTypes.bool,
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
  type: undefined,
};
