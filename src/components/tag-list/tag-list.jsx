import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';

export default function TagList(props) {
  const [active, setActive] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    props.refs.forEach((ref, index) => {
      if (active) {
        if (index === activeIndex) {
          ref.current.focus();
        }
      }
    });
  }, [active, activeIndex]);

  function onFocus() {
    setActive(true);
  }

  function onKeyDown(keyEvent) {
    switch (keyEvent.key) {
      case 'ArrowLeft':
      case 'ArrowUp':
        setActiveIndex(activeIndex - 1);
        break;
      case 'ArrowRight':
      case 'ArrowDown':
        setActiveIndex(activeIndex + 1);
        break;
      default:
    }
  }

  return (
    <div
      onFocus={onFocus}
      onKeyDown={onKeyDown}
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
