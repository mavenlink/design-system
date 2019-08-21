import React, { useState } from 'react';
import Icon from '../components/icon/icon.jsx';
import iconCautionSvg from '../svgs/icon-caution-fill.svg';
import styles from './useError.css';

const useError = (validator) => {
  const [displayError, setDisplayError] = useState('');

  const setError = (msg) => {
    setDisplayError(msg);
  };

  const getError = () => {
    if (displayError) {
      return (
        <span className={styles['error-message']}>{displayError} <Icon size="small" className={styles['error-icon']} currentColor="caution" name={iconCautionSvg.id} /></span>
      );
    }
    return '';
  };

  const validate = (files) => {
    if (!validator) {
      return '';
    }
    return validator.call(null, files);
  };

  return [
    getError,
    setError,
    validate,
  ];
};

export default useError;
