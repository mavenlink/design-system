import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
  useRef,
} from 'react';
import PropTypes from 'prop-types';
import styles from './list-option.css';

const ListOption = forwardRef(function ListOption(props, ref) {
  const [active, setActive] = useState(props.defaultActive);
  const [focusQueued, setFocusQueued] = useState(false);
  const rootRef = useRef();
  const className = props.selected ? styles.selected : styles.option;

  useImperativeHandle(ref, () => ({
    contains: (node) => {
      return rootRef.current.contains(node);
    },
    setActive: (bool) => {
      setFocusQueued(bool);
      setActive(bool);
    },
    value: props.value,
  }));

  useEffect(() => {
    if (focusQueued) {
      rootRef.current.focus();
    }
  });

  return (<li
    aria-selected={props.selected}
    className={className}
    role="option"
    ref={rootRef}
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
  value: PropTypes.any.isRequired, // eslint-disable-line react/forbid-prop-types
};

ListOption.defaultProps = {
  defaultActive: true,
  selected: false,
  title: undefined,
};

export default ListOption;
