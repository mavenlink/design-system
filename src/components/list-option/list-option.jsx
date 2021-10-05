import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
  useRef,
} from 'react';
import PropTypes from 'prop-types';
import styles from './list-option.css';

const getClassName = (className, selected, visible, readOnly) => {
  return [className, styles.option]
    .concat(selected ? styles.selected : [])
    .concat(visible ? [] : styles.hidden)
    .concat(readOnly ? styles['read-only'] : [])
    .join(' ');
};

const ListOption = forwardRef(function ListOption(props, ref) {
  const [active, setActive] = useState(props.defaultActive);
  const [didMount, setDidMount] = useState(false);
  const [focusQueued, setFocusQueued] = useState(false);
  const [selected, setSelected] = useState(props.selected);
  const [visible, setVisible] = useState(true);
  const rootRef = useRef();
  const className = getClassName(props.className, selected, visible, props.readOnly);

  function onClick() {
    if (props.readOnly) return;
    setSelected(!selected);
  }

  function onKeyDown(event) {
    if (props.readOnly) return;
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
    setSelected: (bool) => {
      setSelected(bool);
    },
    setVisible: (bool) => {
      setVisible(bool);
    },
    value: props.value,
    rootRef,
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
      setFocusQueued(false);
    }
  });

  return (<li
    aria-disabled={props.readOnly}
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
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
  defaultActive: PropTypes.bool,
  onSelect: PropTypes.func,
  readOnly: PropTypes.bool,
  selected: PropTypes.bool,
  title: PropTypes.string,
  value: PropTypes.any.isRequired, // eslint-disable-line react/forbid-prop-types
};

ListOption.defaultProps = {
  className: undefined,
  defaultActive: true,
  onSelect: () => {},
  readOnly: false,
  selected: false,
  title: undefined,
};

export default ListOption;
