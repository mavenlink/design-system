import PropTypes from 'prop-types';
import React, { forwardRef } from 'react';
import CellControl from './cell-control.jsx';
import MoneyControl from '../control/money.jsx';
import currencyCodeType from '../../utils/currency-code-type.js';
import styles from './money.css';

const Money = forwardRef(function Money(props, ref) {
  const classNames = {
    container: styles.container,
    input: styles.input,
    // inputInvalid: styles.inputInvalid,
    ...props.classNames,
  };

  return (
    <CellControl
      className={classNames.container}
      labelledBy={props.labelledBy}
    >
      <MoneyControl
        className={classNames.input}
        currencyCode={props.currencyCode}
        id={props.id}
        onChange={props.onChange}
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

Money.propTypes = {
  classNames: PropTypes.shape({
    container: PropTypes.string,
    input: PropTypes.string,
    inputInvalid: PropTypes.string,
  }),
  currencyCode: currencyCodeType,
  id: PropTypes.string.isRequired,
  labelledBy: PropTypes.string.isRequired,
  /**
   * The handler is invoked for every native onchange event.
   * The handler will be invoked with the forwarded ref.
   */
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  readOnly: PropTypes.bool,
  required: PropTypes.bool,
  validationMessage: PropTypes.string,
  value: PropTypes.number,
};

Money.defaultProps = {
  classNames: {},
  currencyCode: 'USD',
  errorText: undefined,
  onChange: () => {},
  placeholder: undefined,
  readOnly: false,
  required: false,
  tooltip: undefined,
  validationMessage: '',
  value: undefined,
};

export default Money;
