import React from 'react';
import PropTypes from 'prop-types';

export default function TagList(props) {
  return (
    <ul>
      {props.children && props.children.map(childElement => (
        <li key={childElement.key}>{childElement}</li>
      ))}
    </ul>
  );
}

TagList.propTypes = {
  children: PropTypes.node,
};

TagList.defaultProps = {
  children: undefined,
};
