import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import BlockCheckbox from './block-checkbox.jsx';
import InlineCheckbox from './inline-checkbox.jsx';

const Checkbox = forwardRef((props, forwardedRef) => {
  return props.inline ? (
    <InlineCheckbox {...props} ref={forwardedRef} />
  ) : (
    <BlockCheckbox {...props} ref={forwardedRef} />
  );
});

Checkbox.propTypes = {
  inline: PropTypes.bool,
};

Checkbox.defaultProps = {
  inline: false,
};

Checkbox.displayName = 'Checkbox';

export default Checkbox;
