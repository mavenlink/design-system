import React from 'react';
import PropTypes from 'prop-types';
import styles from './icon-button.css';

export default function IconButton(props) {
  const viewBox = props.icon.viewBox.split(' ');
  const width = parseInt(viewBox[2], 10);
  const height = parseInt(viewBox[3], 10);
  const tabIndex = props.active ? 0 : -1;

  function onKeyDown(event) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      props.onPress(event);
    }
  }

  return (
    <svg
      aria-labelledby={props.labelledBy}
      className={props.className}
      height={height}
      onClick={props.onPress}
      role="button"
      tabIndex={tabIndex}
      width={width}
      onKeyDown={onKeyDown}
    >
      <title>{props.label}</title>
      <use xlinkHref={`#${props.icon.id}`} />
    </svg>
  );
}

IconButton.propTypes = {
  active: PropTypes.bool,
  className: PropTypes.string,
  icon: PropTypes.shape({
    id: PropTypes.string.isRequired,
    viewBox: PropTypes.string.isRequired,
  }).isRequired,
  label: PropTypes.string.isRequired,
  labelledBy: PropTypes.string,
  onPress: PropTypes.func.isRequired,
};

IconButton.defaultProps = {
  active: true,
  className: styles.button,
  labelledBy: undefined,
};
