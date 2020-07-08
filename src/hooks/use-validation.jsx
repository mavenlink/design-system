import { useEffect, useState } from 'react';

export default function useValidation(readOnly, helpText, inputRef) {
  const [validationMessage, setValidationMessage] = useState('');

  useEffect(() => {
    if (!inputRef.current) return;

    if (!inputRef.current.validity.valid) {
      setValidationMessage(inputRef.current.validationMessage);
      return;
    }

    if (!readOnly && helpText) {
      inputRef.current.setCustomValidity(helpText);
      setValidationMessage(helpText);
    } else {
      inputRef.current.setCustomValidity('');
      setValidationMessage('');
    }
  });

  return validationMessage;
}
