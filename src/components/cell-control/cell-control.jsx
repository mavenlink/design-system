import PropTypes from 'prop-types';
import React from 'react';

export default function CellControl(props) {
  return (
    <td
      aria-labelledby={props.labelledBy}
      role="gridcell"
    >
      {props.children}
    </td>
  );
}

CellControl.propTypes = {
  children: PropTypes.node.isRequired,
  labelledBy: PropTypes.string.isRequired,
};

CellControl.defaultProps = {
  validationMessage: '',
  readOnly: false,
};
