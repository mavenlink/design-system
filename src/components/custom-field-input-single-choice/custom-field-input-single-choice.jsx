import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import PropTypes from 'prop-types';
import AbstractCustomField from '../__internal__/abstract-custom-field/abstract-custom-field.jsx';
import Icon from '../icon/icon.jsx';
import iconClear from '../../svgs/icon-clear-small.svg';
import iconCaretDown from '../../svgs/icon-caret-down.svg';
import iconCaretDownDisabled from '../../svgs/icon-caret-down-disabled.svg';
import styles from './custom-field-input-single-choice.css';
import Listbox from '../listbox/listbox.jsx';
import ListOption from '../list-option/list-option.jsx';
import NoOptions from '../no-options/no-options.jsx';
import useValidation from '../../hooks/use-validation.jsx';
import useDropdownClose from '../../hooks/use-dropdown-close.js';

const CustomFieldInputSingleChoice = forwardRef(function CustomFieldInputSingleChoice(props, ref) {
  const [showOptions, setShowOptions] = useState(false);
  const [value, setValue] = useState(props.value);
  const [searchValue, setSearchValue] = useState(undefined);
  const inputRef = useRef();

  const validationMessage = useValidation(props.readOnly, props.errorText, inputRef, false);
  const refs = props.choices.map(() => useRef());
  const caretIcon = (<Icon
    className={styles['input-icon']}
    name={props.readOnly ? iconCaretDownDisabled.id : iconCaretDown.id}
    fill="skip"
  />);

  const defaultValue = value ? value.label : '';

  const wrapperRef = useRef(null);
  const handleDropdownClose = () => {
    setShowOptions(false);
    setSearchValue(defaultValue);
  };
  useDropdownClose(wrapperRef, showOptions, handleDropdownClose);

  const clear = () => {
    setValue(undefined);
    setSearchValue(undefined);
  };

  const clearIcon = () => {
    if (!props.readOnly && (value || searchValue)) {
      return (<Icon
        name={iconClear.id}
        onClick={clear}
      />);
    }

    return undefined;
  };

  function onClick() {
    if (!props.readOnly) setShowOptions(true);
  }

  function onKeyDown(event) {
    switch (event.key) {
      case 'Enter':
        event.preventDefault();
        if (!showOptions && !props.readOnly) setShowOptions(true);
        break;
      case 'Escape':
        event.preventDefault();
        setShowOptions(false);
        break;
      default:
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

  const listOptions = (choices) => {
    return choices
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
    const selectedValue = event.target.value;
    setValue(selectedValue);
    setSearchValue(selectedValue.label);
    setShowOptions(false);
    inputRef.current.focus();
  }

  function onSearchChange(event) {
    const newValue = event.target.value;

    if (newValue === '') {
      setValue(undefined);
      setSearchValue(undefined);
      return;
    }

    setSearchValue(newValue);
    setShowOptions(true);
  }

  useImperativeHandle(ref, () => ({
    id: props.id,
    get value() {
      return [value.id];
    },
  }));

  const choices = getOptions();

  return (
    <div ref={wrapperRef} className={styles.container}>
      <AbstractCustomField
        icon={caretIcon}
        clear={clearIcon()}
        id={props.id}
        label={props.label}
        onChange={onSearchChange}
        onClick={onClick}
        onKeyDown={onKeyDown}
        placeholder={props.placeholder}
        readOnly={props.readOnly}
        inputRef={inputRef}
        required={props.required}
        errorText={validationMessage}
        value={searchValue || defaultValue}
      />
      { showOptions && (
        choices.length === 0 ? (<NoOptions className={styles['no-options']} />) : (
          <Listbox
            className={styles.dropdown}
            labelledBy={`${props.id}-label`}
            onChange={onSelectionChange}
            refs={refs}
            value={value}
          >
            { listOptions(choices) }
          </Listbox>
        )
      )}
    </div>
  );
});

const ChoiceType = PropTypes.shape({
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
});

CustomFieldInputSingleChoice.propTypes = {
  id: PropTypes.string.isRequired,
  choices: PropTypes.arrayOf(ChoiceType),
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  readOnly: PropTypes.bool,
  required: PropTypes.bool,
  value: ChoiceType,
  errorText: PropTypes.string,
};

CustomFieldInputSingleChoice.defaultProps = {
  choices: [],
  placeholder: undefined,
  readOnly: false,
  required: false,
  value: undefined,
  errorText: undefined,
};

export default CustomFieldInputSingleChoice;
