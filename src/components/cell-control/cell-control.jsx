import PropTypes from 'prop-types';
import React, { forwardRef } from 'react';
import styles from './cell-control.css';

const CellControl = forwardRef(function CellControl(props, ref) {
  const classNames = {
    container: styles.container,
  };

  return (
    <td
      aria-labelledby={props.labelledBy}
      className={classNames.container}
      ref={ref}
      role="gridcell"
    >
      {props.children}
    </td>
  );
});

CellControl.propTypes = {
  children: PropTypes.node.isRequired,
  /** The ID of the column header cell. */
  labelledBy: PropTypes.string.isRequired,
};

CellControl.defaultProps = {};

export default CellControl;
