import React from 'react';
import PropTypes from 'prop-types';
import Control from '../control/control.jsx';
import HelpIcon from '../help-icon/help-icon.jsx';
import styles from './form-control.css';

export default function FormControl(props) {
  const classNames = {
    container: props.className,
    control: styles['control-container'],
    heading: styles['label-wrapper'],
    label: props.error ? styles['invalid-label'] : styles.label,
  };
  const ids = {
    input: props.id,
    label: props.labelId || `${props.id}-label`,
    tooltip: `${props.id}-tooltip`,
    validationMessage: `${props.id}Hint`,
  };

  return (
    <div className={classNames.container} onKeyDown={props.onKeyDown} role="presentation">
      <div className={classNames.heading}>
        <div className={classNames.label}>
          <label htmlFor={ids.input} id={ids.label}>
            {props.label}
          </label>
          {props.required && '(Required)'}
        </div>
        {!!props.tooltip && (
          <HelpIcon id={ids.tooltip} label="More information" text={props.tooltip} />
        )}
      </div>
      <Control
        labelledBy={ids.label}
        validationMessage={props.error}
        validationMessageId={ids.validationMessage}
      >
        <div className={classNames.control}>
          {props.children}
        </div>
      </Control>
    </div>
  );
}

FormControl.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
  error: PropTypes.string,
  id: (props) => {
    if (props.id === undefined && props.labelId === undefined) {
      return new Error('Invalid prop `id` supplied to `FormControl`. Either `id` or `labelId` are required.');
    }

    if (typeof props.id !== 'string' && props.labelId === undefined) {
      return new Error('Invalid prop `id` supplied to `FormControl`. `id` must be a string.');
    }

    return undefined;
  },
  label: PropTypes.string.isRequired,
  labelId: (props) => {
    if (props.id === undefined && props.labelId === undefined) {
      return new Error('Invalid prop `labelId` supplied to `FormControl`. Either `id` or `labelId` are required.');
    }

    if (props.id === undefined && typeof props.labelId !== 'string') {
      return new Error('Invalid prop `labelId` supplied to `FormControl`. `labelId` must be a string.');
    }

    return undefined;
  },
  onKeyDown: PropTypes.func,
  required: PropTypes.bool,
  tooltip: PropTypes.string,
};

FormControl.defaultProps = {
  className: undefined,
  error: '',
  id: undefined,
  labelId: undefined,
  onKeyDown: () => {},
  required: false,
  tooltip: undefined,
};
