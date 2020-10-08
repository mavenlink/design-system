import { useEffect, useState } from 'react';

export default function useValidation(readOnly, errorText, inputRef) {
  const [validationMessage, setValidationMessage] = useState('');

  useEffect(() => {
    if (!inputRef.current) return;

    if (errorText) {
      inputRef.current.setCustomValidity(errorText);
      setValidationMessage(errorText);
      return;
    }

    inputRef.current.setCustomValidity('');
    if (!inputRef.current.validity.valid) {
      setValidationMessage(inputRef.current.validationMessage);
    } else {
      setValidationMessage('');
    }
  });

  return validationMessage;
}
