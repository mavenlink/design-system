import React, { useState } from 'react';
import PropTypes from 'prop-types';
import CustomFieldInputText from '../custom-field-input-text/custom-field-input-text.jsx';
import Icon from '../icon/icon.jsx';
import iconCaretDown from '../../svgs/icon-caret-down.svg';
import iconCaretDownDisabled from '../../svgs/icon-caret-down-disabled.svg';
import styles from './custom-field-input-single-choice.css';
import Listbox from '../listbox/listbox.jsx';
import ListOption from '../list-option/list-option.jsx';

export default function CustomFieldInputSingleChoice(props) {
  const [showOptions, setShowOptions] = useState(false);

  const caretIcon = (<Icon
    className={styles['input-icon']}
    name={props.readOnly ? iconCaretDownDisabled.id : iconCaretDown.id}
    fill="skip"
  />);

  const generateOptions = () => {
    const refs = props.options.map(_ => React.createRef());
    const children = props.options.map(item => <ListOption key={item}>{item}</ListOption>);

    return (
      <Listbox className={styles.dropdown} labelledBy={`${props.id}-label`} refs={refs}>
        { children }
      </Listbox>
    );
  };

  function onBlur() {
    setShowOptions(false);
  }

  function onClick() {
    setShowOptions(true);
  }

  function onKeyUp(event) {
    if (event.key === 'Enter') {
      setShowOptions(true);
    }
  }

  return (
    <div className={styles.container}>
      <CustomFieldInputText
        icon={caretIcon}
        id={props.id}
        label={props.label}
        onBlur={onBlur}
        onClick={onClick}
        onKeyUp={onKeyUp}
        placeholder={props.placeholder}
        readOnly={props.readOnly}
        required={props.required}
        value={props.value}
      />
      { showOptions && generateOptions() }
    </div>
  );
}

CustomFieldInputSingleChoice.propTypes = {
  id: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.string.isRequired),
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  readOnly: PropTypes.bool,
  required: PropTypes.bool,
  value: PropTypes.string,
};

CustomFieldInputSingleChoice.defaultProps = {
  options: [],
  placeholder: undefined,
  readOnly: false,
  required: false,
  value: undefined,
};
