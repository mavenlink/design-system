import PropTypes from 'prop-types';
import React, { useEffect, useRef, useState } from 'react';
import styles from './tag.css';
import clearIcon from '../../svgs/icon-clear-small.svg';
import Icon from '../icon/index.js';

export default function Tag(props) {
  const [tabActiveStates, setTabActiveStates] = useState(props.readOnly ? [true] : [true, false]);
  const [inputHandled, setInputHandled] = useState(true);
  const iconElement = useRef(null);
  const iconId = `${props.id}-button`;
  const titleElement = useRef(null);
  const titleId = `${props.id}-content`;
  const refElements = [titleElement, iconElement];

  function handleGridCellKeyDown(keyEvent) {
    switch (keyEvent.key) {
      case ' ':
        keyEvent.preventDefault();
        // falls through
      case 'Enter':
        if (tabActiveStates[1]) {
          props.onClear(keyEvent.nativeEvent);
        }
        break;
      case 'ArrowDown':
        keyEvent.preventDefault();
        // falls through
      case 'ArrowRight':
        setInputHandled(false);
        setTabActiveStates(props.readOnly ? [true] : [false, true]);
        break;
      case 'ArrowUp':
        keyEvent.preventDefault();
        // falls through
      case 'ArrowLeft':
        setInputHandled(false);
        setTabActiveStates(props.readOnly ? [true] : [true, false]);
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
      props.onClear(clickEvent.nativeEvent);
    }
  }

  useEffect(() => {
    if (!inputHandled) {
      const activeTabIndex = tabActiveStates.findIndex(activeState => activeState);

      refElements[activeTabIndex].current.focus();
      setInputHandled(true);
    }
  }, [...tabActiveStates]);

  return (
    <div
      className={props.readOnly ? styles['read-only-tag'] : styles.tag}
      id={props.id}
      role="row"
    >
      <span
        id={titleId}
        className={styles.content}
        ref={titleElement}
        role="gridcell"
        tabIndex={tabActiveStates[0] ? '0' : '-1'}
        onClick={clickEvent => handleGridCellClick(clickEvent, 0)}
        onKeyDown={handleGridCellKeyDown}
      >
        {props.children}
      </span>
      {!props.readOnly &&
        <span
          className={styles['icon-wrapper']}
          ref={iconElement}
          role="gridcell"
          tabIndex={tabActiveStates[1] ? '0' : '-1'}
          onClick={clickEvent => handleGridCellClick(clickEvent, 1)}
          onKeyDown={handleGridCellKeyDown}
        >
          <Icon
            ariaLabel="Remove"
            ariaLabelledBy={`${iconId} ${titleId}`}
            id={iconId}
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
}

Tag.propTypes = {
  children: PropTypes.node.isRequired,
  id: PropTypes.string.isRequired,
  onClear: PropTypes.func,
  readOnly: PropTypes.bool,
};

Tag.defaultProps = {
  onClear: () => {},
  readOnly: false,
};
