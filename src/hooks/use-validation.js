import { useLayoutEffect, useState } from 'react';
import useMountedLayoutEffect from './use-mounted-layout-effect.js';

// Custom hook for managing the validation message on a control.
export default function useValidation(serverValidationMessage, inputRef) {
  const [validationMessage, setValidationMessage] = useState(serverValidationMessage);

  // On mount:
  // Only set server validation message on the DOM node.
  // The state should have been properly initialized.
  useLayoutEffect(() => {
    inputRef.current.setCustomValidity(serverValidationMessage);
  }, []);

  // Given a new server validation message:
  // Set the server validation message (if any)
  // and sync state to either server or client validation message.
  useMountedLayoutEffect(() => {
    inputRef.current.setCustomValidity(serverValidationMessage);
    setValidationMessage(inputRef.current.validationMessage);
  }, [serverValidationMessage]);

  // On blur (design spec):
  // Set the client validation message.
  const validate = () => {
    if (!inputRef.current) return;

    inputRef.current.setCustomValidity('');
    if (inputRef.current.validity.valid) {
      inputRef.current.setCustomValidity(serverValidationMessage);
      setValidationMessage(serverValidationMessage);
    } else {
      setValidationMessage(inputRef.current.validationMessage);
    }
  };

  return [validationMessage, validate];
}
