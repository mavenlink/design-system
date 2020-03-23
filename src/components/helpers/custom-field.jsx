import React from 'react';
import PropTypes from 'prop-types';
import cautionSvg from '../../svgs/icon-caution-fill.svg';
import Icon from '../icon/icon.jsx';
import Input from './input.jsx';
import styles from './styles.css';

export default function CustomField(props) {
  const getRootClassName = (className, error) => {
    const name = `${styles['custom-field-root']} ${className}`;

    if (error) {
      return `${name} ${styles.error}`;
    }

    return name;
  };

  const icon = () => {
    if (props.error) {
      return (<Icon
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
    return props.error || !!props.icon;
  };

  return (<div className={getRootClassName(props.className, props.error)} data-testid="custom-field-input">
    <div className={styles['heading-container']}>
      <label className={styles.label} htmlFor={props.id}>{props.label}</label>
      {props.required && <span>(Required)</span>}
    </div>
    <div className={styles['input-container']}>
      <Input
        className={styles.input}
        controlled={props.controlled}
        disabled={props.disabled}
        id={props.id}
        inputRef={props.inputRef}
        max={props.max}
        min={props.min}
        name={props.name}
        onBlur={props.onBlur}
        onChange={props.onChange}
        onFocus={props.onFocus}
        onKeyUp={props.onKeyUp}
        placeholder={props.placeholder}
        readOnly={props.readOnly}
        required={props.required}
        step={props.step}
        type={props.type}
        value={props.value}
      />
      {showIcon() &&
      <div className={styles['input-icon-container']}>
        { icon() }
      </div>
      }
    </div>
    {props.error && <span className={styles.help}>{props.helpText}</span>}
  </div>);
}

CustomField.propTypes = {
  className: PropTypes.string,
  controlled: PropTypes.bool,
  disabled: PropTypes.bool,
  error: PropTypes.bool,
  helpText: PropTypes.string,
  icon: PropTypes.node,
  id: PropTypes.string.isRequired,
  inputRef: PropTypes.shape({ current: PropTypes.any }),
  label: PropTypes.string.isRequired,
  max: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  min: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  name: PropTypes.string,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  onKeyUp: PropTypes.func,
  placeholder: PropTypes.string,
  readOnly: PropTypes.bool,
  required: PropTypes.bool,
  step: PropTypes.number,
  type: PropTypes.oneOf(['date', 'number', 'text']),
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};
CustomField.defaultProps = {
  className: undefined,
  controlled: false,
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
  onFocus: () => {},
  onKeyUp: () => {},
  placeholder: undefined,
  readOnly: false,
  required: false,
  step: undefined,
  type: 'text',
  value: undefined,
};
