import PropTypes from 'prop-types';
import React from 'react';

import cautionSvg from '../../svgs/icon-caution-fill.svg';
import Icon from '../icon/icon.jsx';
import styles from './custom-field-input-text.css';

function getRootClassName(className, error, disabled) {
  if (disabled) {
    return `${className} ${styles.disabled}`;
  }

  if (error) {
    return `${className} ${styles.error}`;
  }

  return className;
}

export default function CustomFieldInputText(props) {
  return (
    <div className={getRootClassName(props.className, props.error, props.disabled)}>
      <div className={styles['heading-container']}>
        <label className={styles.label} htmlFor={props.id}>Input Descriptor</label>
        {props.required && <span className={styles.optional}>(Required)</span>}
      </div>
      <div className={styles['input-container']}>
        <input className={styles.input} type="text" id={props.id} name={props.name} placeholder={props.placeholder} value={props.value} onClick={props.onClick} disabled={props.disabled} />
        {props.error &&
          <div className={styles['input-icon-container']}>
            <Icon className={styles['input-icon']} currentColor="caution" name={cautionSvg.id} size="medium" />
          </div>
        }
      </div>
      <span className={styles.help}>{props.helpText}</span>
    </div>
  );
}

CustomFieldInputText.propTypes = {
  className: PropTypes.string,
  disabled: PropTypes.bool,
  error: PropTypes.bool,
  helpText: PropTypes.string,
  id: PropTypes.string,
  name: PropTypes.string,
  onClick: PropTypes.func,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  value: PropTypes.string,
};

CustomFieldInputText.defaultProps = {
  className: styles['custom-field-input-text'],
  disabled: false,
  error: false,
  helpText: undefined,
  id: undefined,
  name: undefined,
  onClick: () => {},
  placeholder: undefined,
  required: false,
  value: undefined,
};
