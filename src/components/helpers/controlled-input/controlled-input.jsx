import React, { useState } from 'react';
import PropTypes from 'prop-types';

export default function ControlledInput(props) {
  const [value, setValue] = useState(props.value);

  const handleOnChange = (event) => {
    const newValue = event.target.value;
    setValue(newValue);

    props.onChange(event);
  };

  return (<input
    className={props.className}
    data-testid="controlled input"
    disabled={props.disabled}
    id={props.id}
    onBlur={props.onBlur}
    onChange={handleOnChange}
    onFocus={props.onFocus}
    ref={props.inputRef}
    type={props.type}
    value={value}
  />);
}

ControlledInput.propTypes = {
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

ControlledInput.defaultProps = {
  className: undefined,
  disabled: false,
  inputRef: undefined,
  onBlur: () => {},
  onChange: () => {},
  onFocus: () => {},
  type: 'text',
  value: '',
};
