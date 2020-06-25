import React, { useRef, useState } from 'react';
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

  const refs = props.choices.map(() => useRef());
  const caretIcon = (<Icon
    className={styles['input-icon']}
    name={props.readOnly ? iconCaretDownDisabled.id : iconCaretDown.id}
    fill="skip"
  />);

  function onClick() {
    setShowOptions(true);
  }

  function onKeyUp(event) {
    if (event.key === 'Enter') {
      setShowOptions(true);
    } else if (event.key === 'Escape') {
      setShowOptions(false);
    }
  }

  return (
    <div className={styles.container}>
      <CustomFieldInputText
        icon={caretIcon}
        id={props.id}
        label={props.label}
        onClick={onClick}
        onKeyUp={onKeyUp}
        placeholder={props.placeholder}
        readOnly={props.readOnly}
        required={props.required}
        value={props.value}
      />
      { showOptions && (
        <Listbox
          className={styles.dropdown}
          labelledBy={`${props.id}-label`}
          refs={refs}
        >
          { props.choices.map(item => <ListOption key={item}>{item}</ListOption>) }
        </Listbox>
      ) }
    </div>
  );
}

CustomFieldInputSingleChoice.propTypes = {
  id: PropTypes.string.isRequired,
  choices: PropTypes.arrayOf(PropTypes.string),
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  readOnly: PropTypes.bool,
  required: PropTypes.bool,
  value: PropTypes.string,
};

CustomFieldInputSingleChoice.defaultProps = {
  choices: [],
  placeholder: undefined,
  readOnly: false,
  required: false,
  value: undefined,
};
