import React from 'react';
import PropTypes from 'prop-types';
import styles from './tag-list.css';
import { useRef } from 'react';

export default function TagList(props) {
  // const childRefs = props.children.map(child => {
  //   console.log(child);
  //   useRef(child);
  // });

  // childRefs.forEach(childRef => {
  //   console.log(childRef);
  //   if (childRef) {
  //     childRef.current.setTabActiveState([false, false]);
  //     console.log('called');
  //   }
  // });

  // return (
  //   <div className={styles['tag-list']}>
  //     {props.children.map((child) => React.cloneElement(child, { tabIndex: '-1' }))}
  //   </div>
  // );

  const lastFocusedTagIndex = 0;

  return (
    <div className={styles['tag-list']}>
      {props.children(lastFocusedTagIndex)}
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
