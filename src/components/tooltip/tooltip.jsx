import React, { useState } from 'react';
import PropTypes from 'prop-types';

/**
 *
 * @param children
 * @param id
 * @param text
 * @returns {JSX.Element}
 * @constructor
 */
export default function Tooltip({
  children,
  id,
  text,
}) {
  const [visible, setVisible] = useState(false);

  const show = () => setVisible(true);
  const hide = () => setVisible(false);

  return (
    <div onMouseEnter={show} onMouseLeave={hide} onFocus={show} onBlur={hide}>
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
  id: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};
