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

  const onRegularSubmit = (redirect) => {
    if (ref.current && ref.current.checkValidity() && ref.current.dirty) {
      props.onSubmit({
        target: ref.current,
        redirect,
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
  };

  function onChange(event) {
    props.onChange(event);
    setValid(ref.current.checkValidity());
    setDirty(ref.current.dirty);

    if (props.autoSave) onRegularSubmit();
  }

  function onSubmit(event) {
    event.preventDefault();
    onRegularSubmit(true);
  }

  function onSaveAndAddAnotherClick(event) {
    event.preventDefault();
    onRegularSubmit(false);
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

  const disableButtons = !valid || !dirty;

  function renderHideAndSaveAnother() {
    if (!props.hideSaveAndAddAnother) {
      return (
        <Button
          color="secondary"
          disabled={disableButtons}
          onClick={onSaveAndAddAnotherClick}
        >
          Save & Add Another
        </Button>
      );
    }

    return undefined;
  }

  return (
    <form
      className={props.className}
      onChange={onChange}
      onSubmit={onSubmit}
      ref={formRef}
    >
      {props.children({ onChange })}
      {!props.readOnly && !props.autoSave &&
      <div className={props.buttonContainerClassName}>
        <Button
          className={styles['primary-button']}
          color="primary"
          type="submit"
          disabled={disableButtons}
          name={'submit'}
        >
          {props.submitText}
        </Button>
        { renderHideAndSaveAnother() }
      </div>
      }
    </form>
  );
});

Form.propTypes = {
  autoSave: PropTypes.bool,
  buttonContainerClassName: PropTypes.string,
  children: PropTypes.func.isRequired,
  className: PropTypes.string,
  onChange: PropTypes.func,
  onSubmit: PropTypes.func,
  readOnly: PropTypes.bool,
  refs: PropTypes.arrayOf((
    PropTypes.shape({ current: PropTypes.any }).isRequired
  )).isRequired,
  submitText: PropTypes.string,
  hideSaveAndAddAnother: PropTypes.bool,
};

Form.defaultProps = {
  autoSave: false,
  buttonContainerClassName: styles['buttons-container'],
  className: undefined,
  submitText: 'Save',
  onChange: () => {},
  onSubmit: () => {},
  readOnly: false,
  hideSaveAndAddAnother: false,
};

export default Form;
