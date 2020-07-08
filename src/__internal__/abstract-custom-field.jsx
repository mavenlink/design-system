import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import FormControl from '../components/form-control/form-control.jsx';
import styles from '../components/custom-field-input-text/custom-field-input-text.css';
import useValidation from '../hooks/use-validation.jsx';
import Icon from '../components/icon/icon.jsx';
import cautionSvg from '../svgs/icon-caution-fill.svg';

export default function AbstractCustomField(props) {
  const defaultRef = useRef(null);
  const inputRef = props.inputRef || defaultRef;
  const labelId = `${props.id}-label`;

  const invalidDueToProps = () => props.error && !props.readOnly;
  const validationMessage = useValidation(invalidDueToProps, props.helpText, inputRef);

  const icon = () => {
    if (invalidDueToProps()) {
      return (<Icon
        className={styles['input-icon']}
        currentColor="caution"
        name={cautionSvg.id}
        size="medium"
      />);
    }

    if (props.icon) {
      return props.icon;
    }

    return undefined;
  };

  const showIcon = () => {
    return invalidDueToProps() || !!props.icon;
  };

  return (
    <FormControl
      className={props.className}
      error={validationMessage}
      id={props.id}
      labelId={labelId}
      label={props.label}
      readOnly={props.readOnly}
      required={props.required}
    >
      <input
        aria-autocomplete={props.ariaProps.autocomplete}
        aria-controls={labelId}
        aria-haspopup={props.ariaProps.haspopup}
        defaultValue={props.defaultValue}
        className={styles.input}
        disabled={props.disabled}
        id={props.id}
        max={props.max}
        min={props.min}
        name={props.name}
        onBlur={props.onBlur}
        onChange={props.onChange}
        onClick={props.onClick}
        onFocus={props.onFocus}
        onKeyDown={props.onKeyDown}
        onKeyUp={props.onKeyUp}
        placeholder={props.placeholder}
        readOnly={props.readOnly}
        ref={inputRef}
        required={props.required}
        step={props.step}
        type={props.type}
        value={props.value}
      />
      {showIcon() && icon()}
    </FormControl>
  );
}

AbstractCustomField.propTypes = {
  ariaProps: PropTypes.shape({
    autocomplete: PropTypes.string,
    haspopup: PropTypes.string,
  }),
  className: PropTypes.string,
  defaultValue: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
  disabled: PropTypes.bool,
  error: PropTypes.bool,
  helpText: PropTypes.string,
  icon: PropTypes.node,
  id: PropTypes.string.isRequired,
  inputRef: PropTypes.shape({ current: PropTypes.any }),
  label: PropTypes.string.isRequired,
  max: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
  min: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
  name: PropTypes.string,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  onClick: PropTypes.func,
  onFocus: PropTypes.func,
  onKeyDown: PropTypes.func,
  onKeyUp: PropTypes.func,
  placeholder: PropTypes.string,
  readOnly: PropTypes.bool,
  required: PropTypes.bool,
  step: PropTypes.number,
  type: PropTypes.oneOf([
    'date',
    'number',
    'text',
  ]),
  value: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
};

AbstractCustomField.defaultProps = {
  ariaProps: {},
  className: undefined,
  defaultValue: undefined,
  disabled: false,
  error: false,
  helpText: undefined,
  icon: undefined,
  inputRef: undefined,
  max: undefined,
  min: undefined,
  name: undefined,
  onBlur: () => {},
  onChange: () => {},
  onClick: () => {},
  onFocus: () => {},
  onKeyDown: () => {},
  onKeyUp: () => {},
  placeholder: undefined,
  readOnly: false,
  required: false,
  step: undefined,
  type: 'text',
  value: undefined,
};
