import React from 'react';
import PropTypes from 'prop-types';
import Icon from '../icon/icon.jsx';
import styles from './icon-button.css';

export default function IconButton(props) {
  return (
    <Icon
      active
      className={props.className}
      currentColor="skip"
      fill="skip"
      icon={props.icon}
      onClick={props.onClick}
      onEnter={props.onEnter}
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
  onEnter: PropTypes.func,
};

IconButton.defaultProps = {
  className: styles.button,
  onEnter: () => {},
};