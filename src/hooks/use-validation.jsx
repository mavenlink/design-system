import { useEffect, useState } from 'react';

export default function useValidation(error, readOnly, helpText, inputRef) {
  const [validationMessage, setValidationMessage] = useState('');
  const invalidDueToProps = error && !readOnly;

  useEffect(() => {
    if (!inputRef.current) return;

    if (!inputRef.current.validity.valid) {
      setValidationMessage(inputRef.current.validationMessage);
      return;
    }

    if (invalidDueToProps && helpText) {
      inputRef.current.setCustomValidity(helpText);
      setValidationMessage(helpText);
    } else {
      inputRef.current.setCustomValidity('');
      setValidationMessage('');
    }
  });

  return validationMessage;
}
