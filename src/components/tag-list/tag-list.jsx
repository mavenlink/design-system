import PropTypes from 'prop-types';
import React from 'react';

export default function TagList(props) {
  return (
    <div>
      {props.children}
    </div>
  );
}

TagList.propTypes = {
  children: PropTypes.node.isRequired,
};

TagList.defaultProps = {};
