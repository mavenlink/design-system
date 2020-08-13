import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import calendarSvg from '../../svgs/icon-calendar-fill.svg';
import Icon from '../icon/icon.jsx';
import { convertToFormat, validDate } from './format/format-date.js';
import styles from '../__internal__/abstract-custom-field/abstract-custom-field.css';
import AbstractCustomField from '../__internal__/abstract-custom-field/abstract-custom-field.jsx';

const isValidInput = (value) => {
  if (value === '' || value === undefined) {
    return true;
  }

  return validDate(value);
};

const isValueValid = (value, error, isInputValid = false) => {
  if (error) {
    return false;
  }

  if (!isInputValid) {
    return false;
  }

  return isValidInput(value);
};

const CustomFieldInputDate = forwardRef(function CustomFieldInputDate(props, ref) {
  const componentRef = useRef(null);
  const inputRef = useRef(null);
  const [isEditing, setIsEditing] = useState(true);
  const [isValid, setIsValid] = useState(isValueValid(props.value, props.error, true));
  const [isFocused] = useState(false);

  useEffect(() => {
    if (!inputRef.current) return;

    const isInputValid = inputRef.current.validity.valid;
    const valid = isValueValid(props.value, props.error, isInputValid);
    setIsValid(valid);

    if (!valid) {
      setIsEditing(true);
    } else {
      setIsEditing(false);
    }
  }, [inputRef.current, props.value, props.error]);

  useEffect(() => {
    if (isEditing && isFocused) {
      inputRef.current.focus();
    }
  }, [isEditing, isFocused]);

  useImperativeHandle(ref, () => ({
    id: props.id,
    get value() {
      return componentRef.current.value;
    },
  }));

  const handleOnChange = (event) => {
    if (inputRef.current) {
      const isInputValid = inputRef.current.validity.valid;
      const newDate = convertToFormat(event.target.value, 'yyyy-mm-dd');
      setIsValid(isValueValid(newDate, props.error, isInputValid));
    }

    props.onChange(event);
  };

  const errorText = () => {
    if (!isValid && !isValidInput(props.value)) {
      return `"${props.value}" is an invalid date`;
    }

    return props.errorText;
  };

  const sharedProps = {
    className: props.className,
    disabled: props.disabled,
    icon: <Icon className={styles['input-icon']} name={calendarSvg.id} title={props.label} stroke="skip" fill="skip" />,
    label: props.label,
    inputRef,
    readOnly: true,
    required: props.required,
  };

  if (isEditing || !isValid) {
    const value = validDate(props.value) ? convertToFormat(props.value, 'yyyy-mm-dd') : props.value;

    return (<AbstractCustomField
      {...sharedProps}
      defaultValue={value}
      errorText={errorText()}
      id={props.id}
      key={`${props.id}-editing`}
      min={convertToFormat(props.min, 'yyyy-mm-dd')}
      max={convertToFormat(props.max, 'yyyy-mm-dd')}
      onChange={handleOnChange}
      step={1}
      type="date"
    />);
  }

  return (<AbstractCustomField
    {...sharedProps}
    defaultValue={convertToFormat(props.value, 'Month dd, yyyy')}
    id={props.id}
    key={`${props.id}-readonly`}
    inputRef={componentRef}
    type="text"
  />);
});

CustomFieldInputDate.propTypes = {
  className: PropTypes.string,
  disabled: PropTypes.bool,
  error: PropTypes.bool,
  errorText: PropTypes.string,
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  min: PropTypes.string,
  max: PropTypes.string,
  onChange: PropTypes.func,
  required: PropTypes.bool,
  value: PropTypes.string,
};

CustomFieldInputDate.defaultProps = {
  className: undefined,
  disabled: false,
  error: false,
  errorText: '',
  min: undefined,
  max: undefined,
  onChange: () => {},
  required: false,
  value: '',
};

export default CustomFieldInputDate;