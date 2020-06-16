import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import styles from './list-option.css';

const ListOption = forwardRef(function ListOption(props, ref) {
  const className = props.selected ? styles.selected : styles.option;

  return (<li
    aria-selected={props.selected}
    className={className}
    role="option"
    ref={ref}
    tabIndex={-1}
    title={props.title}
  >
    {props.children}
  </li>);
});

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

export default ListOption;
