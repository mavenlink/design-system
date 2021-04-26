/* eslint-disable react/prop-types */
import React, { forwardRef, useRef } from 'react';
import FormControl from '../form-control/form-control.jsx';

const Checkbox = forwardRef(function Checkbox(props, forwardedRef) {
  const fallbackRef = useRef();
  const ref = forwardedRef || fallbackRef;

  return (
    <FormControl
      id={props.id}
      label={props.label}
    >
      <input
        className={props.className}
        id={props.id}
        name={props.name}
        onBlur={props.onBlur}
        onChange={props.onChange}
        onFocus={props.onFocus}
        readOnly={props.readOnly}
        ref={ref}
        type="checkbox"
      />
    </FormControl>
  );
});

export default Checkbox;
