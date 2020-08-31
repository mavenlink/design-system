import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import calendarSvg from '../../svgs/icon-calendar-fill.svg';
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
  const [isEditing, setIsEditing] = useState(true);
  const [currentValue, setCurrentValue] = useState(props.value);
  const [isValid, setIsValid] = useState(isValueValid(currentValue, props.error, true));
  const [isFocused] = useState(false);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    if (!inputRef.current) return;

    const isInputValid = inputRef.current.validity.valid;
    const valid = isValueValid(currentValue, props.error, isInputValid);
    setIsValid(valid);

    if (!valid) {
      setIsEditing(true);
    } else {
      setIsEditing(false);
    }
  }, [inputRef.current, currentValue, props.error]);

  useEffect(() => {
    if (isEditing && isFocused) {
      inputRef.current.focus();
    }
  }, [isEditing, isFocused]);

  function onDateSelected(date) {
    setCurrentValue(date.toISOString().slice(0, 10));
    setExpanded(false);
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
  };
  useDropdownClose(wrapperRef, expanded, handleDropdownClose);

  const openCalendar = () => {
    setExpanded(!expanded);
  };

  const sharedProps = {
    className: props.className,
    disabled: props.disabled,
    icon: <IconButton onClick={openCalendar} className={dateStyles['input-icon']} icon={calendarSvg} title={props.label} label={`${props.label} calendar button`} />,
    label: props.label,
    inputRef,
    readOnly: true,
    required: props.required,
  };

  function renderField() {
    if (isEditing || !isValid) {
      const value = validDate(currentValue) ? convertToFormat(currentValue, 'yyyy-mm-dd') : currentValue;

      return (
        <AbstractCustomField
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

    return (
      <AbstractCustomField
        {...sharedProps}
        defaultValue={convertToFormat(currentValue, 'Month dd, yyyy')}
        id={props.id}
        key={`${props.id}-readonly`}
        inputRef={componentRef}
        type="text"
      />
    );
  }

  return (
    <div ref={wrapperRef}>
      { renderField() }
      { expanded && (
        <Calendar value={currentValue} onDateSelected={onDateSelected} />
      )}
    </div>
  );
});

CustomFieldInputDate.propTypes = {
  className: PropTypes.string,
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
