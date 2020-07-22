import React from 'react';
import PropTypes from 'prop-types';

export default function Popup(props) {
  return (
    <React.Fragment>
      { props.show && props.children }
    </React.Fragment>
  );
}

Popup.propTypes = {
  children: PropTypes.node.isRequired,
  show: PropTypes.bool,
};

Popup.defaultProps = {
  show: false,
};
