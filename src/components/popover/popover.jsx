import PropTypes from 'prop-types';
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
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

  const onFocusIn = (event) => {
    if (open && event.target instanceof HTMLElement && !sectionRef.current.contains(event.target)) {
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
      closeIconRef.current.focus();
    }

    if (!open) {
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
  children: PropTypes.node,
  onClose: PropTypes.func,
  startOpen: PropTypes.bool,
  title: PropTypes.string.isRequired,
};

Popover.defaultProps = {
  children: undefined,
  onClose: () => {},
  startOpen: false,
};

export default Popover;
