import React from 'react';
import PropTypes from 'prop-types';

export default function TagSkill(props) {
  return (
    <React.Fragment>
      <span>Skillet</span>
      <span> - </span>
      <span>{props.name}</span>
      <span> - </span>
      <span>{props.level}</span>
    </React.Fragment>
  );
}

TagSkill.propTypes = {
  name: PropTypes.string.isRequired,
  level: PropTypes.number,
};

TagSkill.defaultProps = {
  level: undefined,
};
