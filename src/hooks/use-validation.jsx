import { useEffect, useState } from 'react';

function isInvalid(error, readOnly) {
  return error && !readOnly;
}

export default function useValidation(error, readOnly, helpText, inputRef) {
  const [validationMessage, setValidationMessage] = useState('');

  useEffect(() => {
    if (!inputRef.current) return;

    if (!inputRef.current.validity.valid) {
      setValidationMessage(inputRef.current.validationMessage);
      return;
    }

    if (isInvalid(error, readOnly)) {
      if (helpText) {
        inputRef.current.setCustomValidity(helpText);
        setValidationMessage(helpText);
      } else {
        setValidationMessage(inputRef.current.validationMessage);
      }
    } else {
      inputRef.current.setCustomValidity('');
      setValidationMessage('');
    }
  });

  return validationMessage;
}
