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
  const [open, setOpen] = useState(false);
  const closeIconRef = useRef();
  const backupRef = useRef();
  const selfRef = ref || backupRef;

  const onWindowClick = () => {
    if (open) {
      setOpen(false);
    }
  };

  useEffect(() => {
    window.addEventListener('click', onWindowClick);

    if (closeIconRef.current && open) {
      closeIconRef.current.focus();
    }

    if (!open) {
      props.onClose();
    }

    return () => {
      window.removeEventListener('click', onWindowClick);
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
    // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
    <section
      aria-labelledby="popover-heading"
      className={styles.container}
      onClick={(event) => { event.stopPropagation(); }}
      role="dialog"
      style={{ left: `${props.left}px`, top: `${props.top}px` }}
    >
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
    </section>
  );
});

Popover.propTypes = {
  children: PropTypes.node,
  left: PropTypes.number,
  onClose: PropTypes.func,
  title: PropTypes.string.isRequired,
  top: PropTypes.number,
};

Popover.defaultProps = {
  children: undefined,
  left: undefined,
  onClose: () => {},
  top: undefined,
};

export default Popover;
