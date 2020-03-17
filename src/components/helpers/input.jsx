import React from 'react';
import PropTypes from 'prop-types';

export default function Input(props) {
  const sharedProps = {
    className: props.className,
    disabled: props.disabled,
    id: props.id,
    name: props.name,
    onBlur: props.onBlur,
    onChange: props.onChange,
    onFocus: props.onFocus,
    placeholder: props.placeholder,
    ref: props.inputRef,
    type: props.type,
  };

  if (props.controlled) {
    return (<input
      data-testid="private-input"
      value={props.value}
      {...sharedProps}
    />);
  }

  return (<input
    data-testid="private-input"
    defaultValue={props.value}
    min={props.min}
    max={props.max}
    step={props.step}
    {...sharedProps}
  />);
}

Input.propTypes = {
  className: PropTypes.string,
  controlled: PropTypes.bool,
  disabled: PropTypes.bool,
  id: PropTypes.string.isRequired,
  inputRef: PropTypes.shape({ current: PropTypes.any }),
  max: PropTypes.string,
  min: PropTypes.string,
  name: PropTypes.string.isRequired,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  placeholder: PropTypes.string,
  step: PropTypes.string,
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
  placeholder: undefined,
  step: undefined,
  type: 'text',
  value: '',
};
