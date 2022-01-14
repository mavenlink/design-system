import PropTypes from 'prop-types';
import React, { forwardRef, useImperativeHandle, useLayoutEffect, useRef, useState } from 'react';
import cautionSvg from '../../svgs/caution.svg';
import CellControl from './cell-control.jsx';
import Icon from '../icon/icon.jsx';
import styles from './textarea.css';
import useValidation from '../../hooks/use-validation.jsx';

function useHeight(ref) {
  const [height, setHeight] = useState();

  useLayoutEffect(() => {
    if (ref.current.scrollHeight > ref.current.offsetHeight) setHeight(ref.current.scrollHeight);
  }, []);

  return [height];
}

const Textarea = forwardRef(function Textarea(props, ref) {
  const refs = {
    textarea: useRef(),
  };

  const [height] = useHeight(refs.textarea);
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
        style={{ height }}
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
