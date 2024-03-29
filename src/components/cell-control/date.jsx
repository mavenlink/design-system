import PropTypes from 'prop-types';
import React, {
  forwardRef,
} from 'react';
import CellControl from './cell-control.jsx';
import DateControl from '../control/date.jsx';
import styles from './date.css';

const Date = forwardRef(function Date(props, ref) {
  const classNames = {
    container: undefined,
    input: styles.input,
    invalidInput: styles['invalid-input'],
    ...props.classNames,
  };

  return (
    <CellControl
      className={classNames.container}
      labelledBy={props.labelledBy}
      readOnly={props.readOnly}
    >
      <DateControl
        classNames={{
          input: classNames.input,
          invalidInput: classNames.invalidInput,
        }}
        id={props.id}
        labelledBy={props.labelledBy}
        max={props.max}
        min={props.min}
        onBlur={props.onBlur}
        onChange={props.onChange}
        onFocus={props.onFocus}
        placeholder={props.placeholder}
        readOnly={props.readOnly}
        required={props.required}
        ref={ref}
        validationMessage={props.validationMessage}
        value={props.value}
      />
    </CellControl>
  );
});

Date.propTypes = {
  classNames: PropTypes.shape({
    input: PropTypes.string,
    layout: PropTypes.shape({
      container: PropTypes.string,
      calendar: PropTypes.string,
    }),
  }),
  id: PropTypes.string.isRequired,
  labelledBy: PropTypes.string.isRequired,
  /** The latest date to accept in full-date format (i.e. yyyy-mm-dd) */
  max: PropTypes.string,
  /** The earliest date to accept in full-date format (i.e. yyyy-mm-dd) */
  min: PropTypes.string,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  placeholder: PropTypes.string,
  readOnly: PropTypes.bool,
  required: PropTypes.bool,
  validationMessage: PropTypes.string,
  /** A date in full-date format (i.e. yyyy-mm-dd) */
  value: PropTypes.string,
};

Date.defaultProps = {
  classNames: {},
  max: undefined,
  min: undefined,
  onBlur: () => {},
  onChange: undefined,
  onFocus: () => {},
  placeholder: undefined,
  readOnly: false,
  required: false,
  tooltip: undefined,
  validationMessage: '',
  value: undefined,
};

export default Date;
