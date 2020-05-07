import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import calendarSvg from '../../svgs/icon-calendar-fill.svg';
import Icon from '../icon/icon.jsx';
import CustomFieldInputText from '../custom-field-input-text/custom-field-input-text.jsx';
import { convertToFormat, validDate } from './format/format-date.js';
import styles from '../custom-field-input-text/custom-field-input-text.css';

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

export default function CustomFieldInputDate(props) {
  const inputRef = useRef(null);
  const [isEditing, setIsEditing] = useState(true);
  const [isValid, setIsValid] = useState(isValueValid(props.value, props.error, true));
  const [isFocused] = useState(false);

  useEffect(() => {
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

  const handleOnChange = (event) => {
    if (inputRef.current) {
      const isInputValid = inputRef.current.validity.valid;
      const newDate = convertToFormat(event.target.value, 'yyyy-mm-dd');
      setIsValid(isValueValid(newDate, props.error, isInputValid));
    }

    props.onChange(event);
  };

  const helpText = () => {
    if (!isValid && !isValidInput(props.value)) {
      return `"${props.value}" is an invalid date`;
    }

    return props.helpText;
  };

  const sharedProps = {
    className: props.className,
    disabled: props.disabled,
    icon: <Icon className={styles['input-icon']} name={calendarSvg.id} title={props.label} stroke="gray" fill="gray" />,
    label: props.label,
    inputRef,
    readOnly: true,
    required: props.required,
  };

  if (isEditing || !isValid) {
    const value = validDate(props.value) ? convertToFormat(props.value, 'yyyy-mm-dd') : props.value;

    return (<CustomFieldInputText
      {...sharedProps}
      error={!isValid}
      helpText={helpText()}
      id={props.id}
      key={`${props.id}-editing`}
      min={convertToFormat(props.min, 'yyyy-mm-dd')}
      max={convertToFormat(props.max, 'yyyy-mm-dd')}
      onChange={handleOnChange}
      step={1}
      type="date"
      value={value}
    />);
  }

  return (<CustomFieldInputText
    {...sharedProps}
    id={props.id}
    key={`${props.id}-readonly`}
    type="text"
    value={convertToFormat(props.value, 'Month dd, yyyy')}
  />);
}

CustomFieldInputDate.propTypes = {
  className: PropTypes.string,
  disabled: PropTypes.bool,
  error: PropTypes.bool,
  helpText: PropTypes.string,
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
  helpText: '',
  min: undefined,
  max: undefined,
  onChange: () => {},
  required: false,
  value: '',
};
