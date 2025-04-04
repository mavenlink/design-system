import React, {
  forwardRef,
  useImperativeHandle,
  useLayoutEffect,
  useRef,
} from 'react';
import PropTypes from 'prop-types';
import cautionSvg from '../../svgs/caution.svg';
import Icon from '../icon/icon.jsx';
import HelpIcon from '../help-icon/help-icon.jsx';
import useValidation from '../../hooks/use-validation.js';
import styles from './checkbox.css';

const Checkbox = forwardRef(function Checkbox(
  {
    checked,
    className,
    cssContainer,
    id,
    label,
    name,
    onBlur,
    onChange,
    onFocus,
    readOnly,
    required,
    tooltip,
    validationMessage: validationMessageProp,
    value,
  },
  forwardedRef,
) {
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
  const [validationMessage, validate] = useValidation(
    validationMessageProp,
    refs.input,
  );

  useLayoutEffect(() => {
    refs.input.current.checked = checked;
  }, [checked]);

  useImperativeHandle(ref, () => ({
    name,
    id,
    get value() {
      if (value) return value;

      return refs.input.current.checked ? 'on' : 'off';
    },
    get checked() {
      return refs.input.current.checked;
    },
    get dirty() {
      const providedValue = checked || false;
      return providedValue !== this.checked;
    },
  }));

  function handleBlur(event) {
    validate();
    onBlur(event);
  }

  function onClick(event) {
    if (readOnly) event.preventDefault();
  }

  function onKeyDown(event) {
    if (readOnly && event.key === ' ') event.preventDefault();
  }

  return (
    <div
      className={cssContainer}
      onKeyDown={onKeyDown}
      ref={refs.container}
      role="presentation"
    >
      <label htmlFor={ids.input} className={styles.labelInline}>
        <input
          aria-describedby={`${ids.tooltip} ${ids.validation}`}
          className={className}
          defaultChecked={checked}
          id={ids.input}
          name={name}
          onBlur={handleBlur}
          onChange={onChange}
          onClick={onClick}
          onFocus={onFocus}
          onKeyDown={onKeyDown}
          readOnly={readOnly}
          ref={refs.input}
          required={required}
          type="checkbox"
        />
        <div className={validationMessage ? styles.invalidLabel : styles.label}>
          {label}
          {required ? <span aria-hidden> (Required)</span> : null}
        </div>
        {tooltip ? (
          <HelpIcon
            id={ids.tooltip}
            text={tooltip}
            classNames={{ icon: styles.tooltipIcon }}
          />
        ) : null}
      </label>
      {validationMessage ? (
        <div className={styles.invalidLabel}>
          <Icon
            className={styles.inlineInvalidIcon}
            icon={cautionSvg}
            label={validationMessage}
          />
          <span id={ids.validation} aria-hidden="true" aria-live="polite">
            {validationMessage}
          </span>
        </div>
      ) : null}
    </div>
  );
});

Checkbox.propTypes = {
  checked: PropTypes.bool,
  className: PropTypes.string,
  cssContainer: PropTypes.string,
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  name: PropTypes.string,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  readOnly: PropTypes.bool,
  required: PropTypes.bool,
  tooltip: PropTypes.string,
  validationMessage: PropTypes.string,
  value: PropTypes.string,
};

Checkbox.defaultProps = {
  checked: undefined,
  className: styles.input,
  cssContainer: undefined,
  name: undefined,
  onBlur: () => {},
  onChange: () => {},
  onFocus: () => {},
  readOnly: undefined,
  required: undefined,
  tooltip: undefined,
  validationMessage: '',
  value: undefined,
};

export default Checkbox;
