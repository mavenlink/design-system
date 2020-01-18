import React, { useEffect, useState } from 'react';

// https://stackoverflow.com/questions/3561493/is-there-a-regexp-escape-function-in-javascript
function escapeRegex(string) {
  return string.replace(/[-\\^$*+?.()|[\]{}]/g, '\\$&');
}

// This exists to satisfy Styleguidist, don't use it!
export function NumberEnforcer() {
  return (
    <div />
  );
}

export default function useNumberEnforcer(input, locale = 'en-US') {
  const [enforcedNumber, setEnforcedNumber] = useState('');
  const [valid, setValid] = useState(true);
  const numberI18n = new Intl.NumberFormat(locale, { style: 'currency', currency: 'EUR' });
  const i18nOptions = numberI18n.resolvedOptions();

  const separator = numberI18n.format(1234)[1];
  const radix = numberI18n.format(1.2)[1];

  const sanitizeRegex = new RegExp(`[^0-9${escapeRegex(separator)}${escapeRegex(radix)}-]`, 'g');
  const separatorRegex = new RegExp(`${escapeRegex(separator)}`, 'g');
  const decimalRegex = new RegExp(`${escapeRegex(radix)}`, 'g');

  const sanitizedInput = input.replace(sanitizeRegex, '');
  const removeSeparator = sanitizedInput.replace(separatorRegex, '');
  let decimalConversion = removeSeparator.replace(decimalRegex, '.');

  useEffect(() => {
    setValid(false);

    if (sanitizedInput === '' || sanitizedInput === undefined) {
      setEnforcedNumber('');
      setValid(true);
    } else {
      if (decimalConversion === '-') {
        decimalConversion = '-0';
      }

      const convertedToDecimal = parseFloat(decimalConversion);
      setEnforcedNumber(numberI18n.format(convertedToDecimal));

      if (enforcedNumber !== 'NaN') {
        setValid(true);
      }
    }
  });

  return [enforcedNumber, valid];
}
