import React from 'react';
import PropTypes from 'prop-types';

export default function ControlledInput(props) {
  return (<input
    data-testid="controlled input"
    id={props.id}
  />);
}

ControlledInput.propTypes = {
  id: PropTypes.string.isRequired,
};

ControlledInput.defaultProps = {};
