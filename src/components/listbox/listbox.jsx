import React from 'react';
import PropTypes from 'prop-types';
import styles from './listbox.css';

export default function Listbox(props) {
  function onFocus() {
    props.refs[0].current.focus();
  }

  return (
    <ul
      className={styles.container}
      onFocus={onFocus}
      role="listbox"
    >
      { props.children }
    </ul>
  );
}

Listbox.propTypes = {
  children: PropTypes.node,
  refs: PropTypes.arrayOf(PropTypes.shape({ current: PropTypes.any })).isRequired,
};

Listbox.defaultProps = {
  children: undefined,
};
