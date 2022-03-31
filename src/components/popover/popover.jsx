import PropTypes from 'prop-types';
import React, {
  forwardRef,
  useLayoutEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import IconButton from '../icon-button/icon-button.jsx';
import iconClear from '../../svgs/clear.svg';
import styles from './popover.css';
import useFlush from '../../hooks/use-flush.js';
import useMountedEffect from '../../hooks/use-mounted-effect.js';

const Popover = forwardRef(function Popover(props, ref) {
  const [open, setOpen] = useState(false);
  const closeIconRef = useRef();
  const sectionRef = useRef();
  const { flush } = useFlush({ ref: sectionRef, initialDirection: props.flush, autoflush: props.autoflush, open });

  function onBlur(event) {
    // Target is set to `null` when losing focus to a non-interactive element (e.g. text)
    const focusOutsidePopover = event.relatedTarget === null || !sectionRef.current.contains(event.relatedTarget);
    if (focusOutsidePopover && props.shouldClose(event)) {
      setOpen(false);
    }
  }

  useLayoutEffect(() => {
    if (open) {
      closeIconRef.current.focus({ preventScroll: true });
    }
  }, [open]);

  useMountedEffect(() => {
    if (!open) {
      props.onClose();
    }
  }, [open]);

  useImperativeHandle(ref, () => ({
    get open() {
      return open;
    },
    set open(value) {
      setOpen(value);
    },
  }));

  if (!open) {
    return null;
  }

  return (
    <section
      aria-labelledby="popover-heading"
      className={styles.container}
      onBlur={onBlur}
      ref={sectionRef}
      role="dialog"
      style={flush}
      tabIndex={-1}
    >
      <div className={styles['heading-container']} id="popover-heading">
        <h1 className={styles.heading}>{props.title}</h1>
        <IconButton
          active={true}
          className={styles['close-button']}
          icon={iconClear}
          label="Close popover"
          onPress={() => { setOpen(false); }}
          ref={closeIconRef}
        />
      </div>
      {props.children}
    </section>
  );
});

Popover.propTypes = {
  autoflush: PropTypes.bool,
  children: PropTypes.node,
  flush: PropTypes.oneOf(['left', 'right']),
  onClose: PropTypes.func,
  /** Handles either a FocusEvent or MouseEvent. This is an additional predicate for configuring the closing behavior. */
  shouldClose: PropTypes.func,
  title: PropTypes.string.isRequired,
};

Popover.defaultProps = {
  autoflush: false,
  children: undefined,
  flush: 'left',
  shouldClose: () => true,
  onClose: () => {},
};

export default Popover;
