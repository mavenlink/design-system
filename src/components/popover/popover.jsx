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
import useMounted from '../../hooks/use-mounted.js';

const Popover = forwardRef(function Popover(props, ref) {
  const [open, setOpen] = useState(false);
  const closeIconRef = useRef();
  const backupRef = useRef();
  const sectionRef = useRef();
  const selfRef = ref || backupRef;
  const { flush } = useFlush({ ref: sectionRef, initialDirection: props.flush, autoflush: props.autoflush, open });
  const mounted = useMounted();

  const onFocusIn = (event) => {
    if (open && event.target instanceof Node && !sectionRef.current.contains(event.target)) {
      setOpen(false);
    }
  };

  const onWindowClick = () => {
    if (open) {
      setOpen(false);
    }
  };

  useLayoutEffect(() => {
    window.addEventListener('click', onWindowClick);
    window.addEventListener('focusin', onFocusIn);

    if (open) {
      closeIconRef.current.focus({ preventScroll: true });
    }

    if (mounted.current && !open) {
      props.onClose();
    }

    return () => {
      window.removeEventListener('click', onWindowClick);
      window.removeEventListener('focusin', onFocusIn);
    };
  }, [open]);

  useImperativeHandle(selfRef, () => ({
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
      ref={sectionRef}
      role="dialog"
      style={flush}
    >
      <div onClick={(event) => { event.stopPropagation(); }} role="presentation">
        <div className={styles['heading-container']} id="popover-heading">
          <h1 className={styles.heading}>{props.title}</h1>
          <IconButton
            active={true}
            className={styles['close-button']}
            icon={iconClear}
            label={'Close popover'}
            onPress={() => { setOpen(false); }}
            ref={closeIconRef}
          />
        </div>
        {props.children}
      </div>
    </section>
  );
});

Popover.propTypes = {
  autoflush: PropTypes.bool,
  children: PropTypes.node,
  flush: PropTypes.oneOf(['left', 'right']),
  onClose: PropTypes.func,
  title: PropTypes.string.isRequired,
};

Popover.defaultProps = {
  autoflush: false,
  children: undefined,
  flush: 'left',
  onClose: () => {},
};

export default Popover;
