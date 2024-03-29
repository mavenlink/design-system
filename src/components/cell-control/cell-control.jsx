import PropTypes from 'prop-types';
import React, { forwardRef } from 'react';
import styles from './cell-control.css';

const CellControl = forwardRef(function CellControl(props, ref) {
  return (
    <td
      aria-labelledby={props.labelledBy}
      className={props.className}
      ref={ref}
      role="gridcell"
    >
      {props.children}
    </td>
  );
});

CellControl.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
  /** The ID of the column header cell. */
  labelledBy: PropTypes.string.isRequired,
};

CellControl.defaultProps = {
  className: styles.container,
};

export default CellControl;
