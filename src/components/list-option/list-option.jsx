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
  const [selected, setSelected] = useState(props.selected);
  const rootRef = useRef();
  const className = selected ? styles.selected : styles.option;

  useImperativeHandle(ref, () => ({
    contains: (node) => {
      return rootRef.current.contains(node);
    },
    optionData: props.value,
    setActive: (bool) => {
      setFocusQueued(bool);
      setActive(bool);
    },
    toggleSelected: () => {
      const isSelected = !selected;
      setSelected(isSelected);
      return isSelected;
    },
  }));

  useEffect(() => {
    if (focusQueued) {
      rootRef.current.focus();
    }
  });

  return (<li
    aria-selected={selected}
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
  value: PropTypes.string.isRequired,
};

ListOption.defaultProps = {
  defaultActive: true,
  selected: false,
  title: undefined,
};

export default ListOption;
