import currencyMetaData from '../custom-field-input-currency/currency-meta-data.js';

function getLocale() {
  if (navigator && navigator.languages) {
    return navigator.languages[0];
  }

  return 'en-IN';
}

function initialInputValid(inputValue) {
  if (!inputValue) {
    return true;
  }

  return inputValue.toString()
    .split('.').length === 1;
}

function subunitToUnit(subunitValue, currencyCode) {
  if (subunitValue === undefined || subunitValue === null) return undefined;

  return subunitValue / (10 ** currencyMetaData[currencyCode].maximumFractionDigits);
}

function formatValue(unitValue, currencyCode) {
  if (unitValue === undefined || unitValue === null) return '';

  return new Intl.NumberFormat(getLocale(), {
    style: 'currency',
    currency: currencyCode,
    maximumFractionDigits: currencyMetaData[currencyCode].maximumFractionDigits,
  }).format(unitValue);
}

export { initialInputValid, subunitToUnit, formatValue };
