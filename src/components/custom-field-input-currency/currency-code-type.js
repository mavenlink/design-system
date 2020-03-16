import PropTypes from 'prop-types';
import currencyData from './currencies.js';

const currencyCodes = currencyData.ISO_4217.CcyTbl.CcyNtry.map(data => data.Ccy);

const CurrencyCodeType = PropTypes.oneOf(currencyCodes);

export default CurrencyCodeType;
