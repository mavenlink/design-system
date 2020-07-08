import { useEffect, useState } from 'react';

export default function useValidation(invalidDueToProps, helpText, inputRef) {
  const [validationMessage, setValidationMessage] = useState('');

  useEffect(() => {
    if (!inputRef.current) return;

    if (!inputRef.current.validity.valid) {
      setValidationMessage(inputRef.current.validationMessage);
      return;
    }

    if (invalidDueToProps()) {
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
