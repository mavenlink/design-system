import PropTypes from 'prop-types';
import React, { forwardRef } from 'react';
import CellControl from '../cell-control/cell-control.jsx';
import InputControl from '../control/input.jsx';

const Input = forwardRef(function Input(props, ref) {
  return (
    <CellControl
      className={props.className}
      labelledBy={props.labelledBy}
      readOnly={props.readOnly}
    >
      <InputControl
        id={props.id}
        labelledBy={props.labelledBy}
        name={props.name}
        readOnly={props.readOnly}
        ref={ref}
        required={props.required}
        validationMessage={props.validationMessage}
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
  /** Disable changes to the input control. */
  readOnly: PropTypes.bool,
  /** Require a value on the input control. */
  required: PropTypes.bool,
  /** A server-side validation message. */
  validationMessage: PropTypes.string,
};

Input.defaultProps = {
  className: undefined,
  readOnly: false,
  required: false,
  validationMessage: '',
};

export default Input;
