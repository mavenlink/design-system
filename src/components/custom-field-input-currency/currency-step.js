import currencyData from './currencies.js';

const currencySteps = {};

currencyData.ISO_4217.CcyTbl.CcyNtry.forEach((country) => {
  const countryData = {
    maximumFractionDigits: parseInt(country.CcyMnrUnts),
  };

  if (country.CcyMnrUnts === 0 || country.CcyMnrUnts === 'N/A') {
    countryData.step = 1;
    return;
  }

  countryData.step = 1 / (10 ** countryData.maximumFractionDigits);

  currencySteps[country.Ccy] = countryData;
});

export default currencySteps;
