import { useEffect, useState } from 'react';

export default function useValidation(readOnly, helpText, inputRef, checkedValidity) {
  const [validationMessage, setValidationMessage] = useState('');

  useEffect(() => {
    if (!inputRef.current) return;

    if (!inputRef.current.validity.valid && !inputRef.current.validity.customError) {
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
  }, [readOnly, helpText, checkedValidity]);

  return validationMessage;
}
