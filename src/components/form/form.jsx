import debounce from 'lodash.debounce';
import PropTypes from 'prop-types';
import React, {
  useCallback,
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

  const onDebouncedSubmit = useCallback(debounce(() => {
    if (ref.current.checkValidity() && ref.current.dirty) {
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
  }, 300, { leading: !props.autoSave, trailing: props.autoSave }), [props.onSubmit]);

  function onChange(event) {
    props.onChange(event);
    setValid(ref.current.checkValidity());
    setDirty(ref.current.dirty);

    if (props.autoSave) onDebouncedSubmit();
  }

  function onSubmit(event) {
    event.preventDefault();
    onDebouncedSubmit();
  }

  useEffect(() => {
    setValid(ref.current.checkValidity());
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
      {!props.readOnly && !props.autoSave &&
        <div className={styles['buttons-container']}>
          <Button
            className={styles['primary-button']}
            color="primary"
            type="submit"
            disabled={!valid || !dirty}
          >
            {props.submitText}
          </Button>
        </div>
      }
    </form>
  );
});

Form.propTypes = {
  autoSave: PropTypes.bool,
  children: PropTypes.func.isRequired,
  onChange: PropTypes.func,
  onSubmit: PropTypes.func,
  readOnly: PropTypes.bool,
  refs: PropTypes.arrayOf((
    PropTypes.shape({ current: PropTypes.any }).isRequired
  )).isRequired,
  submitText: PropTypes.string,
};

Form.defaultProps = {
  autoSave: false,
  submitText: 'Save',
  onChange: () => {},
  onSubmit: () => {},
  readOnly: false,
};

export default Form;
