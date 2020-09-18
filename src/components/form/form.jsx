import PropTypes from 'prop-types';
import React, {
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import Button from '../button/button';
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
      data: props.fieldRefs.reduce((data, fieldRef) => {
        if (fieldRef.current) {
          return {
            ...data,
            [fieldRef.current.name]: fieldRef.current,
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
      return props.fieldRefs.some((fieldRef) => {
        if (fieldRef.current) {
          return fieldRef.current.dirty === undefined
            ? true
            : fieldRef.current.dirty;
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
  fieldRefs: PropTypes.arrayOf(PropTypes.shape({ current: PropTypes.any }).isRequired),
  isEditable: PropTypes.bool,
  onChange: PropTypes.func,
  onSubmit: PropTypes.func,
};

Form.defaultProps = {
  fieldRefs: [],
  isEditable: true,
  onChange: () => {},
  onSubmit: () => {},
};

export default Form;
