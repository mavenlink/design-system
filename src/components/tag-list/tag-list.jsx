import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import styles from './tag-list.css';

export default function TagList(props) {
  const [active, setActive] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    props.refs.forEach((ref, index) => {
      if (active) {
        ref.current.setIsActive(index === activeIndex);
      }
    });
  }, [active, activeIndex]);

  function onClick(event) {
    const nextActiveIndex = props.refs.findIndex(ref => ref.current.contains(event.target));

    if (nextActiveIndex === -1) {
      props.onClick();
    }
  }

  function onFocus(event) {
    const nextActiveIndex = props.refs.findIndex(ref => ref.current.contains(event.target));

    if (nextActiveIndex !== -1) {
      setActive(true);
      setActiveIndex(nextActiveIndex);
    }
  }

  function onKeyDown(event) {
    if (event.target.tagName !== 'INPUT') {
      switch (event.key) {
        case 'ArrowLeft':
        case 'ArrowUp':
          if (activeIndex > 0) {
            const newActiveIndex = activeIndex - 1;
            event.preventDefault();
            setActiveIndex(newActiveIndex);
            props.refs[newActiveIndex].current.setTabActiveStates([false, true]);
          }
          break;
        case 'ArrowRight':
        case 'ArrowDown':
          if (activeIndex < props.refs.length - 1) {
            const newActiveIndex = activeIndex + 1;
            event.preventDefault();
            setActiveIndex(newActiveIndex);
            props.refs[newActiveIndex].current.setTabActiveStates([true, false]);
          }
          break;
        case 'End':
          event.preventDefault();
          setActiveIndex(props.refs.length - 1);
          break;
        case 'Home':
          event.preventDefault();
          setActiveIndex(0);
          break;
        default:
      }
    }
  }

  return (
    <div // eslint-disable-line jsx-a11y/interactive-supports-focus
      className={props.className}
      aria-labelledby={props.labelledBy}
      onClick={onClick}
      onFocus={onFocus}
      onKeyDown={onKeyDown}
      role="grid"
    >
      {props.children}
    </div>
  );
}

TagList.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
  labelledBy: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  refs: PropTypes.arrayOf(PropTypes.shape({ current: PropTypes.any })).isRequired,
};

TagList.defaultProps = {
  className: styles['tag-list'],
  onClick: () => {},
};
