import React, {
  useEffect,
  useState,
} from 'react';
import PropTypes from 'prop-types';
import styles from './listbox.css';

export default function Listbox(props) {
  const [active, setActive] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (active) {
      props.refs.forEach((ref, index) => {
        if (ref.current) ref.current.setActive(index === activeIndex);
      });
    }
  });

  function onFocus(event) {
    setActive(true);

    // Do not use `onClick` to manage `activeIndex`
    // For some reason, it will focus the first item before focusing the clicked item
    const nextActiveIndex = props.refs.findIndex(ref => (
      ref.current && ref.current.contains(event.target)
    ));

    if (nextActiveIndex !== -1) setActiveIndex(nextActiveIndex);
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

  return (
    <ul
      aria-labelledby={props.labelledBy}
      className={props.className}
      onFocus={onFocus}
      onKeyDown={onKeyDown}
      role="listbox"
    >
      { props.children }
    </ul>
  );
}

Listbox.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  labelledBy: PropTypes.string.isRequired,
  refs: PropTypes.arrayOf(PropTypes.shape({ current: PropTypes.any })).isRequired,
};

Listbox.defaultProps = {
  className: styles.container,
  children: undefined,
};
