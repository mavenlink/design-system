import PropTypes from 'prop-types';
import React from 'react';
import styles from './cell-control.css';

export default function CellControl(props) {
  const classNames = {
    container: styles.container,
  };

  return (
    <td
      aria-labelledby={props.labelledBy}
      className={classNames.container}
      role="gridcell"
    >
      {props.children}
    </td>
  );
}

CellControl.propTypes = {
  children: PropTypes.node.isRequired,
  /** The ID of the column header cell. */
  labelledBy: PropTypes.string.isRequired,
};

CellControl.defaultProps = {};
