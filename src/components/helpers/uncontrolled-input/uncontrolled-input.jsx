import React from 'react';
import PropTypes from 'prop-types';

export default function UncontrolledInput(props) {
  return (<input
    className={props.className}
    data-testid="controlled input"
    defaultValue={props.value}
    disabled={props.disabled}
    id={props.id}
    onBlur={props.onBlur}
    onChange={props.onChange}
    onFocus={props.onFocus}
    ref={props.inputRef}
    type={props.type}
  />);
}

UncontrolledInput.propTypes = {
  className: PropTypes.string,
  disabled: PropTypes.bool,
  id: PropTypes.string.isRequired,
  inputRef: PropTypes.shape({ current: PropTypes.any }),
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  type: PropTypes.oneOf(['date', 'number', 'text']),
  value: PropTypes.string,
};

UncontrolledInput.defaultProps = {
  className: undefined,
  disabled: false,
  inputRef: undefined,
  onBlur: () => {},
  onChange: () => {},
  onFocus: () => {},
  type: 'text',
  value: '',
};
