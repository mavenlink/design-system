import PropTypes from 'prop-types';
import React from 'react';
import CellControl from '../cell-control/cell-control.jsx';
import styles from './input.css';

function Input(props) {
  const classNames = {
    input: styles.input,
  };

  return (
    <CellControl
      labelledBy={props.labelledBy}
    >
      <input
        className={classNames.input}
        readOnly={props.readOnly}
      />
    </CellControl>
  );
}

Input.propTypes = {
  /** The ID of the column header */
  labelledBy: PropTypes.string.isRequired,
  readOnly: PropTypes.bool,
};

Input.defaultProps = {
  readOnly: false,
};

export default Input;
