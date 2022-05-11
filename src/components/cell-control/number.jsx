import React from 'react';
import PropTypes from 'prop-types';
import CellControl from '../cell-control/cell-control.jsx';
import NumberControl from '../control/number.jsx';
import styles from './number.css';

const Number = React.forwardRef((props, ref) => {
  const classNames = {
    container: styles.container,
    input: styles.input,
    ...props.classNames,
  };

  return (
    <CellControl
      className={classNames.container}
      labelledBy={props.labelledBy}
    >
      <NumberControl
        className={classNames.input}
        id={props.id}
        onChange={props.onChange}
        placeholder={props.placeholder}
        onFocus={event => props.onEnterCell(event.target.value)}
        onBlur={event => props.onExitCell(event.target.value)}
        readOnly={props.readOnly}
        ref={ref}
        required={props.required}
        step={props.step}
        validationMessage={props.validationMessage}
        value={props.value}
      />
    </CellControl>
  );
});

Number.propTypes = {
  classNames: PropTypes.shape({
    container: PropTypes.string,
    input: PropTypes.string,
  }),
  id: PropTypes.string.isRequired,
  labelledBy: PropTypes.string.isRequired,
  /**
   * The handler is invoked for every native onchange event.
   * **Beware:** According to the HTML spec, the `event.target.value` is
   * an empty string when the input is invalid.
   */
  onChange: PropTypes.func,
  onEnterCell: PropTypes.func,
  onExitCell: PropTypes.func,
  placeholder: PropTypes.string,
  readOnly: PropTypes.bool,
  required: PropTypes.bool,
  step: PropTypes.number,
  validationMessage: PropTypes.string,
  value: PropTypes.number,
};

Number.defaultProps = {
  classNames: {},
  onChange: () => {},
  onEnterCell: () => {},
  onExitCell: () => {},
  placeholder: undefined,
  readOnly: false,
  required: false,
  step: 1,
  tooltip: undefined,
  validationMessage: '',
  value: undefined,
};

export default Number;
