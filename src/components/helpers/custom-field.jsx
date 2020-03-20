import React from 'react';
import PropTypes from 'prop-types';
import cautionSvg from '../../svgs/icon-caution-fill.svg';
import Icon from '../icon/icon.jsx';
import Input from './input.jsx';
import styles from './styles.css';

export default function CustomField(props) {
  const getRootClassName = (className, error) => {
    if (error) {
      return `${className} ${styles.error}`;
    }

    return className;
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

  return (<div className={getRootClassName('', props.error)}>
    <div className={styles['heading-container']}>
      <label className={styles.label} htmlFor={props.id}>{props.label}</label>
      {props.required && <span>(Required)</span>}
    </div>
    <div className={styles['input-container']}>
      <Input
        className={styles.input}
        disabled={props.disabled}
        id={props.id}
        inputRef={props.inputRef}
        name={props.name}
        onBlur={props.onBlur}
        onChange={props.onChange}
        onFocus={props.onFocus}
        onKeyUp={props.onKeyUp}
        placeholder={props.placeholder}
        required={props.required}
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
  disabled: PropTypes.bool,
  error: PropTypes.bool,
  helpText: PropTypes.string,
  icon: PropTypes.node,
  id: PropTypes.string.isRequired,
  inputRef: PropTypes.shape({ current: PropTypes.any }),
  label: PropTypes.string.isRequired,
  name: PropTypes.string,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  onKeyUp: PropTypes.func,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
};

CustomField.defaultProps = {
  disabled: false,
  error: false,
  helpText: undefined,
  icon: undefined,
  inputRef: undefined,
  name: undefined,
  onBlur: () => {},
  onChange: () => {},
  onFocus: () => {},
  onKeyUp: () => {},
  placeholder: undefined,
  required: false,
};
