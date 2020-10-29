import React, { useImperativeHandle, useRef } from 'react';
import PropTypes from 'prop-types';
import FormControl from '../form-control/form-control.jsx';
import useValidation from '../../hooks/use-validation';

const Number = React.forwardRef((props, ref) => {
  const inputRef = useRef();
  const [validationMessage, validate] = useValidation(props.validationMessage, inputRef);

  function onBlur(event) {
    validate();
    props.onBlur(event);
  }

  function onChange(event) {
    validate();
    props.onChange(event);
  }

  useImperativeHandle(ref, () => ({
    name: props.name,
  }));

  return (
    <FormControl
      error={validationMessage}
      id={props.id}
      label={props.label}
      required={props.required}
    >
      <input
        aria-describedby={`${props.id}Hint`}
        id={props.id}
        placeholder={props.placeholder}
        name={props.name}
        onBlur={onBlur}
        onChange={onChange}
        ref={inputRef}
        required={props.required}
        type="number"
      />
    </FormControl>
  );
});

Number.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  name: PropTypes.string,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  validationMessage: PropTypes.string,
};

Number.defaultProps = {
  name: undefined,
  onBlur: () => {},
  onChange: () => {},
  placeholder: undefined,
  required: false,
  validationMessage: '',
};

export default Number;
