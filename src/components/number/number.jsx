import React from 'react';
import PropTypes from 'prop-types';
import FormControl from '../form-control/form-control';

const Number = React.forwardRef((props, _) => {
  return (
    <FormControl id={props.id} label={props.label}>
      <input
        aria-describedby={`${props.id}Hint`}
        id={props.id}
        type="number"
      />
    </FormControl>
  );
});

Number.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

Number.defaultProps = {};

export default Number;
