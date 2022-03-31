import PropTypes from 'prop-types';
import React, { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import CellControl from './cell-control.jsx';
import Icons from '../control/icons.jsx';
import styles from './textarea.css';
import useValidation from '../../hooks/use-validation.jsx';

const Textarea = forwardRef(function Textarea(props, ref) {
  const ids = {
    invalidIcon: `${props.id}-invalid-icon`,
    invalidTooltip: `${props.id}-invalid-tooltip`,
  };
  const refs = {
    textarea: useRef(),
  };

  const [height, setHeight] = useState();
  const [validationMessage, validate] = useValidation(props.validationMessage, refs.textarea);

  const classNames = {
    container: styles.container,
    textarea: styles.textarea,
    ...props.classNames,
  };

  function onBlur() {
    validate();
    setHeight(undefined);
  }

  function onChange(event) {
    setHeight(refs.textarea.current.scrollHeight);
    props.onChange(event);
  }

  function onFocus() {
    setHeight(refs.textarea.current.scrollHeight);
  }

  useImperativeHandle(ref, () => {
    return ({
      get value() {
        return refs.textarea.current.value;
      },
    });
  });

  return (
    <CellControl
      className={classNames.container}
      labelledBy={props.labelledBy}
    >
      <textarea
        aria-describedby={ids.invalidIcon}
        className={classNames.textarea}
        defaultValue={props.value}
        onBlur={onBlur}
        onChange={onChange}
        onFocus={onFocus}
        placeholder={props.placeholder}
        readOnly={props.readOnly}
        ref={refs.textarea}
        required={props.required}
        style={{ height }}
      />
      <Icons
        validationMessage={validationMessage}
        validationMessageId={ids.invalidIcon}
      />
    </CellControl>
  );
});

Textarea.propTypes = {
  classNames: PropTypes.shape({
    container: PropTypes.string,
    textarea: PropTypes.string,
  }),
  /* The ID of the header cell. */
  labelledBy: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  readOnly: PropTypes.bool,
  required: PropTypes.bool,
  validationMessage: PropTypes.string,
  value: PropTypes.string,
};

Textarea.defaultProps = {
  classNames: {},
  readOnly: false,
  required: false,
  onChange: () => {},
  placeholder: '',
  validationMessage: '',
  value: '',
};

export default Textarea;
