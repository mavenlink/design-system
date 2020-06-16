import React from 'react';
import PropTypes from 'prop-types';
import styles from './listbox.css';

export default function Listbox(props) {
  return (
    <ul
      className={styles.container}
      role="listbox"
    >
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
