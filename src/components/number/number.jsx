import React, { useEffect, useImperativeHandle, useRef } from 'react';
import PropTypes from 'prop-types';
import FormControl from '../form-control/form-control.jsx';
import useValidation from '../../hooks/use-validation.jsx';
import useDidMount from '../../hooks/use-did-mount.js';
import Icon from '../icon/icon.jsx';
import cautionSvg from '../../svgs/caution.svg';
import styles from '../input/input.css';

const Number = React.forwardRef((props, ref) => {
  const inputRef = useRef();
  const [didMount] = useDidMount();
  const [validationMessage, validate] = useValidation(props.validationMessage, inputRef);

  useEffect(() => {
    if (!didMount) return;

    // The MDS Number is using an uncontrolled `<input>`.
    // In order to set a new provided value prop, we
    // set the internal state of the `<input>`.
    inputRef.current.value = props.value;
  }, [props.value]);

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
    get value() {
      return parseInt(inputRef.current.value, 10);
    },
  }));

  return (
    <FormControl
      error={validationMessage}
      id={props.id}
      label={props.label}
      readOnly={props.readOnly}
      required={props.required}
    >
      <input
        aria-describedby={`${props.id}Hint`}
        className={props.className}
        defaultValue={props.value}
        id={props.id}
        placeholder={props.placeholder}
        name={props.name}
        onBlur={onBlur}
        onChange={onChange}
        ref={inputRef}
        readOnly={props.readOnly}
        required={props.required}
        type="number"
      />
      {!!validationMessage && (
        <Icon
          className={styles['invalid-icon']}
          icon={cautionSvg}
          label={validationMessage}
        />
      )}
    </FormControl>
  );
});

Number.propTypes = {
  className: PropTypes.string,
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  name: PropTypes.string,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  readOnly: PropTypes.bool,
  required: PropTypes.bool,
  validationMessage: PropTypes.string,
  value: PropTypes.number,
};

Number.defaultProps = {
  className: undefined,
  name: undefined,
  onBlur: () => {},
  onChange: () => {},
  placeholder: undefined,
  readOnly: false,
  required: false,
  validationMessage: '',
  value: undefined,
};

export default Number;
