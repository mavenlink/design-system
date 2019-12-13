import { useEffect, useState } from 'react';

// TODO: Figure out how to write tests for this, write them
export default function useNumberValidator(input) {
  const [valid, setValid] = useState(true);

  useEffect(() => {
    if (input === '') {
      setValid(true);
    } else {
      setValid(!!parseFloat(input));
    }
  });

  return valid;
}
