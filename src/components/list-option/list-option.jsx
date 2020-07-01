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
  const [didMount, setDidMount] = useState(false);
  const [focusQueued, setFocusQueued] = useState(false);
  const [selected, setSelected] = useState(props.selected);
  const rootRef = useRef();
  const className = props.selected ? styles.selected : styles.option;

  function onClick() {
    setSelected(!selected);
  }

  function onKeyDown(event) {
    switch (event.key) {
      case 'Enter':
        event.preventDefault();
        setSelected(!selected);
        break;
      default:
    }
  }

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
    setDidMount(true);
  }, []);

  useEffect(() => {
    if (!didMount) return;

    props.onSelect({ target: ref });
  }, [selected]);

  useEffect(() => {
    if (focusQueued) {
      rootRef.current.focus();
    }
  });

  return (<li
    aria-selected={selected}
    className={className}
    onClick={onClick}
    onKeyDown={onKeyDown}
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
  onSelect: PropTypes.func,
  selected: PropTypes.bool,
  title: PropTypes.string,
  value: PropTypes.any.isRequired, // eslint-disable-line react/forbid-prop-types
};

ListOption.defaultProps = {
  defaultActive: true,
  onSelect: () => {},
  selected: false,
  title: undefined,
};

export default ListOption;
