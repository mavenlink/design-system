import React from 'react';
import PropTypes from 'prop-types';
import styles from './listbox.css';

export default function Listbox(props) {
  return (
    <ul role="listbox" className={styles.container}>
      { props.children }
    </ul>
  );
}

Listbox.propTypes = {
  children: PropTypes.node,
};

Listbox.defaultProps = {
  children: undefined,
};
