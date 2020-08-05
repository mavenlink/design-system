import { useEffect } from 'react';

const useDropdownClose = (ref, dropdownOpen, handleDropdownClose) => {
  function handleClickOutside(event) {
    console.log(!!ref.current);
    console.log(!ref.current.contains(event.target));

    if ((ref.current && !ref.current.contains(event.target))) {
      handleDropdownClose();
    }
  }

  useEffect(() => {
    if (dropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('focusin', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('focusin', handleClickOutside);
    };
  }, [ref.current, dropdownOpen]);
};

export default useDropdownClose;
