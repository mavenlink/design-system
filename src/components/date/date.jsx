import PropTypes from 'prop-types';
import React, {
  forwardRef,
  useEffect,
  useLayoutEffect,
  useImperativeHandle,
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

function toDateStringFormat(date) {
  return date ? date.toLocaleDateString(undefined, { month: 'short', year: 'numeric', day: 'numeric' }) : '';
}

function toFullDateFormat(date) {
  return date ? date.toISOString().slice(0, 10) : undefined;
}

function fromFullDateFormat(string) {
  const date = new window.Date(`${string}T00:00:00`);
  if (date.toDateString() === 'Invalid Date') {
    return undefined;
  }

  return date;
}

const Date = forwardRef(function Date(props, forwardedRef) {
  const backupRef = useRef();
  const ref = forwardedRef || backupRef;
  const containerRef = useRef();
  const inputRef = useRef();
  const [active, setActive] = useState(false);
  const [editing, setEditing] = useState(!!props.validationMessage);
  const [expanded, setExpanded] = useState(false);
  const [validationMessage, setValidationMessage] = useState(props.validationMessage);
  const [value, setValue] = useState(fromFullDateFormat(props.value));
  const classNames = {
    input: validationMessage ? styles['invalid-input'] : styles.input,
    ...props.classNames,
    layout: {
      container: styles.container,
      calendar: styles['calendar-container'],
      ...props.classNames.layout,
    },
  };
  const ids = {
    input: props.id,
    label: `${props.id}-label`,
    tooltip: `${props.id}-tooltip`,
    validationMessage: `${props.id}Hint`,
  };

  function onBlur(event) {
    if (containerRef.current.contains(event.relatedTarget)) return;

    // Given the validation spec, any provided validation messages are cleared on blur.
    // If the native node is still invalid then re-render with the native validation messages.
    inputRef.current.setCustomValidity('');
    setValidationMessage(inputRef.current.validationMessage);
    setActive(false);
    if (!inputRef.current.validationMessage) setEditing(false);
  }

  function onInputChange() {
    setValue(fromFullDateFormat(inputRef.current.value));
  }

  function onInputClick(event) {
    if (props.readOnly) return;
    event.preventDefault();
    setActive(true);
    setEditing(true);
    setExpanded(true);
  }

  function onInputKeyDown(event) {
    setActive(true);

    if (props.readOnly) return;

    if (event.key === ' ') {
      event.preventDefault();
      setEditing(true);
      setExpanded(true);
    }

    if (event.key === 'Escape') {
      setExpanded(false);
    }
  }

  function onIconPress() {
    setActive(true);
    setExpanded(!expanded);
  }

  function onCalendarChange(newDate) {
    setValue(newDate);
    setEditing(false);
    setExpanded(false);
  }

  useDropdownClose(containerRef, expanded, () => setExpanded(false));

  useEffect(() => {
    setEditing(!!props.validationMessage);
    setValidationMessage(props.validationMessage);
  }, [props.validationMessage]);

  useEffect(() => {
    setValue(fromFullDateFormat(props.value));
  }, [props.value]);

  useEffect(() => {
    if (active && props.onChange) props.onChange({ target: ref.current });
  }, [value]);

  useLayoutEffect(() => {
    if (active) inputRef.current.focus();
  }, [editing]);

  useLayoutEffect(() => {
    inputRef.current.setCustomValidity(validationMessage);
  }, [validationMessage]);

  useLayoutEffect(() => {
    inputRef.current.value = editing ? toFullDateFormat(value) : toDateStringFormat(value);
  }, [value]);

  useImperativeHandle(ref, () => ({
    get dirty() {
      const providedValue = props.value;
      return providedValue !== this.value;
    },
    id: props.id,
    name: props.name,
    get value() {
      return toFullDateFormat(value);
    },
  }));

  return (
    <div
      className={classNames.layout.container}
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
        tooltip={props.tooltip}
      >
        <input
          aria-describedby={`${ids.validationMessage} ${ids.tooltip}`}
          className={classNames.input}
          defaultValue={editing ? toFullDateFormat(value) : toDateStringFormat(value)}
          id={ids.input}
          key={`${ids.input}-${editing ? 'editing' : 'display'}`}
          max={props.max}
          min={props.min}
          name={props.name}
          onChange={onInputChange}
          onClick={onInputClick}
          onKeyDown={onInputKeyDown}
          placeholder={props.placeholder}
          readOnly={props.readOnly}
          ref={inputRef}
          required={props.required}
          type={editing ? 'date' : 'text'}
        />
        <ControlIcons
          label={props.label}
          onPress={onIconPress}
          readOnly={props.readOnly}
          validationMessage={validationMessage}
        />
      </FormControl>
      {expanded && (
        <div className={classNames.layout.calendar}>
          <Calendar onDateSelected={onCalendarChange} value={toFullDateFormat(value)} />
        </div>
      )}
    </div>
  );
});

Date.propTypes = {
  classNames: PropTypes.shape({
    input: PropTypes.string,
    layout: PropTypes.shape({
      container: PropTypes.string,
      calendar: PropTypes.string,
    }),
  }),
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  /** The latest date to accept in full-date format (i.e. yyyy-mm-dd) */
  max: PropTypes.string,
  /** The earliest date to accept in full-date format (i.e. yyyy-mm-dd) */
  min: PropTypes.string,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  readOnly: PropTypes.bool,
  required: PropTypes.bool,
  tooltip: PropTypes.string,
  validationMessage: PropTypes.string,
  /** A date in full-date format (i.e. yyyy-mm-dd) */
  value: PropTypes.string,
};

Date.defaultProps = {
  classNames: {},
  max: undefined,
  min: undefined,
  onChange: undefined,
  placeholder: undefined,
  readOnly: false,
  required: false,
  tooltip: undefined,
  validationMessage: '',
  value: undefined,
};

export default Date;
