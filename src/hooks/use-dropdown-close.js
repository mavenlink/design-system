import { useEffect } from 'react';

const useDropdownClose = (ref, opened, onClose) => {
  function onEvent(event) {
    if (ref.current && !ref.current.contains(event.target)) {
      onClose();
    }
  }

  useEffect(() => {
    if (!opened) return;

    document.addEventListener('mousedown', onEvent);
    document.addEventListener('focusin', onEvent);

    return () => {
      document.removeEventListener('mousedown', onEvent);
      document.removeEventListener('focusin', onEvent);
    };
  });
};

export default useDropdownClose;
