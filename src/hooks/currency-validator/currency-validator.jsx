import React, { useEffect, useState } from 'react';

// https://stackoverflow.com/questions/3561493/is-there-a-regexp-escape-function-in-javascript
function escapeRegex(string) {
  return string.replace(/[-\\^$*+?.()|[\]{}]/g, '\\$&');
}

// This exists to satisfy Styleguidist, don't use it!
export function CurrencyValidator() {
  return (
    <div />
  );
}

export default function useCurrencyValidator(input, currencySymbol) {
  const currencyRegex = RegExp(`^${escapeRegex(currencySymbol)}[0-9]*((\\.|,)[0-9]{1,2})?$`);
  const [valid, setValid] = useState(true);

  useEffect(() => {
    if (input === '' || input === undefined) {
      setValid(true);
    } else {
      setValid(currencyRegex.test(input));
    }
  });

  return valid;
}
