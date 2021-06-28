import React from 'react';
import PropTypes from 'prop-types';
import Tooltip from '../tooltip/tooltip.jsx';
import Icon from '../icon/icon.jsx';
import helpSvg from '../../svgs/help.svg';

export default function HelpIcon({
  direction,
  id,
  label,
  text,
}) {
  return (
    <Tooltip text={text} direction={direction} id={id}>
      <Icon label={label} icon={helpSvg} />
    </Tooltip>
  );
}

HelpIcon.propTypes = {
  /** Direction for the tooltip to fly from relative to the icon. */
  direction: Tooltip.propTypes.direction,
  /** The id that the tooltip should be given. The element that this tooltip is describing <strong>MUST</strong> have <code>aria-describedby={id}</code>. */
  id: PropTypes.string.isRequired,
  /** The label text of the icon. */
  label: PropTypes.string.isRequired,
  /** The text inside of the tooltip. Tooltip text should be concise and kept to 1-2 short sentences. */
  text: PropTypes.string.isRequired,
};

HelpIcon.defaultProps = {
  direction: Tooltip.defaultProps.direction,
};
