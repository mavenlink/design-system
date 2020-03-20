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

    return undefined;
  };

  const showIcon = () => {
    return props.error;
  };

  return (<div className={getRootClassName('', props.error)}>
    <div className={styles['heading-container']}>
      <label className={styles.label} htmlFor={props.id}>{props.label}</label>
      {props.required && <span>(Required)</span>}
    </div>
    <div className={styles['input-container']}>
      <Input
        className={styles.input}
        id={props.id}
        inputRef={props.inputRef}
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
  error: PropTypes.bool,
  helpText: PropTypes.string,
  id: PropTypes.string.isRequired,
  inputRef: PropTypes.shape({ current: PropTypes.any }),
  label: PropTypes.string.isRequired,
  required: PropTypes.bool,
};

CustomField.defaultProps = {
  error: false,
  helpText: undefined,
  inputRef: undefined,
  required: false,
};
