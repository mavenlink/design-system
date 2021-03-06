import PropTypes from 'prop-types';
import React, {
  forwardRef,
  useLayoutEffect,
  useRef,
  useImperativeHandle,
} from 'react';
import cautionSvg from '../../svgs/caution.svg';
import FormControl from '../form-control/form-control.jsx';
import Icon from '../icon/icon.jsx';
import useMounted from '../../hooks/use-mounted.js';
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
  const textareaRef = useRef();
  const mounted = useMounted();
  const [validationMessageValue, validate] = useValidation(validationMessage, textareaRef);

  function blurHandler(event) {
    validate();
    onBlur(event);
  }

  function changeHandler(event) {
    onChange(event);
  }

  useLayoutEffect(() => {
    if (!mounted.current) return;

    textareaRef.current.value = value || '';
  }, [value]);

  useImperativeHandle(ref, () => ({
    get dirty() {
      const providedValue = value || '';
      return providedValue !== this.value;
    },
    id,
    name,
    get value() {
      return textareaRef.current.value;
    },
  }));

  const ids = {
    input: id,
    tooltip: `${id}-tooltip`,
    validation: `${id}Hint`,
  };

  return (
    <FormControl
      className={cssContainer}
      error={validationMessageValue}
      id={ids.input}
      label={label}
      readOnly={readOnly}
      required={required}
      tooltip={tooltip}
    >
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
        ref={textareaRef}
        required={required}
      />
      {!!validationMessageValue && (
        <Icon
          className={styles['invalid-icon']}
          icon={cautionSvg}
          label={validationMessageValue}
        />
      )}
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
