import PropTypes from 'prop-types';
import React, { forwardRef, useRef } from 'react';
import CellControl from './cell-control.jsx';
import SelectControl from '../control/select.jsx';
import styles from './select.css';

const Select = forwardRef(function Select(props, ref) {
  const refs = {
    container: useRef(),
  };

  return (
    <CellControl
      className={props.className}
      labelledBy={props.labelledBy}
      readOnly={props.readOnly}
      ref={refs.container}
    >
      <SelectControl
        classNames={{
          input: styles.input,
          invalidInput: styles.invalidInput,
        }}
        id={props.id}
        labelledBy={props.labelledBy}
        listOptionRefs={props.listOptionRefs}
        name={props.name}
        onChange={props.onChange}
        readOnly={props.readOnly}
        ref={ref}
        required={props.required}
        validationMessage={props.validationMessage}
        validationMessageTooltip
        value={props.value}
        wrapperRef={refs.container}
      >
        {props.children}
      </SelectControl>
    </CellControl>
  );
});

Select.propTypes = {
  children: PropTypes.func,
  className: PropTypes.string,
  /** A unique ID for the component. */
  id: PropTypes.string.isRequired,
  /** The ID of the column header. */
  labelledBy: PropTypes.string.isRequired,
  /** The list of refs for all its options. */
  listOptionRefs: PropTypes.arrayOf(PropTypes.shape({ current: PropTypes.any })).isRequired,
  /** See documentation on `FormControl#name` */
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  /** Disable changes to the input control. */
  readOnly: PropTypes.bool,
  /** Require a value on the input control. */
  required: PropTypes.bool,
  /** A server-side validation message. */
  validationMessage: PropTypes.string,
  /** The initial value of the cell */
  value: SelectControl.propTypes.value,
};

Select.defaultProps = {
  children: () => {},
  className: undefined,
  onChange: () => {},
  readOnly: false,
  required: false,
  validationMessage: '',
  value: SelectControl.defaultProps.value,
};

export default Select;
