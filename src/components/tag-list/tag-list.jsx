import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';

export default function TagList(props) {
  const [active, setActive] = useState(false);
  const [activeIndex] = useState(0);

  useEffect(() => {
    props.refs.forEach((ref, index) => {
      if (active) {
        if (index === activeIndex) {
          ref.current.focus();
        }
      }
    });
  }, [active, activeIndex]);

  function onFocusHandler() {
    setActive(true);
  }

  return (
    <div
      onFocus={onFocusHandler}
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
