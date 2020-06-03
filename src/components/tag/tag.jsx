import PropTypes from 'prop-types';
import React, { useEffect, useRef, useState, useImperativeHandle } from 'react';
import styles from './tag.css';
import clearIcon from '../../svgs/icon-clear-small.svg';
import Icon from '../icon/index.js';
import { forwardRef } from 'react';

const Tag = forwardRef((props, ref) => {
  const [tabActiveStates, setTabActiveStates] = useState(props.readOnly ? [true] : [true, false]);
  const [inputHandled, setInputHandled] = useState(true);
  const buttonRef = useRef(null);
  const buttonId = `${props.id}-button`;
  const contentRef = useRef(null);
  const contentId = `${props.id}-content`;
  const refElements = [contentRef, buttonRef];

  function handleGridCellKeyDown(keyEvent) {
    switch (keyEvent.key) {
      case ' ':
        keyEvent.preventDefault();
        // falls through
      case 'Enter':
        if (tabActiveStates[1]) {
          props.onClear(keyEvent);
        }
        break;
      case 'ArrowDown':
        keyEvent.preventDefault();
        // falls through
      case 'ArrowRight':
        if (!props.readOnly && tabActiveStates[0] === true && tabActiveStates[1] === false) {
          setInputHandled(false);
          keyEvent.stopPropagation();
          setTabActiveStates([false, true]);
        }
        break;
      case 'ArrowUp':
        keyEvent.preventDefault();
        // falls through
      case 'ArrowLeft':
        if (!props.readOnly && tabActiveStates[0] === false && tabActiveStates[1] === true) {
          setInputHandled(false);
          setTabActiveStates([true, false]);
          keyEvent.stopPropagation();
        }
        break;
      default:
    }
  }

  function handleGridCellClick(clickEvent, gridIndex) {
    const newTabActiveStates = props.readOnly ? [false] : [false, false];

    newTabActiveStates[gridIndex] = true;
    setTabActiveStates(newTabActiveStates);
    setInputHandled(false);

    if (gridIndex === 1) {
      props.onClear(clickEvent);
    }
  }

  useEffect(() => {
    if (!inputHandled || props.isFocused) {
      const activeTabIndex = tabActiveStates.findIndex(activeState => activeState);

      refElements[activeTabIndex].current.focus();
      setInputHandled(true);
      console.log('useEffect for !inputHandled called', tabActiveStates);
    } else {
      console.log('called but not handled useEffect for !inputHandled');
    }
  }, [...tabActiveStates, props.isFocused]);

  useImperativeHandle(ref, () => {
    setTabActiveStates
  });

  return (
    <div
      className={props.readOnly ? styles['read-only-tag'] : styles.tag}
      id={props.id}
      role="row"
    >
      <span
        id={contentId}
        className={styles.content}
        ref={contentRef}
        role="gridcell"
        tabIndex={props.isFocused && tabActiveStates[0] ? '0' : '-1'}
        onClick={clickEvent => handleGridCellClick(clickEvent, 0)}
        onKeyDown={handleGridCellKeyDown}
      >
        {props.children}
      </span>
      {!props.readOnly &&
        <span
          className={styles['icon-wrapper']}
          ref={buttonRef}
          role="gridcell"
          tabIndex={props.isFocused && tabActiveStates[1] ? '0' : '-1'}
          onClick={clickEvent => handleGridCellClick(clickEvent, 1)}
          onKeyDown={handleGridCellKeyDown}
        >
          <Icon
            ariaLabel="Remove"
            ariaLabelledBy={`${buttonId} ${contentId}`}
            id={buttonId}
            name={clearIcon.id}
            size="small"
            stroke="skip"
            fill="skip"
            currentColor="skip"
            role="button"
          />
        </span>
      }
    </div>
  );
});

Tag.propTypes = {
  children: PropTypes.node.isRequired,
  id: PropTypes.string.isRequired,
  onClear: PropTypes.func,
  readOnly: PropTypes.bool,
};

Tag.defaultProps = {
  onClear: () => {},
  isFocused: true,
  readOnly: false,
};

export default Tag;
