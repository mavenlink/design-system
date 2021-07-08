import PropTypes from 'prop-types';
import React, {
  useLayoutEffect,
  useRef,
} from 'react';
import cautionSvg from '../../svgs/caution.svg';
import CellControl from '../cell-control/cell-control.jsx';
import Icon from '../icon/icon.jsx';
import styles from './input.css';

function Input(props) {
  const inputRef = useRef();
  const classNames = {
    control: styles['control-container'],
    input: props.validationMessage ? styles['invalid-input'] : styles.input,
  };
  const ids = {
    validationMessage: `${props.id}-validation-message`,
  };

  useLayoutEffect(() => {
    inputRef.current.setCustomValidity(props.validationMessage);
  }, [props.validationMessage]);

  return (
    <CellControl
      labelledBy={props.labelledBy}
      readOnly={props.readOnly}
      validationMessage={props.validationMessage}
      validationMessageId={ids.validationMessage}
    >
      <div className={classNames.control}>
        <input
          aria-describedby={ids.validationMessage}
          className={classNames.input}
          readOnly={props.readOnly}
          ref={inputRef}
        />
        {!!props.validationMessage && (
          <Icon
            className={styles['invalid-icon']}
            icon={cautionSvg}
            label={props.validationMessage}
          />
        )}
      </div>
    </CellControl>
  );
}

Input.propTypes = {
  id: PropTypes.string.isRequired,
  /** The ID of the column header */
  labelledBy: PropTypes.string.isRequired,
  readOnly: PropTypes.bool,
  validationMessage: PropTypes.string,
};

Input.defaultProps = {
  readOnly: false,
  validationMessage: '',
};

export default Input;
