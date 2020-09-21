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
    setValid(ref.current.checkValidity);
    setDirty(ref.current.dirty);
  }

  function onSubmit(event) {
    event.preventDefault();
    props.onSubmit({
      target: event.target,
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
          return controlRef.current.dirty === undefined
            ? true
            : controlRef.current.dirty;
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
      {props.isEditable &&
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
  isEditable: PropTypes.bool,
  onChange: PropTypes.func,
  onSubmit: PropTypes.func,
  refs: PropTypes.arrayOf(
    PropTypes.shape({ current: PropTypes.any }).isRequired
  ).isRequired,
};

Form.defaultProps = {
  isEditable: true,
  onChange: () => {},
  onSubmit: () => {},
};

export default Form;
