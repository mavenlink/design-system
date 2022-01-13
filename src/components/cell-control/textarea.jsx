import PropTypes from 'prop-types';
import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import cautionSvg from '../../svgs/caution.svg';
import CellControl from './cell-control.jsx';
import Icon from '../icon/icon.jsx';
import styles from './textarea.css';
import useValidation from '../../hooks/use-validation.jsx';

const Textarea = forwardRef(function Textarea(props, ref) {
  const refs = {
    textarea: useRef(),
  };

  const [validationMessage, validate] = useValidation(props.validationMessage, refs.textarea);

  const classNames = {
    container: styles.container,
    textarea: styles.textarea,
  };

  function onBlur() {
    validate();
  }

  useImperativeHandle(ref, () => ({}));

  return (
    <CellControl
      className={classNames.container}
      labelledBy={props.labelledBy}
    >
      <textarea
        className={classNames.textarea}
        defaultValue={props.value}
        onBlur={onBlur}
        placeholder={props.placeholder}
        readOnly={props.readOnly}
        ref={refs.textarea}
        required={props.required}
      />
      <div
        className={styles.iconsContainer}
        style={{
          display: validationMessage ? 'block' : 'none',
        }}
      >
        <Icon
          className={styles.invalidIcon}
          icon={cautionSvg}
          label={validationMessage}
        />
      </div>
    </CellControl>
  );
});

Textarea.propTypes = {
  /* The ID of the header cell. */
  labelledBy: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  readOnly: PropTypes.bool,
  required: PropTypes.bool,
  validationMessage: PropTypes.string,
  value: PropTypes.string,
};

Textarea.defaultProps = {
  readOnly: false,
  required: false,
  placeholder: '',
  validationMessage: undefined,
  value: '',
};

export default Textarea;
