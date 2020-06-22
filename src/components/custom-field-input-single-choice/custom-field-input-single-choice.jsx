import React from 'react';
import PropTypes from 'prop-types';
import CustomFieldInputText from '../custom-field-input-text/custom-field-input-text.jsx';
import Icon from '../icon/icon.jsx';
import iconCaretDown from '../../svgs/icon-caret-down.svg';
import iconCaretDownDisabled from '../../svgs/icon-caret-down-disabled.svg';
import styles from '../custom-field-input-text/custom-field-input-text.css';

export default function CustomFieldInputSingleChoice(props) {
  const caretIcon = (<Icon
    className={styles['input-icon']}
    name={props.readOnly ? iconCaretDownDisabled.id : iconCaretDown.id}
    fill="skip"
  />);

  return (
    <CustomFieldInputText
      icon={caretIcon}
      id={props.id}
      label={props.label}
      placeholder={props.placeholder}
      readOnly={props.readOnly}
      required={props.required}
      value={props.value}
    />
  );
}

CustomFieldInputSingleChoice.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  readOnly: PropTypes.bool,
  required: PropTypes.bool,
  value: PropTypes.string,
};

CustomFieldInputSingleChoice.defaultProps = {
  placeholder: undefined,
  readOnly: false,
  required: false,
  value: undefined,
};
