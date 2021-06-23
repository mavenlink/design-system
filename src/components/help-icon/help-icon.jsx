import React from 'react';
import PropTypes from 'prop-types';
import Tooltip from '../tooltip/tooltip.jsx';
import Icon from '../icon/icon.jsx';
import helpSvg from '../../svgs/help.svg';

/**
 * @param direction Direction for the tooltip to fly from relative to the icon.
 * @param id The id that the tooltip should be given. The element that this tooltip is describing <strong>MUST</strong> have <code>aria-describedby={id}</code>.
 * @param label The label text of the icon.
 * @param text The text inside of the tooltip. Tooltip text should be concise and kept to 1-2 short sentences.
 */
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
  direction: Tooltip.propTypes.direction,
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

HelpIcon.defaultProps = {
  direction: Tooltip.defaultProps.direction,
};
