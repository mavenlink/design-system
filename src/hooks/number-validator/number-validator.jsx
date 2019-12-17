import { useEffect, useState } from 'react';

const numberRegex = RegExp(/^-?(0|[1-9]\d*)?(\.\d+)?(?<=\d)$/);

export default function useNumberValidator(input) {
  const [valid, setValid] = useState(true);

  useEffect(() => {
    if (input === '' || input === undefined) {
      setValid(true);
    } else {
      setValid(numberRegex.test(input));
    }
  });

  return valid;
}
