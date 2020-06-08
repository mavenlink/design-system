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
    setActiveIndex(props.refs.findIndex(ref => ref.current.contains(clickEvent.target)));
  }

  function onFocus() {
    setActive(true);
  }

  function onKeyDown(keyEvent) {
    switch (keyEvent.key) {
      case 'ArrowLeft':
      case 'ArrowUp':
        if (activeIndex > 0) {
          setActiveIndex(activeIndex - 1);
        }
        break;
      case 'ArrowRight':
      case 'ArrowDown':
        if (activeIndex < props.refs.length - 1) {
          setActiveIndex(activeIndex + 1);
        }
        break;
      case 'End':
        setActiveIndex(props.refs.length - 1);
        break;
      case 'Home':
        setActiveIndex(0);
        break;
      default:
    }
  }

  return (
    <div
      className={styles['tag-list']}
      onClick={onClick}
      onFocus={onFocus}
      onKeyDown={onKeyDown}
      role="grid"
      tabIndex="-1"
    >
      {props.children}
    </div>
  );
}

TagList.propTypes = {
  children: PropTypes.node.isRequired,
  refs: PropTypes.arrayOf(PropTypes.shape({ current: PropTypes.any })).isRequired,
};

TagList.defaultProps = {};
