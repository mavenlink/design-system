import React from 'react';
import PropTypes from 'prop-types';
import Icon from '../icon/icon.jsx';

export default function IconButton(props) {
  const viewBox = props.icon.viewBox.split(' ');
  const width = parseInt(viewBox[2], 10);
  const height = parseInt(viewBox[3], 10);

  return (
    <Icon
      active
      className={props.className}
      currentColor="skip"
      fill="skip"
      height={height}
      name={props.icon.id}
      onClick={props.onClick}
      role="button"
      size="skip"
      stroke="skip"
      title={props.label}
      width={width}
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
