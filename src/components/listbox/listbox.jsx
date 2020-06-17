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
        ref.current.setActive(index === activeIndex);
      });
    }
  });

  function onClick(event) {
    const nextActiveIndex = props.refs.findIndex(ref => (
      ref.current.contains(event.target)
    ));

    setActiveIndex(nextActiveIndex);
  }

  function onFocus() {
    setActive(true);

    // const nextActiveIndex = props.refs.findIndex(ref => (
    //   ref.current.contains(event.target)
    // ));

    // if (nextActiveIndex !== -1) setActiveIndex(nextActiveIndex);
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
      className={styles.container}
      onClick={onClick}
      onFocus={onFocus}
      onKeyDown={onKeyDown}
      role="listbox"
    >
      { props.children }
    </ul>
  );
}

Listbox.propTypes = {
  children: PropTypes.node,
  refs: PropTypes.arrayOf(PropTypes.shape({ current: PropTypes.any })).isRequired,
};

Listbox.defaultProps = {
  children: undefined,
};
