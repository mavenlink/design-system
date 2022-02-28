import PropTypes from 'prop-types';
import React, {
  forwardRef,
  useRef,
  useImperativeHandle,
} from 'react';
import cautionSvg from '../../svgs/caution.svg';
import FormControl from '../form-control/form-control.jsx';
import Icon from '../icon/icon.jsx';
import useMountedLayoutEffect from '../../hooks/use-mounted-layout-effect.js';
import useValidation from '../../hooks/use-validation.jsx';
import styles from './textarea.css';

function getClassName(className, validationMessage) {
  if (className) return className;
  return validationMessage ? styles['invalid-textarea'] : styles.textarea;
}

const Textarea = forwardRef(function Textarea({
  className,
  cssContainer,
  id,
  label,
  name,
  onChange,
  onBlur,
  placeholder,
  readOnly,
  required,
  tooltip,
  validationMessage,
  value,
}, forwardedRef) {
  const fallbackRef = useRef();
  const ref = forwardedRef || fallbackRef;

  const ids = {
    input: id,
    label: `${id}-label`,
    tooltip: `${id}-tooltip`,
    validation: `${id}Hint`,
  };
  const refs = {
    control: useRef(),
    input: useRef(),
  };

  const [validationMessageValue, validate] = useValidation(validationMessage, refs.input);

  function blurHandler(event) {
    validate();
    onBlur(event);
  }

  function changeHandler(event) {
    onChange(event);
  }

  useMountedLayoutEffect(() => {
    refs.input.current.value = value || '';
  }, [value]);

  useImperativeHandle(ref, () => ({
    ...refs.control.current,
    get dirty() {
      const providedValue = value || '';
      return providedValue !== this.value;
    },
    get value() {
      return refs.input.current.value;
    },
  }));

  return (
    <FormControl
      className={cssContainer}
      error={validationMessageValue}
      id={ids.input}
      label={label}
      labelId={ids.label}
      name={name}
      readOnly={readOnly}
      ref={refs.control}
      required={required}
      tooltip={tooltip}
      validationMessage={validationMessageValue}
    >
      <div style={{ position: 'relative' }}>
        <textarea
          aria-describedby={`${ids.tooltip} ${ids.validation}`}
          className={getClassName(className, validationMessageValue)}
          defaultValue={value}
          id={ids.input}
          name={name}
          onBlur={blurHandler}
          onChange={changeHandler}
          placeholder={placeholder}
          readOnly={readOnly}
          ref={refs.input}
          required={required}
        />
        {!!validationMessageValue && (
          <Icon
            className={styles['invalid-icon']}
            icon={cautionSvg}
            id={ids.validation}
            label={validationMessageValue}
          />
        )}
      </div>
    </FormControl>
  );
});

Textarea.propTypes = {
  className: PropTypes.string,
  cssContainer: PropTypes.string,
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  name: PropTypes.string,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  readOnly: PropTypes.bool,
  required: PropTypes.bool,
  tooltip: PropTypes.string,
  validationMessage: PropTypes.string,
  value: PropTypes.string,
};

Textarea.defaultProps = {
  className: undefined,
  cssContainer: undefined,
  name: undefined,
  onBlur: () => {},
  onChange: () => {},
  placeholder: undefined,
  readOnly: undefined,
  required: undefined,
  tooltip: undefined,
  validationMessage: '',
  value: undefined,
};

export default Textarea;
