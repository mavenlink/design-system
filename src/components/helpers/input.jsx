import React from 'react';
import PropTypes from 'prop-types';
import Uncontrolled from './uncontrolled-input/uncontrolled-input.jsx';
import Controlled from './controlled-input/controlled-input.jsx';

export default function Input(props) {
  if (props.controlled) {
    return (<Controlled {...props} />);
  }

  return (<Uncontrolled {...props} />);
}

Input.propTypes = {
  className: PropTypes.string,
  controlled: PropTypes.bool,
  disabled: PropTypes.bool,
  id: PropTypes.string.isRequired,
  inputRef: PropTypes.shape({ current: PropTypes.any }),
  max: PropTypes.string,
  min: PropTypes.string,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  type: PropTypes.oneOf(['date', 'number', 'text']),
  value: PropTypes.string,
};

Input.defaultProps = {
  className: undefined,
  controlled: true,
  disabled: false,
  inputRef: undefined,
  max: undefined,
  min: undefined,
  onBlur: () => {},
  onChange: () => {},
  onFocus: () => {},
  type: 'text',
  value: '',
};
