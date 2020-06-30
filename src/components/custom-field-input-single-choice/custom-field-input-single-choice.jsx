import React, {
  useEffect,
  useRef,
  useState,
} from 'react';
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
  const [value, setValue] = useState(props.value);
  const [searchValue, setSearchValue] = useState(undefined);
  const editRef = useRef();

  const refs = props.choices.map(() => useRef());
  const caretIcon = (<Icon
    className={styles['input-icon']}
    name={props.readOnly ? iconCaretDownDisabled.id : iconCaretDown.id}
    fill="skip"
  />);

  useEffect(() => {
    if (showOptions && !props.readOnly) {
      editRef.current.focus();
    }
  }, [showOptions]);

  function onClick() {
    setShowOptions(!props.readOnly);
  }

  function onKeyUp(event) {
    if (event.key === 'Enter') {
      setShowOptions(!props.readOnly);
    } else if (event.key === 'Escape') {
      setShowOptions(false);
    }
  }

  function getOptions() {
    const choices = {};
    props.choices.forEach((item, index) => { choices[item.id] = { ...item, index }; });

    if (searchValue) {
      const searchValueLowerCase = searchValue.toLowerCase();

      return props.choices
        .filter(item => item.label.toLowerCase().includes(searchValueLowerCase))
        .map(item => choices[item.id]);
    }

    return props.choices.map(item => choices[item.id]);
  }

  const listOptions = () => {
    return getOptions()
      .map(item => (
        <ListOption
          key={item.id}
          ref={refs[item.index]}
          selected={value && item.id === value.id}
          value={{
            id: item.id,
            label: item.label,
          }}
        >
          {item.label}
        </ListOption>
      ));
  };

  function onSelectionChange(event) {
    setValue(event.target.value);
    setShowOptions(false);
  }

  function onSearchChange(event) {
    setSearchValue(event.target.value);
  }

  const customTextField = () => {
    const sharedProps = {
      icon: caretIcon,
      id: props.id,
      key: showOptions ? 'single-choice-edit-mode' : 'single-choice-view-mode',
      label: props.label,
      onChange: showOptions ? onSearchChange : onSelectionChange,
      onClick,
      onKeyUp,
      placeholder: props.placeholder,
      readOnly: props.readOnly,
      required: props.required,
    };

    if (showOptions) {
      return (<CustomFieldInputText
        {...sharedProps}
        defaultValue={value ? value.label : ''}
        inputRef={editRef}
      />);
    }

    return (<CustomFieldInputText
      {...sharedProps}
      value={value ? value.label : ''}
    />);
  };

  return (
    <div className={styles.container}>
      { customTextField() }
      { showOptions && (
        <Listbox
          className={styles.dropdown}
          labelledBy={`${props.id}-label`}
          onChange={onSelectionChange}
          refs={refs}
          value={value}
        >
          { listOptions() }
        </Listbox>
      ) }
    </div>
  );
}

const ChoiceType = PropTypes.shape({
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
});

CustomFieldInputSingleChoice.propTypes = {
  id: PropTypes.string.isRequired,
  choices: PropTypes.arrayOf(ChoiceType),
  // eslint-disable-next-line react/no-unused-prop-types
  label: PropTypes.string.isRequired,
  // eslint-disable-next-line react/no-unused-prop-types
  placeholder: PropTypes.string,
  readOnly: PropTypes.bool,
  // eslint-disable-next-line react/no-unused-prop-types
  required: PropTypes.bool,
  value: ChoiceType,
};

CustomFieldInputSingleChoice.defaultProps = {
  choices: [],
  placeholder: undefined,
  readOnly: false,
  required: false,
  value: undefined,
};
