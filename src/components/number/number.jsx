import React, { useImperativeHandle } from 'react';
import PropTypes from 'prop-types';
import FormControl from '../form-control/form-control.jsx';

const Number = React.forwardRef((props, ref) => {
  useImperativeHandle(ref, () => ({
    name: props.name,
  }));

  return (
    <FormControl id={props.id} label={props.label}>
      <input
        aria-describedby={`${props.id}Hint`}
        id={props.id}
        placeholder={props.placeholder}
        name={props.name}
        type="number"
      />
    </FormControl>
  );
});

Number.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  name: PropTypes.string,
  placeholder: PropTypes.string,
};

Number.defaultProps = {
  name: undefined,
  placeholder: undefined,
};

export default Number;
