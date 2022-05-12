import PropTypes from 'prop-types';
import React, { forwardRef } from 'react';
import CellControl from '../cell-control/cell-control.jsx';
import InputControl from '../control/input.jsx';
import styles from './input.css';

const Input = forwardRef(function Input(props, ref) {
  return (
    <CellControl
      className={props.className}
      labelledBy={props.labelledBy}
      readOnly={props.readOnly}
    >
      <InputControl
        classNames={{
          input: styles.input,
          invalidInput: styles.invalidInput,
        }}
        id={props.id}
        name={props.name}
        onBlur={props.onBlur}
        onChange={props.onChange}
        onFocus={props.onFocus}
        readOnly={props.readOnly}
        ref={ref}
        required={props.required}
        validationMessage={props.validationMessage}
        value={props.value}
      />
    </CellControl>
  );
});

Input.propTypes = {
  /** A class name for the table cell container. */
  className: PropTypes.string,
  /** A unique ID for the component. */
  id: PropTypes.string.isRequired,
  /** The ID of the column header. */
  labelledBy: PropTypes.string.isRequired,
  /** See documentation on `FormControl#name` */
  name: PropTypes.string.isRequired,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  /** Disable changes to the input control. */
  readOnly: PropTypes.bool,
  /** Require a value on the input control. */
  required: PropTypes.bool,
  /** A server-side validation message. */
  validationMessage: PropTypes.string,
  /** The initial value of the cell */
  value: PropTypes.string,
};

Input.defaultProps = {
  className: styles.container,
  onBlur: () => {},
  onChange: () => {},
  onFocus: () => {},
  readOnly: false,
  required: false,
  validationMessage: '',
  value: '',
};

export default Input;
