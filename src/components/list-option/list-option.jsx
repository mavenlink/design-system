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
    tabIndex={props.defaultActive ? '0' : '-1'}
    title={props.title}
  >
    {props.children}
  </li>);
});

ListOption.propTypes = {
  children: PropTypes.node,
  defaultActive: PropTypes.bool,
  selected: PropTypes.bool,
  title: PropTypes.string,
};

ListOption.defaultProps = {
  children: undefined,
  defaultActive: true,
  selected: false,
  title: undefined,
};

export default ListOption;
