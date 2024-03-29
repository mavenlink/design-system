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
import Calendar from '../calendar/calendar.jsx';
import IconButton from '../icon-button/icon-button.jsx';
import Icons from './icons.jsx';
import useDropdownClose from '../../hooks/use-dropdown-close.js';
import styles from './date.css';
import useForwardedRef from '../../hooks/use-forwarded-ref.js';
import useValidation from '../../hooks/use-validation.js';

function toDateStringFormat(date) {
  return date ? date.toLocaleDateString(undefined, { month: 'short', year: 'numeric', day: 'numeric' }) : '';
}

function toFullDateFormat(date) {
  // Note: This returns the localized date without any timezone offset (backend is timezone agnostic).
  // Note: This uses Sweden as locale because it is one of the countries that uses ISO 8601 format.
  return date ? date.toLocaleDateString('sv') : undefined;
}

function fromFullDateFormat(string) {
  const date = new window.Date(`${string}T00:00:00`);
  if (date.toDateString() === 'Invalid Date') {
    return undefined;
  }

  return date;
}

const Date = forwardRef(function Date(props, forwardedRef) {
  const ref = useForwardedRef(forwardedRef);
  const [active, setActive] = useState(false);
  const [editing, setEditing] = useState(!!props.validationMessage);
  const [expanded, setExpanded] = useState(false);
  const [value, setValue] = useState(fromFullDateFormat(props.value));
  const classNames = {
    container: undefined,
    input: styles.input,
    invalidInput: styles['invalid-input'],
    calendar: styles['calendar-container'],
    ...props.classNames,
  };
  const ids = {
    input: props.id,
    label: `${props.id}-label`,
    tooltip: `${props.id}-tooltip`,
    validationMessage: `${props.id}Hint`,
  };
  const refs = {
    container: useRef(),
    input: useRef(),
  };
  const [validationMessage, validate] = useValidation(props.validationMessage, refs.input);

  function onBlur(event) {
    if (refs.container.current.contains(event.relatedTarget)) return;

    validate();
    setActive(false);
    props.onBlur(event);
    if (!props.validationMessage) setEditing(false);
  }

  function onInputChange() {
    setValue(fromFullDateFormat(refs.input.current.value));
  }

  function onFocusIntoDateControl(event) {
    if (props.readOnly) return;
    if (!active) props.onFocus(event);
    setActive(true);
    setEditing(true);
  }

  function onInputClick(event) {
    if (props.readOnly) return;
    event.preventDefault();
    if (!active) refs.input.current.focus();
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

  useDropdownClose(refs.container, expanded, () => setExpanded(false));

  useEffect(() => {
    setEditing(!!props.validationMessage);
  }, [props.validationMessage]);

  useEffect(() => {
    setValue(fromFullDateFormat(props.value));
  }, [props.value]);

  useEffect(() => {
    if (active && props.onChange) props.onChange({ target: ref.current });
  }, [value]);

  useLayoutEffect(() => {
    if (active) refs.input.current.focus();
  }, [editing]);

  useLayoutEffect(() => {
    setEditing(!!validationMessage);
    props.onInvalid({
      target: ref.current,
      detail: {
        validationMessage,
      },
    });
  }, [validationMessage]);

  useLayoutEffect(() => {
    refs.input.current.value = editing ? toFullDateFormat(value) : toDateStringFormat(value);
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
      className={classNames.container}
      onBlur={onBlur}
      onFocus={onFocusIntoDateControl}
      ref={refs.container}
      style={{ height: '100%', position: 'relative' }}
    >
      <input
        aria-describedby={`${ids.validationMessage} ${ids.tooltip}`}
        className={validationMessage ? classNames.invalidInput : classNames.input}
        defaultValue={editing ? toFullDateFormat(value) : toDateStringFormat(value)}
        id={ids.input}
        key={`${ids.input}-${editing ? 'editing' : 'display'}`}
        max={props.max}
        min={props.min}
        name={props.name}
        onClick={e => !props.readOnly && e.preventDefault()}
        onChange={onInputChange}
        onMouseDown={onInputClick}
        onKeyDown={onInputKeyDown}
        placeholder={props.placeholder}
        readOnly={props.readOnly}
        ref={refs.input}
        required={props.required}
        type={editing ? 'date' : 'text'}
      />
      <Icons
        validationMessage={validationMessage}
        validationMessageId={ids.validationMessage}
      >
        <IconButton
          disabled={props.readOnly}
          onPress={onIconPress}
          icon={calendarSvg}
          label="calendar button"
        />
      </Icons>
      {expanded && (
        <div className={classNames.calendar}>
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
  /** The latest date to accept in full-date format (i.e. yyyy-mm-dd) */
  max: PropTypes.string,
  /** The earliest date to accept in full-date format (i.e. yyyy-mm-dd) */
  min: PropTypes.string,
  name: PropTypes.string,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  onInvalid: PropTypes.func,
  placeholder: PropTypes.string,
  readOnly: PropTypes.bool,
  required: PropTypes.bool,
  validationMessage: PropTypes.string,
  /** A date in full-date format (i.e. yyyy-mm-dd) */
  value: PropTypes.string,
};

Date.defaultProps = {
  classNames: {},
  max: undefined,
  min: undefined,
  name: undefined,
  onBlur: () => {},
  onChange: undefined,
  onFocus: () => {},
  onInvalid: () => {},
  placeholder: undefined,
  readOnly: false,
  required: false,
  tooltip: undefined,
  validationMessage: '',
  value: undefined,
};

export default Date;
