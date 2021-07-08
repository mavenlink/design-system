import PropTypes from 'prop-types';
import React from 'react';
import styles from './cell-control.css';

export default function CellControl(props) {
  const classNames = {
    container: styles.container,
    validationMessage: styles['validation-message'],
  };

  return (
    <td
      aria-labelledby={props.labelledBy}
      className={classNames.container}
      role="gridcell"
    >
      {props.children}
      {!!props.validationMessage && (
        <span
          aria-hidden="true"
          aria-live="polite"
          className={classNames.validationMessage}
          id={props.validationMessageId}
        >
          {props.validationMessage}
        </span>
      )}
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
