import PropTypes from 'prop-types';
import React from 'react';
import CellControl from '../cell-control/cell-control.jsx';

function Input(props) {
  return (
    <CellControl
      labelledBy={props.labelledBy}
    >
      <input />
    </CellControl>
  );
}

Input.propTypes = {
  /** The ID of the column header */
  labelledBy: PropTypes.string.isRequired,
};

Input.defaultProps = {
};

export default Input;
