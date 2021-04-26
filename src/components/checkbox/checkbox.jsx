/* eslint-disable react/prop-types */
import React, { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';
import FormControl from '../form-control/form-control.jsx';
import useMounted from '../../hooks/use-mounted';

const Checkbox = forwardRef(function Checkbox(props, forwardedRef) {
  const fallbackRef = useRef();
  const ref = forwardedRef || fallbackRef;
  const inputRef = useRef();
  const mounted = useMounted();

  useEffect(() => {
    if (!mounted.current) return;

    inputRef.current.checked = props.checked ?? false;
  }, [props.checked]);

  useImperativeHandle(ref, () => ({
    id: props.id,
    name: props.name,
    get checked() {
      return inputRef.current.checked;
    },
    get dirty() {
      const providedValue = props.checked ?? false;
      return providedValue !== this.checked;
    },
  }));

  return (
    <FormControl
      id={props.id}
      label={props.label}
    >
      <input
        aria-describedby={`${props.id}Hint`}
        className={props.className}
        id={props.id}
        name={props.name}
        onBlur={props.onBlur}
        onChange={props.onChange}
        onFocus={props.onFocus}
        readOnly={props.readOnly}
        ref={inputRef}
        type="checkbox"
      />
    </FormControl>
  );
});

export default Checkbox;
