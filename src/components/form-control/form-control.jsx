import React, { forwardRef, useImperativeHandle } from 'react';
import PropTypes from 'prop-types';
import HelpIcon from '../help-icon/help-icon.jsx';
import styles from './form-control.css';

const FormControl = forwardRef(function FormControl(props, ref) {
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
  };

  useImperativeHandle(ref, () => ({
    /** Determine whether the component has a different value than the provided prop. */
    get dirty() { return undefined; },
    /** The ID of the input element. */
    id: props.id, // Is this needed anymore? Seems like it can be solved by `name`
    /** The name of the control element which is used to reference the form-data after submitting the form. */
    name: props.name,
    /** Access the value of the component without hoisting value state */
    get value() { return undefined; },
  }));

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
      <div className={classNames.control}>
        {props.children}
      </div>
    </div>
  );
});

FormControl.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
  error: PropTypes.string,
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  /** The ID of the label element. */
  labelId: PropTypes.string,
  /** The name of the input element which is used to reference the form-data after submitting the form. */
  name: PropTypes.string,
  onKeyDown: PropTypes.func,
  required: PropTypes.bool,
  tooltip: PropTypes.string,
};

FormControl.defaultProps = {
  className: undefined,
  error: '',
  id: undefined,
  labelId: undefined,
  name: undefined,
  onKeyDown: () => {},
  required: false,
  tooltip: undefined,
};

export default FormControl;
