import { useEffect, useState } from 'react';

export default function useValidation(errorText, inputRef) {
  const [validationMessage, setValidationMessage] = useState('');

  useEffect(() => {
    if (!inputRef.current) return;

    inputRef.current.setCustomValidity(errorText);
    setValidationMessage(errorText);
  }, [errorText]);

  useEffect(() => {
    if (!inputRef.current) return;

    if (inputRef.current.value && !inputRef.current.validity.valid) {
      setValidationMessage(inputRef.current.validationMessage);
    }
  });

  const validate = () => {
    if (!inputRef.current) return;

    inputRef.current.setCustomValidity('');
    if (!inputRef.current.validity.valid) {
      setValidationMessage(inputRef.current.validationMessage);
    } else {
      inputRef.current.setCustomValidity(errorText);
      setValidationMessage(errorText);
    }
  };

  return [validationMessage, validate];
}
