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
  truncate,
}) {
  // size of the triangle in pixels; this should be the same as teh value in the linked stylesheet
  // TODO is there a way to share the variable so its only in one place
  const triangleHeight = 8;

  const tooltipRef = useRef();
  const { position, visible, show, hide } = useTooltipPositioning({ tooltipRef, triangleHeight, direction });

  useLayoutEffect(() => {
    if (disabled || document.querySelector('[aria-describedby]', id)) return;

    throw new Error('<Tooltip> was used without an element on the DOM being described by it. ' +
      'Please add `aria-describedby` to the element this tooltip is being used to describe.');
  }, []);

  // keep the div so enabling/disabling doesn't affect the dom tree or styles
  if (disabled) return <div>{children}</div>;

  const classNames = [className];
  if (direction === 'top') classNames.push(styles.top);
  else if (direction === 'bottom') classNames.push(styles.bottom);
  else if (direction === 'left') classNames.push(styles.left);
  else if (direction === 'right') classNames.push(styles.right);

  if (truncate) classNames.push(styles.truncate);

  return (
    <div
      className={styles.wrapper}
      onBlur={hide}
      onFocus={show}
      onMouseEnter={show}
      onMouseLeave={hide}
    >
      { children }
      { visible && ReactDOM.createPortal((
        <span
          id={id}
          className={classNames.join(' ')}
          style={position}
          ref={tooltipRef}
        >
          {text}
        </span>
      ), document.body)}
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
  /** The text inside of the tooltip. Tooltip text should be concise and kept to 1-2 short sentences. */
  text: PropTypes.string.isRequired,
  truncate: PropTypes.bool,
};

Tooltip.defaultProps = {
  className: styles.tooltip,
  direction: 'top',
  disabled: false,
  truncate: false,
};
