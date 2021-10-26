import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import BlockCheckbox from './block-checkbox.jsx';
import InlineCheckbox from './inline-checkbox.jsx';

function Checkbox(props, forwardedRef) {
  return props.inline ? (
    <InlineCheckbox {...props} ref={forwardedRef} />
  ) : (
    <BlockCheckbox {...props} ref={forwardedRef} />
  );
}

Checkbox.propTypes = {
  inline: PropTypes.bool,
};

Checkbox.defaultProps = {
  inline: false,
};

export default forwardRef(Checkbox);
