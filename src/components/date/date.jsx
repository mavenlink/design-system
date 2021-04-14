import PropTypes from 'prop-types';
import React, {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import calendarSvg from '../../svgs/calendar.svg';
import cautionSvg from '../../svgs/caution.svg';
import Calendar from '../calendar/calendar.jsx';
import FormControl from '../form-control/form-control.jsx';
import IconButton from '../icon-button/icon-button.jsx';
import Icon from '../icon/icon.jsx';
import useDropdownClose from '../../hooks/use-dropdown-close.js';
import styles from './date.css';

/* eslint-disable react/prop-types */
function ControlIcons(props) {
  return (
    <div className={styles.icons}>
      {!!props.validationMessage && (
        <Icon
          className={styles['invalid-icon']}
          icon={cautionSvg}
          label={props.validationMessage}
        />
      )}
      {props.readOnly ? (
        <Icon
          icon={calendarSvg}
          title={props.label}
          label={`${props.label} calendar icon`}
        />
      ) : (
        <IconButton
          onPress={props.onPress}
          icon={calendarSvg}
          title={props.label}
          label={`${props.label} calendar button`}
        />
      )}
    </div>
  );
}
/* eslint-enable react/prop-types */

function toFullDateFormat(date) {
  return date ? date.toISOString().slice(0, 10) : undefined;
}

function fromFullDateFormat(string) {
  return new window.Date(`${string}T00:00:00`);
}

export default function Date(props) {
  const containerRef = useRef();
  const inputRef = useRef();
  const [expanded, setExpanded] = useState(false);
  const [validationMessage, setValidationMessage] = useState(props.validationMessage);
  const [value, setValue] = useState(undefined);
  const classNames = {
    layouts: {
      container: styles.container,
      calendar: styles['calendar-container'],
    },
    input: validationMessage ? styles['invalid-input'] : styles.input,
  };
  const ids = {
    input: props.id,
    label: `${props.id}-label`,
    validationMessage: `${props.id}Hint`,
  };

  function onBlur(event) {
    if (containerRef.current.contains(event.relatedTarget)) return;

    // Given the validation spec, any provided validation messages are cleared on blur.
    // If the native node is still invalid then re-render with the native validation messages.
    inputRef.current.setCustomValidity('');
    setValidationMessage(inputRef.current.validationMessage);
  }

  function onInputChange() {
    const newDate = fromFullDateFormat(inputRef.current.value);
    if (newDate.toDateString() === 'Invalid Date') {
      setValue(undefined);
    } else {
      setValue(newDate);
    }
  }

  function onInputClick() {
    if (props.readOnly) return;
    setExpanded(true);
  }

  function onInputKeyDown(event) {
    if (props.readOnly) return;
    if (event.key === 'Enter') setExpanded(true);
    if (event.key === 'Escape') setExpanded(false);
  }

  function onIconPress() {
    setExpanded(!expanded);
  }

  function onCalendarChange(newDate) {
    setValue(newDate);
    setExpanded(false);
  }

  useDropdownClose(containerRef, expanded, () => setExpanded(false));

  useEffect(() => {
    setValidationMessage(props.validationMessage);
  }, [props.validationMessage]);

  useLayoutEffect(() => {
    inputRef.current.setCustomValidity(validationMessage);
  }, [validationMessage]);

  return (
    <div
      className={classNames.layouts.container}
      onBlur={onBlur}
      ref={containerRef}
    >
      <FormControl
        error={validationMessage}
        id={ids.input}
        labelId={ids.label}
        label={props.label}
        readOnly={props.readOnly}
        required={props.required}
      >
        <input
          aria-describedby={ids.validationMessage}
          className={classNames.input}
          defaultValue={toFullDateFormat(value)}
          id={ids.input}
          max={props.max}
          min={props.min}
          onChange={onInputChange}
          onClick={onInputClick}
          onKeyDown={onInputKeyDown}
          readOnly={props.readOnly}
          ref={inputRef}
          required={props.required}
          type="date"
        />
        <ControlIcons
          label={props.label}
          onPress={onIconPress}
          readOnly={props.readOnly}
          validationMessage={validationMessage}
        />
      </FormControl>
      {expanded && (
        <div className={classNames.layouts.calendar}>
          <Calendar onDateSelected={onCalendarChange} value={toFullDateFormat(value)} />
        </div>
      )}
    </div>
  );
}

Date.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  /** The latest date to accept in full-date format (i.e. yyyy-mm-dd) */
  max: PropTypes.string,
  /** The earliest date to accept in full-date format (i.e. yyyy-mm-dd) */
  min: PropTypes.string,
  readOnly: PropTypes.bool,
  required: PropTypes.bool,
  validationMessage: PropTypes.string,
};

Date.defaultProps = {
  max: undefined,
  min: undefined,
  readOnly: false,
  required: false,
  validationMessage: '',
};
