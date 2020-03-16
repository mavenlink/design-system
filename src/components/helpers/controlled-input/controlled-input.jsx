import React from 'react';
import PropTypes from 'prop-types';

export default function ControlledInput(props) {
  return (<input
    className={props.className}
    data-testid="controlled input"
    disabled={props.disabled}
    id={props.id}
  />);
}

ControlledInput.propTypes = {
  className: PropTypes.string,
  disabled: PropTypes.bool,
  id: PropTypes.string.isRequired,
};

ControlledInput.defaultProps = {
  className: undefined,
  disabled: false,
};
