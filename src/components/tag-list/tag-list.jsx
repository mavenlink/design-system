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

  function onClick(clickEvent) {
    const nextActiveIndex = props.refs.findIndex(ref => ref.current.contains(clickEvent.target));
    if (nextActiveIndex !== -1) setActiveIndex(nextActiveIndex);
  }

  function onFocus() {
    setActive(true);
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
  refs: PropTypes.arrayOf(PropTypes.shape({ current: PropTypes.any })).isRequired,
};

TagList.defaultProps = {
  className: styles['tag-list'],
};
