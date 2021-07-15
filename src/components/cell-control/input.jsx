import PropTypes from 'prop-types';
import React from 'react';
import CellControl from '../cell-control/cell-control.jsx';
import InputControl from '../control/input.jsx';

function Input(props) {
  return (
    <CellControl
      labelledBy={props.labelledBy}
      readOnly={props.readOnly}
    >
      <InputControl
        id={props.id}
        labelledBy={props.labelledBy}
        readOnly={props.readOnly}
        validationMessage={props.validationMessage}
      />
    </CellControl>
  );
}

Input.propTypes = {
  /** A unique ID for the component. */
  id: PropTypes.string.isRequired,
  /** The ID of the column header. */
  labelledBy: PropTypes.string.isRequired,
  /** Disable changes to the input control. */
  readOnly: PropTypes.bool,
  /** A server-side validation message. */
  validationMessage: PropTypes.string,
};

Input.defaultProps = {
  readOnly: false,
  validationMessage: '',
};

export default Input;
