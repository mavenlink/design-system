import PropTypes from 'prop-types';
import React from 'react';
import Control from '../control/control.jsx';
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
      <Control
        labelledBy={props.labelledBy}
        validationMessage={props.validationMessage}
        validationMessageId={props.validationMessageId}
      >
        {props.children}
      </Control>
    </td>
  );
}

CellControl.propTypes = {
  children: PropTypes.node.isRequired,
  labelledBy: PropTypes.string.isRequired,
  validationMessage: PropTypes.string.isRequired,
  validationMessageId: PropTypes.string.isRequired,
};

CellControl.defaultProps = {};
