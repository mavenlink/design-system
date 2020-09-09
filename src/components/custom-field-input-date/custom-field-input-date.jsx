import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import calendarSvg from '../../svgs/calendar.svg';
import IconButton from '../icon-button/icon-button.jsx';
import { convertToFormat, validDate } from './format/format-date.js';
import dateStyles from './custom-field-date.css';
import AbstractCustomField from '../__internal__/abstract-custom-field/abstract-custom-field.jsx';
import useDropdownClose from '../../hooks/use-dropdown-close.js';
import Calendar from '../calendar/calendar.jsx';

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
  const [isEditing, setIsEditing] = useState(false);
  const value = validDate(props.value) ? convertToFormat(props.value, 'yyyy-mm-dd') : props.value;
  const [currentValue, setCurrentValue] = useState(value);
  const [isValid, setIsValid] = useState(isValueValid(currentValue, props.error, true));
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  function onDateSelected(date) {
    setCurrentValue(date.toISOString().slice(0, 10));
    setExpanded(false);
    setIsEditing(false);
  }

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

    setCurrentValue(event.target.value);
    props.onChange(event);
  };

  const errorText = () => {
    if (!isValid && !isValidInput(props.value)) {
      return `"${props.value}" is an invalid date`;
    }

    return props.errorText;
  };

  const wrapperRef = useRef(null);
  const handleDropdownClose = () => {
    setExpanded(false);
    setIsEditing(false);
  };
  useDropdownClose(wrapperRef, expanded, handleDropdownClose);

  const openCalendar = () => {
    setExpanded(!expanded);
  };

  function onInputClick(event) {
    event.preventDefault();
    setExpanded(true);
    setIsEditing(true);
  }

  function onInputKeyDown(event) {
    if (event.key === 'Enter' || event.key === 'Space') {
      event.preventDefault();
      setExpanded(!expanded);
      setIsEditing(!isEditing);
    }
  }

  function onKeyDown(event) {
    if (event.key === 'Escape') {
      setExpanded(false);
      setIsEditing(false);
    }
  }

  function onFocus(event) {
    event.preventDefault();
    setIsEditing(true);
    setExpanded(true);
  }

  function onBlur(event) {
    event.preventDefault();
    setIsEditing(false);
    setExpanded(false);
  }

  const sharedProps = {
    className: dateStyles['date-input'],
    disabled: props.disabled,
    icon: <IconButton onClick={openCalendar} className={dateStyles['input-icon']} icon={calendarSvg} title={props.label} label={`${props.label} calendar button`} />,
    label: props.label,
    inputRef,
    required: props.required,
    onClick: onInputClick,
    onKeyDown: onInputKeyDown,
    errorText: props.errorText,
    onBlur,
  };

  function renderField() {
    if (isEditing || !isValid) {
      return (
        <AbstractCustomField
          {...sharedProps}
          defaultValue={currentValue}
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

    return (
      <AbstractCustomField
        {...sharedProps}
        defaultValue={convertToFormat(currentValue, 'Month dd, yyyy')}
        id={props.id}
        key={`${props.id}-readonly`}
        inputRef={componentRef}
        onFocus={onFocus}
        type="text"
      />
    );
  }

  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div ref={wrapperRef} onKeyDown={onKeyDown}>
      { renderField() }
      { expanded && (
        <Calendar value={currentValue} onDateSelected={onDateSelected} />
      )}
    </div>
  );
});

CustomFieldInputDate.propTypes = {
  disabled: PropTypes.bool,
  error: PropTypes.bool,
  errorText: PropTypes.string,
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  min: PropTypes.string, /* eslint-disable-line react/no-unused-prop-types */
  max: PropTypes.string, /* eslint-disable-line react/no-unused-prop-types */
  onChange: PropTypes.func,
  required: PropTypes.bool,
  value: PropTypes.string,
};

CustomFieldInputDate.defaultProps = {
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
