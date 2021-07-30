import PropTypes from 'prop-types';
import React from 'react';
import CellControl from './cell-control.jsx';
import SelectControl from '../control/select.jsx';

function Select(props) {
  return (
    <CellControl
      labelledBy={props.labelledBy}
      readOnly={props.readOnly}
    >
      <SelectControl
        id={props.id}
        labelledBy={props.labelledBy}
        listOptionRefs={props.listOptionRefs}
        name={props.name}
        readOnly={props.readOnly}
        required={props.required}
        validationMessage={props.validationMessage}
      >
        {props.children}
      </SelectControl>
    </CellControl>
  );
}

Select.propTypes = {
  children: PropTypes.node,
  /** A unique ID for the component. */
  id: PropTypes.string.isRequired,
  /** The ID of the column header. */
  labelledBy: PropTypes.string.isRequired,
  /** The list of refs for all its options. */
  listOptionRefs: PropTypes.arrayOf(PropTypes.shape({ current: PropTypes.any })).isRequired,
  /** See documentation on `FormControl#name` */
  name: PropTypes.string.isRequired,
  /** Disable changes to the input control. */
  readOnly: PropTypes.bool,
  /** Require a value on the input control. */
  required: PropTypes.bool,
  /** A server-side validation message. */
  validationMessage: PropTypes.string,
};

Select.defaultProps = {
  children: undefined,
  readOnly: false,
  required: false,
  validationMessage: '',
};

export default Select;
