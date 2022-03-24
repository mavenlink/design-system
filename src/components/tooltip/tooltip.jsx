import React, { useLayoutEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import styles from './tooltip.css';
import useTooltipPositioning from './use-tooltip-positioning.js';

/**
 * A component used to render help or reminder text.
 */
export default function Tooltip({
  children,
  className,
  direction,
  disabled,
  id,
  text,
  variant,
}) {
  // size of the triangle in pixels
  const triangleHeight = 8;

  const tooltipRef = useRef();
  const { position, visible, show, hide } = useTooltipPositioning({ tooltipRef, triangleHeight, direction });

  // keep the div so enabling/disabling doesn't affect the dom tree or styles
  if (disabled) return <div className={styles.wrapper}>{children}</div>;

  let baseClassName;
  if (className) {
    baseClassName = className;
  } else if (variant === 'light') {
    baseClassName = styles.tooltipLight;
  } else {
    baseClassName = styles.tooltip;
  }

  const classNames = [baseClassName];
  if (direction === 'top') classNames.push(styles.top);
  else if (direction === 'bottom') classNames.push(styles.bottom);
  else if (direction === 'left') classNames.push(styles.left);
  else if (direction === 'right') classNames.push(styles.right);

  return (
    <div
      className={styles.wrapper}
      onBlur={hide}
      onFocus={show}
      onMouseEnter={show}
      onMouseLeave={hide}
    >
      { children }
      {visible ? ReactDOM.createPortal((
        <span
          id={id}
          className={classNames.join(' ')}
          style={{
            '--triangle-height': `${triangleHeight}px`,
            ...position,
          }}
          ref={tooltipRef}
        >
          {text}
        </span>
      ), document.body) : null}
    </div>
  );
}

Tooltip.propTypes = {
  /** The component that needs to be hovered or focused to display the tooltip. These children are where the tooltip "appears" from. */
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  /** The direction the tooltip should appear from. */
  direction: PropTypes.oneOf(['top', 'bottom', 'left', 'right']),
  /** Whether or not the tooltip should appear at all. If this is true, the tooltip will not appear even when the children receive focus. */
  disabled: PropTypes.bool,
  /** The id that the tooltip should be given. The element that this tooltip is describing <strong>MUST</strong> have <code>aria-describedby={id}</code>. */
  id: PropTypes.string.isRequired,
  /** The text and/or graphic inside of the tooltip. Tooltip text should be concise and kept to 1-2 short sentences. */
  text: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
  /** Show the default dark background tooltip or the light background tooltip */
  variant: PropTypes.oneOf(['default', 'light']),
};

Tooltip.defaultProps = {
  className: undefined,
  direction: 'top',
  disabled: false,
  variant: 'default',
};
