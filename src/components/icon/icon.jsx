import React from 'react';
import PropTypes from 'prop-types';

export default function Icon(props) {
  const viewBox = props.icon.viewBox.split(' ');
  const width = parseInt(viewBox[2], 10);
  const height = parseInt(viewBox[3], 10);

  return (
    <svg
      aria-describedby={props.describedBy}
      aria-labelledby={props.labelledBy}
      className={props.className}
      height={height}
      role="img"
      width={width}
    >
      <title id={props.id}>{props.label}</title>
      <use xlinkHref={`#${props.icon.id}`} />
    </svg>
  );
}

Icon.propTypes = {
  className: PropTypes.string,
  icon: PropTypes.shape({
    id: PropTypes.string,
    viewBox: PropTypes.string,
  }).isRequired,
  describedBy: PropTypes.string,
  id: PropTypes.string,
  label: PropTypes.string.isRequired,
  labelledBy: PropTypes.string,
};

Icon.defaultProps = {
  className: undefined,
  describedBy: undefined,
  id: undefined,
  labelledBy: undefined,
};
