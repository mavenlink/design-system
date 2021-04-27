import PropTypes from 'prop-types';
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import IconButton from '../icon-button/icon-button.jsx';
import iconClear from '../../svgs/clear.svg';
import styles from './popover.css';

const Popover = forwardRef(function Popover(props, ref) {
  const [open, setOpen] = useState(props.startOpen);
  const closeIconRef = useRef();
  const backupRef = useRef();
  const sectionRef = useRef();
  const selfRef = ref || backupRef;
  const [flush, setFlush] = useState(props.flush);

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

  useEffect(() => {
    window.addEventListener('click', onWindowClick);
    window.addEventListener('focusin', onFocusIn);

    if (closeIconRef.current && open) {
      closeIconRef.current.focus({ preventScroll: true });
    }

    if (!open) {
      props.onClose();
    }

    return () => {
      window.removeEventListener('click', onWindowClick);
      window.removeEventListener('focusin', onFocusIn);
    };
  }, [open]);

  useLayoutEffect(() => {
    if (!open || !props.autoflush) return;

    const { right, left } = sectionRef.current.getBoundingClientRect();
    if (right > window.innerWidth) {
      setFlush('right');
    } else if (left < 0) {
      setFlush('left');
    } else {
      setFlush(props.flush);
    }
  }, [open, sectionRef.current?.getBoundingClientRect]);

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

  const sectionStyle = {
    left: flush === 'left' ? 0 : undefined,
    right: flush === 'right' ? 0 : undefined,
  };

  return (
    <section
      aria-labelledby="popover-heading"
      className={styles.container}
      ref={sectionRef}
      role="dialog"
      style={sectionStyle}
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
  startOpen: PropTypes.bool,
  title: PropTypes.string.isRequired,
};

Popover.defaultProps = {
  autoflush: false,
  children: undefined,
  flush: 'left',
  onClose: () => {},
  startOpen: false,
};

export default Popover;
