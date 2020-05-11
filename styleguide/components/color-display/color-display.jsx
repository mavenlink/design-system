import React from 'react';
import PropTypes from 'prop-types';

const capitalize = (str) => {
  const firstLetter = str.slice(0, 1).toUpperCase();
  return `${firstLetter}${str.slice(1, str.length)}`;
};

export default function ColorDisplay(props) {
  const style = {
    backgroundColor: `var(--palette-new-${props.color}-${props.type})`,
    color: 'var(--white)',
  };

  const name = `New ${capitalize(props.color)} ${capitalize(props.type)}`;

  return (
    <div style={style}>{name}</div>
  );
}

ColorDisplay.propTypes = {
  color: PropTypes.oneOf(['brand']).isRequired,
  type: PropTypes.oneOf(['base']),
};

ColorDisplay.defaultProps = {
  type: 'base',
};
