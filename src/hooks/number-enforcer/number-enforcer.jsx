import React, { useEffect, useState } from 'react';

// This exists to satisfy Styleguidist, don't use it!
export function NumberEnforcer() {
  return (
    <div />
  );
}

export default function useNumberEnforcer(input, locale = 'en-US') {
  const [enforcedNumber, setEnforcedNumber] = useState('');
  const [valid, setValid] = useState(true);
  const numberI18n = new Intl.NumberFormat(locale);
  const sanitizedInput = input.replace(/[^0-9,.]/g, '');

  useEffect(() => {
    setValid(false);

    if (sanitizedInput === '' || sanitizedInput === undefined) {
      setEnforcedNumber('');
      setValid(true);
    } else {
      setEnforcedNumber(numberI18n.format(sanitizedInput));

      if (enforcedNumber === 'NaN') {
        setValid(false);
      }
    }
  });

  return [enforcedNumber, valid];
}
