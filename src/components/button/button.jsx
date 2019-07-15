import PropTypes from 'prop-types';
import React from 'react';
import styles from './button.css';

export default function Button(props) {
  const {
    children,
    className,
    color,
    type,
    ...buttonElemProps
  } = props;

  return (
    <button
      {...buttonElemProps}
      className={className || styles[color]}
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
  type: PropTypes.oneOf([
    'button',
    'reset',
    'submit',
  ]),
};

Button.defaultProps = {
  className: undefined,
  color: 'primary',
  type: undefined,
};
