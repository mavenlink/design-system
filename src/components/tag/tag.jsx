import PropTypes from 'prop-types';
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import styles from './tag.css';
import clearIcon from '../../svgs/icon-clear-small.svg';
import Icon from '../icon/index.js';

const Tag = forwardRef(function Tag(props, forwardedRef) {
  const [focusQueued, setFocusQueued] = useState(false);
  const [isActive, setIsActive] = useState(props.defaultActive);
  const [tabActiveStates, setTabActiveStates] = useState(props.readOnly ? [true] : [true, false]);
  const buttonRef = useRef(null);
  const buttonId = `${props.id}-button`;
  const contentRef = useRef(null);
  const contentId = `${props.id}-content`;
  const backupRef = useRef();
  const ref = forwardedRef || backupRef;
  const refElements = [contentRef, buttonRef];
  const rootRef = useRef();

  function handleGridCellKeyDown(keyEvent) {
    switch (keyEvent.key) {
      case ' ':
      case 'Enter':
        if (tabActiveStates[1]) {
          keyEvent.preventDefault();
          props.onRemove({ target: ref.current });
        }
        break;
      case 'ArrowDown':
      case 'ArrowRight':
        if (!props.readOnly && tabActiveStates[0] === true && tabActiveStates[1] === false) {
          keyEvent.preventDefault();
          keyEvent.stopPropagation();
          setFocusQueued(true);
          setTabActiveStates([false, true]);
        }
        break;
      case 'ArrowUp':
      case 'ArrowLeft':
        if (!props.readOnly && tabActiveStates[0] === false && tabActiveStates[1] === true) {
          keyEvent.preventDefault();
          keyEvent.stopPropagation();
          setFocusQueued(true);
          setTabActiveStates([true, false]);
        }
        break;
      default:
    }
  }

  function handleGridCellClick(event, gridIndex) {
    const newTabActiveStates = props.readOnly ? [false] : [false, false];

    newTabActiveStates[gridIndex] = true;
    setTabActiveStates(newTabActiveStates);
    setFocusQueued(true);

    if (gridIndex === 1) {
      event.preventDefault();
      props.onRemove({ target: ref.current });
    }
  }

  useEffect(() => {
    if (focusQueued) {
      const activeTabIndex = tabActiveStates.findIndex(activeState => activeState);

      refElements[activeTabIndex].current.focus();
      setFocusQueued(false);
    }
  }, [focusQueued, isActive, ...tabActiveStates]);

  useImperativeHandle(ref, () => ({
    setIsActive: (bool) => {
      setFocusQueued(bool);
      setIsActive(bool);
    },
    contains: node => rootRef.current.contains(node),
  }));

  return (
    <div
      className={props.readOnly ? styles['read-only-tag'] : styles.tag}
      id={props.id}
      ref={rootRef}
      role="row"
    >
      <span
        id={contentId}
        className={styles.content}
        ref={contentRef}
        role="gridcell"
        tabIndex={isActive && tabActiveStates[0] ? '0' : '-1'}
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
          tabIndex={isActive && tabActiveStates[1] ? '0' : '-1'}
          onClick={clickEvent => handleGridCellClick(clickEvent, 1)}
          onKeyDown={handleGridCellKeyDown}
        >
          <Icon
            ariaLabel="Remove"
            ariaLabelledBy={`${buttonId} ${contentId}`}
            id={buttonId}
            active={isActive}
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
  defaultActive: PropTypes.bool,
  id: PropTypes.string.isRequired,
  onRemove: PropTypes.func,
  readOnly: PropTypes.bool,
};

Tag.defaultProps = {
  defaultActive: true,
  onRemove: () => {},
  readOnly: false,
};

export default Tag;
