import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Icon from '../../icon/icon.jsx';
import styles from './abstract-custom-field.css';
import cautionSvg from '../../../svgs/caution.svg';
import FormControl from '../../form-control/form-control.jsx';

export default function AbstractCustomField(props) {
  const ids = {
    input: props.id,
    label: `${props.id}-label`,
    tooltip: `${props.id}-tooltip`,
    validation: `${props.id}Hint`,
  };

  const invalidDueToProps = props.errorText.length > 0 && !props.readOnly;

  const numIcons = () => {
    let num = 0;
    if (invalidDueToProps) {
      num += 1;
    }

    if (props.icon) {
      num += 1;
    }

    if (props.clear) {
      num += 1;
    }

    return num;
  };

  const showInvalidIcon = () => {
    if (invalidDueToProps) {
      return (<Icon
        className={styles['input-icon']}
        icon={cautionSvg}
        label="Invalid custom field"
      />);
    }

    return undefined;
  };

  const showIcon = () => {
    if (props.icon) {
      return props.icon;
    }

    return undefined;
  };

  const showClear = () => {
    if (props.clear) {
      return props.clear;
    }

    return undefined;
  };

  const inputClassName = () => {
    if (invalidDueToProps) return styles['input-invalid'];
    return props.inputClassName || styles.input;
  };

  useEffect(() => {
    if (!props.value && props.inputRef && props.inputRef.current) {
      props.inputRef.current.value = props.defaultValue ? props.defaultValue : ''; // eslint-disable-line no-param-reassign
    }
  }, [props.defaultValue]);

  return (
    <FormControl
      className={props.className}
      error={props.errorText}
      id={ids.input}
      labelId={ids.label}
      label={props.label}
      readOnly={props.readOnly}
      required={props.required}
      tooltip={props.tooltip}
    >
      <input
        autoComplete={props.autoComplete}
        aria-autocomplete={props.ariaProps.autocomplete}
        aria-controls={props.ariaProps.controls}
        aria-haspopup={props.ariaProps.haspopup}
        aria-expanded={props.ariaProps.expanded}
        aria-invalid={invalidDueToProps ? 'true' : undefined}
        aria-describedby={`${ids.tooltip} ${ids.validation}`}
        defaultValue={props.defaultValue}
        className={inputClassName()}
        disabled={props.disabled}
        id={ids.input}
        role={props.inputRole}
        max={props.max}
        maxLength={props.maxLength}
        min={props.min}
        name={props.name}
        onBlur={props.onBlur}
        onChange={props.onChange}
        onClick={props.onClick}
        onFocus={props.onFocus}
        onKeyDown={props.onKeyDown}
        onKeyUp={props.onKeyUp}
        onInput={props.onInput}
        placeholder={props.placeholder}
        readOnly={props.readOnly}
        ref={props.inputRef}
        required={props.required}
        step={props.step}
        style={{ '--numIcon': numIcons() }}
        type={props.type}
        value={props.value}
      />
      <div className={styles['icon-container']}>
        { showInvalidIcon() }
        { showClear() }
        { showIcon() }
      </div>
    </FormControl>
  );
}

AbstractCustomField.propTypes = {
  autoComplete: PropTypes.oneOf(['off', 'on']),
  ariaProps: PropTypes.shape({
    autocomplete: PropTypes.string,
    controls: PropTypes.string,
    expanded: PropTypes.bool,
    haspopup: PropTypes.string,
  }),
  className: PropTypes.string,
  inputClassName: PropTypes.string,
  clear: PropTypes.node,
  defaultValue: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
  disabled: PropTypes.bool,
  errorText: PropTypes.string,
  icon: PropTypes.node,
  id: PropTypes.string.isRequired,
  inputRole: PropTypes.string,
  inputRef: PropTypes.shape({ current: PropTypes.any }),
  label: PropTypes.string.isRequired,
  max: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
  maxLength: PropTypes.oneOfType([
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
  onKeyDown: PropTypes.func,
  onKeyUp: PropTypes.func,
  onInput: PropTypes.func,
  placeholder: PropTypes.string,
  readOnly: PropTypes.bool,
  required: PropTypes.bool,
  step: PropTypes.number,
  tooltip: PropTypes.string,
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

AbstractCustomField.defaultProps = {
  autoComplete: 'on',
  ariaProps: {},
  className: undefined,
  inputClassName: undefined,
  clear: undefined,
  defaultValue: undefined,
  disabled: false,
  errorText: '',
  icon: undefined,
  inputRef: undefined,
  inputRole: undefined,
  max: undefined,
  maxLength: undefined,
  min: undefined,
  name: undefined,
  onBlur: () => {},
  onChange: () => {},
  onClick: () => {},
  onFocus: () => {},
  onKeyDown: () => {},
  onKeyUp: () => {},
  onInput: () => {},
  placeholder: undefined,
  readOnly: false,
  required: false,
  step: undefined,
  tooltip: undefined,
  type: 'text',
  value: undefined,
};
