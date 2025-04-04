import React from 'react';
import PropTypes from 'prop-types';
import helpSvg from '../../svgs/help.svg';
import Tooltip from '../tooltip/tooltip.jsx';
import Icon from '../icon/icon.jsx';

export default function HelpIcon({ classNames, direction, id, label, text }) {
  return (
    <Tooltip
      text={text}
      direction={direction}
      id={id}
      className={classNames.tooltip}
    >
      <Icon label={label} icon={helpSvg} className={classNames.icon} />
    </Tooltip>
  );
}

HelpIcon.propTypes = {
  /** classes to be applied to the tooltip and icon */
  classNames: PropTypes.shape({
    icon: PropTypes.string,
    tooltip: PropTypes.string,
  }),
  /** Direction for the tooltip to fly from relative to the icon. */
  direction: Tooltip.propTypes.direction,
  /** The id that the tooltip should be given. The element that this tooltip is describing <strong>MUST</strong> have <code>aria-describedby={id}</code>. */
  id: PropTypes.string.isRequired,
  /** @deprecated because this prop will cause a double message. The label text of the icon. */
  label: PropTypes.string,
  /** The text inside of the tooltip. Tooltip text should be concise and kept to 1-2 short sentences. */
  text: PropTypes.string.isRequired,
};

HelpIcon.defaultProps = {
  classNames: {},
  direction: Tooltip.defaultProps.direction,
  label: undefined,
};
