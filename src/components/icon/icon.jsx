import React from 'react';
import PropTypes from 'prop-types';

export default function Icon(props) {
  const viewBox = props.icon.viewBox.split(' ');
  const width = parseInt(viewBox[2], 10);
  const height = parseInt(viewBox[3], 10);

  return (
    <svg
      aria-label={props.ariaLabel}
      aria-labelledby={props.ariaLabelledBy}
      className={props.className}
      height={height}
      id={props.id}
      role="img"
      width={width}
    >
      { props.title && <title>{props.title}</title> }
      <use xlinkHref={`#${props.icon.id}`} />
    </svg>
  );
}

Icon.propTypes = {
  ariaLabel: PropTypes.string,
  ariaLabelledBy: PropTypes.string,
  className: PropTypes.string,
  icon: PropTypes.shape({
    id: PropTypes.string,
    viewBox: PropTypes.string,
  }).isRequired,
  id: PropTypes.string,
  title: PropTypes.string,
};

Icon.defaultProps = {
  ariaLabel: undefined,
  ariaLabelledBy: undefined,
  className: undefined,
  id: undefined,
  title: undefined,
};
