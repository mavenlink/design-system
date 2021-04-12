import PropTypes from 'prop-types';
import React, {
  useLayoutEffect,
  useRef,
} from 'react';
import FormControl from '../form-control/form-control.jsx';
import Icon from '../icon/icon.jsx';
import styles from './date.css';
import cautionSvg from '../../svgs/caution.svg';

export default function Date(props) {
  const inputRef = useRef();
  const classNames = {
    input: props.validationMessage ? styles['invalid-input'] : styles.input,
  };
  const ids = {
    input: props.id,
    label: `${props.id}-label`,
    validationMessage: `${props.id}Hint`,
  };

  useLayoutEffect(() => {
    inputRef.current.setCustomValidity(props.validationMessage);
  }, []);

  return (
    <FormControl
      error={props.validationMessage}
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
        readOnly={props.readOnly}
        ref={inputRef}
        required={props.required}
        type="date"
      />
      {!!props.validationMessage && (
        <Icon
          className={styles['invalid-icon']}
          icon={cautionSvg}
          label={props.validationMessage}
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
