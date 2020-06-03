import React, {
  useState,
} from 'react';
import PropTypes from 'prop-types';
import styles from './tag-list.css';
import { useRef } from 'react';
import { useEffect } from 'react';

export default function TagList(props) {
  const [focusIndex, setFocusIndex] = useState(0);

  useEffect(() => {
    props.refs.forEach((ref, index) => {
      ref.current && ref.current.setIsFocused(focusIndex === index);
    });
  }, [...props.refs.map(ref => ref.current), focusIndex]);

  function handleOnKeyDown(keyEvent) {
    switch (keyEvent.key) {
      case 'ArrowDown':
      case 'ArrowRight':
        setFocusIndex(focusIndex + 1);
        break;
      case 'ArrowUp':
      case 'ArrowLeft':
        setFocusIndex(focusIndex - 1);
        break;
    }
  }

  return (
    <div className={styles['tag-list']} onKeyDown={handleOnKeyDown}>
      {props.children}
    </div>
  );
}

TagList.propTypes = {
  // children: (props, propName, componentName) => {
  //   const prop = props[propName];
  //   const typeWhitelist = ['Tag', 'TagSkill'];

  //   let error = null;

  //   React.Children.forEach(prop, child => {
  //     if (!typeWhitelist.includes(child.type.name)) {
  //       error = new Error(`${componentName} only accepts children of types: ${typeWhitelist}\r\n Got: ${child.type}`);
  //     }
  //   });

  //   return error;
  // }
};

TagList.defaultProps = {
  children: undefined,
};
