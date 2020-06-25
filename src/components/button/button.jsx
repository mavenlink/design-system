import PropTypes from 'prop-types';
import React from 'react';
import styles from './button.css';

const Button = React.forwardRef(
  function Button(props, ref) {
    return (
      <button
        className={props.className || styles[props.color]}
        disabled={props.disabled}
        id={props.id}
        name={props.name}
        onClick={props.onClick}
        type={props.type}
        value={props.value}
        ref={ref}
      >
        {props.children}
      </button>
    );
  });

Button.propTypes = {
  className: PropTypes.string,
  color: PropTypes.oneOf([
    'primary',
    'secondary',
  ]),
  children: PropTypes.node.isRequired,
  disabled: PropTypes.bool,
  id: PropTypes.string,
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
  id: undefined,
  name: undefined,
  onClick: () => {},
  type: undefined,
  value: undefined,
};

export default Button;
