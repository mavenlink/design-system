import React, { useState } from 'react';
import PropTypes from 'prop-types';

/**
 *
 * @param children
 * @param disabled
 * @param id
 * @param text
 * @returns {JSX.Element}
 * @constructor
 */
export default function Tooltip({
  children,
  disabled,
  id,
  text,
}) {
  const [visible, setVisible] = useState(false);

  if (disabled) return children;

  const show = () => setVisible(true);
  const hide = () => setVisible(false);

  return (
    <div
      onBlur={hide}
      onFocus={show}
      onMouseEnter={show}
      onMouseLeave={hide}
    >
      {visible ?
        <span id={`${id}-tooltip`}>{text}</span> :
        null
      }
      {children}
    </div>
  );
}

Tooltip.propTypes = {
  children: PropTypes.node.isRequired,
  disabled: PropTypes.bool,
  id: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

Tooltip.defaultProps = {
  disabled: false,
};
