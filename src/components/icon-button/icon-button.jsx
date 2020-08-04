import React from 'react';
import PropTypes from 'prop-types';
import Icon from '../icon/icon.jsx';

export default function IconButton(props) {
  return (
    <Icon
      active
      className={props.className}
      currentColor="skip"
      fill="skip"
      icon={props.icon}
      onClick={props.onClick}
      role="button"
      size="skip"
      stroke="skip"
      title={props.label}
      v={2}
    />
  );
}

IconButton.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string.isRequired,
  icon: PropTypes.shape({
    id: PropTypes.string.isRequired,
    viewBox: PropTypes.string.isRequired,
  }).isRequired,
  onClick: PropTypes.func.isRequired,
};

IconButton.defaultProps = {
  className: undefined,
};
