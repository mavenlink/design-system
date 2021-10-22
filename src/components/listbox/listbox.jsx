import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react';
import PropTypes from 'prop-types';
import styles from './listbox.css';
import useForwardedRef from '../../hooks/use-forwarded-ref.js';

const Listbox = forwardRef(function Listbox(props, forwardedRef) {
  const [active, setActive] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [didMount, setDidMount] = useState(false);
  const [value, setValue] = useState(props.value);
  const ref = useForwardedRef(forwardedRef);

  const refIndexOf = target => props.refs.findIndex(optionRef => (
    optionRef.current && optionRef.current.contains(target)
  ));

  function onFocus(event) {
    setActive(true);

    // Do not use `onClick` to manage `activeIndex`
    // For some reason, it will focus the first item before focusing the clicked item
    const nextActiveIndex = refIndexOf(event.target);

    if (nextActiveIndex !== -1) setActiveIndex(nextActiveIndex);
  }

  function onSelect(event) {
    if (event.target.current.value === value) {
      setValue(undefined);
    } else {
      setValue(event.target.current.value);
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
    contains: (element) => {
      return props.refs.some((r) => {
        return r.current && r.current.contains(element);
      });
    },
    value,
  }));

  return (
    <ul
      aria-labelledby={props.labelledBy}
      className={props.className}
      id={props.id}
      onFocus={onFocus}
      onKeyDown={onKeyDown}
      role="listbox"
    >
      {props.children({ onSelect })}
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
  children: PropTypes.func,
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
  children: () => {},
  onChange: () => {},
  value: undefined,
};

export default Listbox;
