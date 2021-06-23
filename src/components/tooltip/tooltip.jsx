import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './tooltip.css';

export default function Tooltip({
  children,
  className,
  direction,
  disabled,
  id,
  text,
  truncate,
}) {
  const [visible, setVisible] = useState(false);

  if (disabled) return children;

  const show = () => setVisible(true);
  const hide = () => setVisible(false);

  const classNames = [className];

  switch (direction) {
    case 'top': classNames.push(styles.top); break;
    case 'bottom': classNames.push(styles.bottom); break;
    case 'left': classNames.push(styles.left); break;
    case 'right': classNames.push(styles.right); break;
    default: break;
  }

  if (truncate) classNames.push(styles.truncate);

  return (
    <div
      className={classNames.join(' ')}
      data-tooltip={text}
      onBlur={hide}
      onFocus={show}
      onMouseEnter={show}
      onMouseLeave={hide}
    >
      {visible ?
        <span id={`${id}-tooltip`} className={styles['sr-only']}>{text}</span> :
        null
      }
      { children }
    </div>
  );
}

Tooltip.propTypes = {
  children: PropTypes.node.isRequired,
  direction: PropTypes.oneOf(['top', 'bottom', 'left', 'right']),
  disabled: PropTypes.bool,
  id: PropTypes.string.isRequired,
  className: PropTypes.string,
  text: PropTypes.string.isRequired,
  truncate: PropTypes.bool,
};

Tooltip.defaultProps = {
  direction: 'top',
  disabled: false,
  className: styles.tooltip,
  truncate: false,
};
