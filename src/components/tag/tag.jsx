import PropTypes from 'prop-types';
import React, { useEffect, useRef, useState, useImperativeHandle } from 'react';
import styles from './tag.css';
import clearIcon from '../../svgs/icon-clear-small.svg';
import Icon from '../icon/index.js';
import { forwardRef } from 'react';

const Tag = forwardRef((props, ref) => {
  let [tabActiveStates, setTabActiveStates] = useState([true, false]);
  const [inputHandled, setInputHandled] = useState(true);
  const iconElement = useRef(null);
  const titleElement = useRef(null);
  const refElements = [titleElement, iconElement];

  function handleGridCellKeyDown(keyEvent) {
    switch (keyEvent.key) {
      case ' ':
      case 'Enter':
        if (tabActiveStates[1]) {
          props.onClear(keyEvent);
        }
        break;
      case 'ArrowRight':
      case 'ArrowDown':
        setInputHandled(false);
        setTabActiveStates([false, true]);
        break;
      case 'ArrowLeft':
      case 'ArrowUp':
        setInputHandled(false);
        setTabActiveStates([true, false]);
        break;
      default:
    }
  }

  function handleGridCellClick(clickEvent, gridIndex) {
    const newTabActiveStates = [false, false];

    newTabActiveStates[gridIndex] = true;
    setTabActiveStates(newTabActiveStates);
    setInputHandled(false);

    if (gridIndex === 1) {
      props.onClear(clickEvent);
    }
  }

  useEffect(() => {
    if (!inputHandled) {
      const activeTabIndex = tabActiveStates.findIndex(activeState => activeState);

      refElements[activeTabIndex].current.focus();
      setInputHandled(true);
    }
  }, [...tabActiveStates]);

  useImperativeHandle(ref, () => {
    setTabActiveStates
  });

  return (
    <div className={styles.tag} role="row">
      <span
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
          <Icon name={clearIcon.id} size="small" stroke="skip" fill="skip" currentColor="skip" role="button" />
        </span>
      }
    </div>
  );
});

Tag.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
  ]).isRequired,
  onClear: PropTypes.func,
  readOnly: PropTypes.bool,
};

Tag.defaultProps = {
  onClear: () => {},
  readOnly: false,
};

export default Tag;
