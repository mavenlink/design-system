import React from 'react';
import PropTypes from 'prop-types';
import styles from './listbox.css';

export default function Listbox(props) {
  return (
    <div className={styles.container}>
      { props.children }
    </div>
  );
}

Listbox.propTypes = {
  children: PropTypes.node,
};

Listbox.defaultProps = {
  children: null,
};
