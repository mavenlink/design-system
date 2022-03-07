import PropTypes from 'prop-types';
import React, { forwardRef, useState } from 'react';
import FormControl from '../form-control/form-control.jsx';
import Money from '../control/money.jsx';
import currencyCodeType from '../../utils/currency-code-type.js';
import useForwardedRef from '../../hooks/use-forwarded-ref.js';

const MoneyInput = forwardRef(function MoneyInput(props, forwardedRef) {
  const [validationMessage, setValidationMessage] = useState(props.validationMessage);
  const ref = useForwardedRef(forwardedRef);
  const ids = {
    label: `${props.id}-label`,
  };

  function onInvalid(event) {
    setValidationMessage(event.detail.validationMessage);
  }

  return (
    <FormControl
      id={props.id}
      label={props.label}
      labelId={ids.label}
      name={props.name}
      readOnly={props.readOnly}
      // ref={refs.control}
      required={props.required}
      tooltip={props.tooltip}
      validationMessage={validationMessage}
    >
      <Money
        className={props.className}
        currencyCode={props.currencyCode}
        id={props.id}
        name={props.name}
        onChange={props.onChange}
        onInvalid={onInvalid}
        placeholder={props.placeholder}
        readOnly={props.readOnly}
        required={props.required}
        ref={ref}
        validationMessage={props.validationMessage}
        value={props.value}
      />
    </FormControl>
  );
});

MoneyInput.propTypes = {
  className: PropTypes.string,
  currencyCode: currencyCodeType,
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  /**
   * The handler is invoked for every native onchange event.
   * The handler will be invoked with the forwarded ref.
   */
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  readOnly: PropTypes.bool,
  required: PropTypes.bool,
  tooltip: PropTypes.string,
  validationMessage: PropTypes.string,
  value: PropTypes.number,
};

MoneyInput.defaultProps = {
  className: undefined,
  currencyCode: 'USD',
  errorText: undefined,
  name: undefined,
  onChange: () => {},
  placeholder: undefined,
  readOnly: false,
  required: false,
  tooltip: undefined,
  validationMessage: '',
  value: undefined,
};

export default MoneyInput;
