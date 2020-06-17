import React, {
  forwardRef,
  useImperativeHandle,
  useState,
} from 'react';
import PropTypes from 'prop-types';
import styles from './list-option.css';

const ListOption = forwardRef(function ListOption(props, ref) {
  const [active, setActive] = useState(props.defaultActive);
  const className = props.selected ? styles.selected : styles.option;

  useImperativeHandle(ref, () => ({
    setActive,
  }));

  return (<li
    aria-selected={props.selected}
    className={className}
    role="option"
    ref={ref}
    tabIndex={active ? '0' : '-1'}
    title={props.title}
  >
    {props.children}
  </li>);
});

ListOption.propTypes = {
  children: PropTypes.node.isRequired,
  defaultActive: PropTypes.bool,
  selected: PropTypes.bool,
  title: PropTypes.string,
};

ListOption.defaultProps = {
  defaultActive: true,
  selected: false,
  title: undefined,
};

export default ListOption;
