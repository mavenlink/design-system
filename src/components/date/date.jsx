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

export default function Date(props) {
  const inputRef = useRef();
  const [expanded, setExpanded] = useState(false);
  const [validationMessage, setValidationMessage] = useState(props.validationMessage);
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

  function onBlur() {
    setValidationMessage(inputRef.current.validationMessage);
  }

  function onIconPress() {
    setExpanded(!expanded);
  }

  useEffect(() => {
    setValidationMessage(props.validationMessage);
  }, [props.validationMessage]);

  useLayoutEffect(() => {
    inputRef.current.setCustomValidity(validationMessage);
  }, [validationMessage]);

  return (
    <div className={classNames.layouts.container}>
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
          id={ids.input}
          onBlur={onBlur}
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
          <Calendar />
        </div>
      )}
    </div>
  );
}

Date.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  readOnly: PropTypes.bool,
  required: PropTypes.bool,
  validationMessage: PropTypes.string,
};

Date.defaultProps = {
  readOnly: false,
  required: false,
  validationMessage: '',
};
