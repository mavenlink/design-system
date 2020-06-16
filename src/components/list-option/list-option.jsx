import React from 'react';
import PropTypes from 'prop-types';
import styles from './list-option.css';

export default function ListOption(props) {
  const className = props.selected ? styles.selected : styles.option;

  return (<li
    aria-selected={props.selected}
    className={className}
    role="option"
    title={props.title}
  >
    {props.children}
  </li>);
}

ListOption.propTypes = {
  children: PropTypes.node,
  selected: PropTypes.bool,
  title: PropTypes.string,
};

ListOption.defaultProps = {
  children: undefined,
  selected: false,
  title: undefined,
};
