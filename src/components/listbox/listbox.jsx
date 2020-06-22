import React from 'react';
import PropTypes from 'prop-types';
import styles from './listbox.css';

export default function Listbox(props) {
  return (
    <ul role="listbox" className={props.className}>
      { props.children }
    </ul>
  );
}

Listbox.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};

Listbox.defaultProps = {
  className: styles.container,
  children: undefined,
};
