import PropTypes from 'prop-types';
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import styles from './tag.css';
import clear from '../../svgs/clear.svg';
import IconButton from '../icon-button/icon-button.jsx';

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
          role="gridcell"
          onKeyDown={handleGridCellKeyDown}
          tabIndex="-1"
        >
          <IconButton
            active={isActive && tabActiveStates[1]}
            className={styles.icon}
            id={buttonId}
            icon={clear}
            label="Remove"
            labelledBy={`${buttonId} ${contentId}`}
            onPress={clickEvent => handleGridCellClick(clickEvent, 1)}
            ref={buttonRef}
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
