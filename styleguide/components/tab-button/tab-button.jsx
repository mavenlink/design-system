import PropTypes from 'prop-types';
import React from 'react';
import styles from './tab-button.css';

export default function TabButton({ name }) {
  if (name === 'rsg-usage') {
    return <h3 className={styles.heading}>Props</h3>;
  }

  return null;
}

TabButton.propTypes = {
  name: PropTypes.string.isRequired,
};
