import React from 'react';
import PropTypes from 'prop-types';
import BlockCheckbox from './block-checkbox.jsx';
import InlineCheckbox from './inline-checkbox.jsx';

export default function Checkbox(props) {
  return props.inline ? (
    <InlineCheckbox {...props} />
  ) : (
    <BlockCheckbox {...props} />
  );
}

Checkbox.propTypes = {
  inline: PropTypes.bool,
};

Checkbox.defaultProps = {
  inline: false,
};
