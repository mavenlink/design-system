import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './tooltip.css';

/**
 * A component used to render help or reminder text.
 * @param children The component that needs to be hovered or focused to display the tooltip. These children are where the tooltip "appears" from.
 * @param className An optional className for the tooltip to provide styling.
 * @param direction The direction the tooltip should appear from.
 * @param disabled Whether or not the tooltip should appear at all. If this is true, the tooltip will not appear even when the children receive focus.
 * @param id The id of the element this tooltip is describing. The element with this id should have have <code>aria-describedby={`${id}-tooltip`}</code>.
 * @param text The text inside of the tooltip. Tooltip text should be concise and kept to 1-2 short sentences.
 * @param truncate Whether or not to truncate the <code>text</code> provided. Usage of this prop is generally not recommended unless the text is user-defined.
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
