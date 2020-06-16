import React from 'react';
import PropTypes from 'prop-types';
import styles from './list-option.css';

export default function ListOption(props) {
  return (<li
    aria-selected={false}
    className={styles.selection}
    role="option"
    title={props.title}
  >
    {props.children}
  </li>);
}

ListOption.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string,
};

ListOption.defaultProps = {
  children: undefined,
  title: undefined,
};
