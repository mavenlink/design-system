import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import PropTypes from 'prop-types';
import styles from './listbox.css';

const Listbox = forwardRef(function Listbox(props, forwardedRef) {
  const [active, setActive] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [didMount, setDidMount] = useState(false);
  const [value, setValue] = useState(props.value);
  const backupRef = useRef();
  const ref = forwardedRef || backupRef;

  const refIndexOf = target => props.refs.findIndex(optionRef => (
    optionRef.current && optionRef.current.contains(target)
  ));

  const optionsWasSelected = (toggledRefIndex) => {
    setValue(props.refs[toggledRefIndex].current.value);
  };

  function onFocus(event) {
    setActive(true);

    // Do not use `onClick` to manage `activeIndex`
    // For some reason, it will focus the first item before focusing the clicked item
    const nextActiveIndex = refIndexOf(event.target);

    if (nextActiveIndex !== -1) setActiveIndex(nextActiveIndex);
  }

  function onClick(event) {
    const selectedRefIndex = refIndexOf(event.target);
    if (selectedRefIndex !== -1) {
      optionsWasSelected(selectedRefIndex);
    }
  }

  function onKeyDown(keyEvent) {
    switch (keyEvent.key) {
      case 'ArrowLeft':
      case 'ArrowUp':
        if (activeIndex > 0) {
          keyEvent.preventDefault();
          setActiveIndex(activeIndex - 1);
        }
        break;
      case 'ArrowRight':
      case 'ArrowDown':
        if (activeIndex < props.refs.length - 1) {
          keyEvent.preventDefault();
          setActiveIndex(activeIndex + 1);
        }
        break;
      case 'End':
        keyEvent.preventDefault();
        setActiveIndex(props.refs.length - 1);
        break;
      case 'Enter': {
        keyEvent.preventDefault();
        optionsWasSelected(activeIndex);
        break;
      }
      case 'Home':
        keyEvent.preventDefault();
        setActiveIndex(0);
        break;
      default:
    }
  }

  useEffect(() => {
    if (active) {
      props.refs.forEach((optionRef, index) => {
        if (optionRef.current) optionRef.current.setActive(index === activeIndex);
      });
    }
  }, [active, activeIndex]);

  useEffect(() => {
    if (!didMount) return;

    props.onChange({ target: ref.current });
  }, [value]);

  useEffect(() => {
    setDidMount(true);
  }, []);

  useImperativeHandle(ref, () => ({
    focus: () => props.refs[activeIndex].current.setActive(true),
    value,
  }));

  return (
    <ul
      aria-labelledby={props.labelledBy}
      className={props.className}
      id={props.id}
      onClick={onClick}
      onFocus={onFocus}
      onKeyDown={onKeyDown}
      role="listbox"
    >
      { props.children }
    </ul>
  );
});

const ListOptionRefType = PropTypes.shape({
  current: PropTypes.shape({
    contains: PropTypes.func,
    setActive: PropTypes.func,
    value: PropTypes.any,
  }),
});

Listbox.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  id: PropTypes.string,
  labelledBy: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  refs: PropTypes.arrayOf(ListOptionRefType).isRequired,
  value: PropTypes.any, // eslint-disable-line react/forbid-prop-types
};

Listbox.defaultProps = {
  className: styles.container,
  id: undefined,
  children: undefined,
  onChange: () => {},
  value: undefined,
};

export default Listbox;
