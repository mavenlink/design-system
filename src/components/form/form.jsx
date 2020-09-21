import PropTypes from 'prop-types';
import React, {
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import Button from '../button/button.jsx';
import styles from './form.css';

const Form = React.forwardRef((props, forwardedRef) => {
  const formRef = useRef();
  const defaultRef = useRef();
  const ref = forwardedRef || defaultRef;
  const [dirty, setDirty] = useState(false);
  const [valid, setValid] = useState(true);

  function onChange(event) {
    props.onChange(event);
    setValid(ref.current.checkValidity());
    setDirty(ref.current.dirty);
  }

  function onSubmit(event) {
    event.preventDefault();
    props.onSubmit({
      target: ref.current,
      data: props.refs.reduce((data, controlRef) => {
        if (controlRef.current) {
          return {
            ...data,
            [controlRef.current.name]: controlRef.current,
          };
        }

        return data;
      }, {}),
    });
  }

  useEffect(() => {
    setDirty(ref.current.dirty);
  });

  useImperativeHandle(ref, () => ({
    get dirty() {
      return props.refs.some((controlRef) => {
        if (controlRef.current) {
          const isNative = controlRef.current.dirty === undefined;

          if (isNative) {
            const providedValue = controlRef.current.getAttribute('value') || '';
            return controlRef.current.value !== providedValue;
          }

          return controlRef.current.dirty;
        }

        return false;
      });
    },
    checkValidity: () => {
      return formRef.current.checkValidity();
    },
  }));

  return (
    <form ref={formRef} onSubmit={onSubmit} onChange={onChange}>
      {props.children({ onChange })}
      {!props.readOnly &&
        <div className={styles['buttons-container']}>
          <Button
            className={styles['primary-button']}
            color="primary"
            type="submit"
            disabled={!valid || !dirty}
          >
            Save
          </Button>
        </div>
      }
    </form>
  );
});

Form.propTypes = {
  children: PropTypes.func.isRequired,
  onChange: PropTypes.func,
  onSubmit: PropTypes.func,
  readOnly: PropTypes.bool,
  refs: PropTypes.arrayOf(
    PropTypes.shape({ current: PropTypes.any }).isRequired,
  ).isRequired,
};

Form.defaultProps = {
  onChange: () => {},
  onSubmit: () => {},
  readOnly: false,
};

export default Form;
