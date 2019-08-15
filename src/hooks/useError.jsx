import React, { useState } from 'react';
import Icon from '../components/icon/icon';
import iconCautionSvg from '../svgs/icon-caution-fill.svg';
import styles from './useError.css';

const useError = (errorMessage) => {
  const [displayError, setDisplayError] = useState(errorMessage);
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
  return [
    getError,
    setError,
  ];
};

export default useError;
