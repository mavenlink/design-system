import PropTypes from 'prop-types';
import React, {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import FormControl from '../form-control/form-control.jsx';
import Icon from '../icon/icon.jsx';
import styles from './date.css';
import cautionSvg from '../../svgs/caution.svg';

export default function Date(props) {
  const inputRef = useRef();
  const [validationMessage, setValidationMessage] = useState(props.validationMessage);
  const classNames = {
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

  useEffect(() => {
    setValidationMessage(props.validationMessage);
  }, [props.validationMessage]);

  useLayoutEffect(() => {
    inputRef.current.setCustomValidity(validationMessage);
  }, [validationMessage]);

  return (
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
      {!!validationMessage && (
        <Icon
          className={styles['invalid-icon']}
          icon={cautionSvg}
          label={validationMessage}
        />
      )}
    </FormControl>
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
