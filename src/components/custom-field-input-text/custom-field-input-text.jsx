import PropTypes from 'prop-types';
import React, { useEffect, useRef, useState } from 'react';

import cautionSvg from '../../svgs/icon-caution-fill.svg';
import FormControl from '../form-control/form-control.jsx';
import Icon from '../icon/icon.jsx';
import styles from './custom-field-input-text.css';

function isInvalid(error, readOnly) {
  return error && !readOnly;
}

export default function CustomFieldInputText(props) {
  const defaultRef = useRef(null);
  const [validationMessage, setValidationMessage] = useState('');

  const inputRef = props.inputRef || defaultRef;

  useEffect(() => {
    if (!inputRef.current) return;

    if (isInvalid(props.error, props.readOnly)) {
      if (props.helpText) {
        inputRef.current.setCustomValidity(props.helpText);
        setValidationMessage(props.helpText);
      } else {
        setValidationMessage(inputRef.current.validationMessage);
      }
    } else {
      inputRef.current.setCustomValidity('');
      setValidationMessage('');
    }
  });

  const icon = () => {
    if (isInvalid(props.error, props.readOnly)) {
      return (<Icon
        className={styles['input-icon']}
        currentColor="caution"
        name={cautionSvg.id}
        size="medium"
      />);
    }

    if (props.icon) {
      return props.icon;
    }

    return undefined;
  };

  const showIcon = () => {
    return isInvalid(props.error, props.readOnly) || !!props.icon;
  };

  return (
    <FormControl
      className={props.className}
      error={validationMessage}
      id={props.id}
      labelId={`${props.id}-label`}
      label={props.label}
      readOnly={props.readOnly}
      required={props.required}
    >
      <input
        defaultValue={props.value}
        className={styles.input}
        disabled={props.disabled}
        id={props.id}
        max={props.max}
        min={props.min}
        name={props.name}
        onBlur={props.onBlur}
        onChange={props.onChange}
        onClick={props.onClick}
        onFocus={props.onFocus}
        onKeyUp={props.onKeyUp}
        placeholder={props.placeholder}
        readOnly={props.readOnly}
        ref={inputRef}
        required={props.required}
        step={props.step}
        type={props.type}
      />
      {showIcon() && icon()}
    </FormControl>
  );
}

CustomFieldInputText.propTypes = {
  className: PropTypes.string,
  disabled: PropTypes.bool,
  error: PropTypes.bool,
  helpText: PropTypes.string,
  icon: PropTypes.node,
  id: PropTypes.string.isRequired,
  inputRef: PropTypes.shape({ current: PropTypes.any }),
  label: PropTypes.string.isRequired,
  max: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
  min: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
  name: PropTypes.string,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  onClick: PropTypes.func,
  onFocus: PropTypes.func,
  onKeyUp: PropTypes.func,
  placeholder: PropTypes.string,
  readOnly: PropTypes.bool,
  required: PropTypes.bool,
  step: PropTypes.number,
  type: PropTypes.oneOf([
    'date',
    'number',
    'text',
  ]),
  value: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
};

CustomFieldInputText.defaultProps = {
  className: undefined,
  disabled: false,
  error: false,
  helpText: undefined,
  icon: undefined,
  inputRef: undefined,
  max: undefined,
  min: undefined,
  name: undefined,
  onBlur: () => {},
  onChange: () => {},
  onClick: () => {},
  onFocus: () => {},
  onKeyUp: () => {},
  placeholder: undefined,
  readOnly: false,
  required: false,
  step: undefined,
  type: 'text',
  value: undefined,
};
