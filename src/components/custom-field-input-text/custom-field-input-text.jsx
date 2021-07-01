import PropTypes from 'prop-types';
import React, {
  forwardRef,
} from 'react';
import Input from '../input/input.jsx';

const CustomFieldInputText = forwardRef(function CustomFieldInputText(props, ref) {
  return (
    <Input
      className={props.className}
      id={props.id}
      label={props.label}
      maxLength={props.maxLength}
      name={props.name}
      onChange={props.onChange}
      onFocus={props.onFocus}
      placeholder={props.placeholder}
      readOnly={props.readOnly}
      ref={ref}
      required={props.required}
      tooltip={props.tooltip}
      type="text"
      validationMessage={props.errorText}
      value={props.value}
    />
  );
});

CustomFieldInputText.propTypes = {
  className: PropTypes.string,
  errorText: PropTypes.string,
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  maxLength: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
  name: PropTypes.string,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  placeholder: PropTypes.string,
  readOnly: PropTypes.bool,
  required: PropTypes.bool,
  tooltip: PropTypes.string,
  value: PropTypes.string,
};

CustomFieldInputText.defaultProps = {
  className: undefined,
  errorText: '',
  maxLength: undefined,
  name: undefined,
  onChange: () => {},
  onFocus: () => {},
  placeholder: undefined,
  readOnly: false,
  required: false,
  tooltip: undefined,
  value: undefined,
};

export default CustomFieldInputText;
