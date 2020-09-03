import React, {
  createRef,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import PropTypes from 'prop-types';
import AbstractCustomField from '../__internal__/abstract-custom-field/abstract-custom-field.jsx';
import Icon from '../icon/icon.jsx';
import IconButton from '../icon-button/icon-button.jsx';
import iconClear from '../../svgs/clear.svg';
import iconCaretDown from '../../svgs/caret-down.svg';
import iconCaretDownDisabled from '../../svgs/caret-down-disabled.svg';
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
  const backupRef = useRef();
  const selfRef = ref || backupRef;

  const validationMessage = useValidation(props.readOnly, props.errorText, inputRef, false);
  const refs = props.choices.map(() => createRef());
  const caretIcon = (<Icon
    className={styles['input-icon']}
    icon={props.readOnly ? iconCaretDownDisabled : iconCaretDown}
    v={2}
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
    inputRef.current.focus();
  };

  const clearIcon = () => {
    if (!props.readOnly && (value || searchValue)) {
      return (<IconButton
        icon={iconClear}
        label={'Remove selected choice'}
        onPress={clear}
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
      clear();
      return;
    }

    setSearchValue(newValue);
    setShowOptions(true);
  }

  useImperativeHandle(selfRef, () => ({
    id: props.id,
    get value() {
      return value ? [value.id] : [];
    },
  }));

  useEffect(() => {
    props.onChange(selfRef.current);
  }, [value]);

  const choices = getOptions();

  return (
    <div ref={wrapperRef} className={props.className}>
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
        inputRole={'combobox'}
        ariaProps={{
          autocomplete: 'list',
          controls: `${props.id}-single-choice-listbox`,
          expanded: showOptions,
          haspopup: 'listbox',
        }}
      />
      { showOptions && (
        choices.length === 0 ? (<NoOptions className={styles['no-options']} />) : (
          <Listbox
            className={styles.dropdown}
            id={`${props.id}-single-choice-listbox`}
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
  id: PropTypes.number.isRequired,
  label: PropTypes.string.isRequired,
});

CustomFieldInputSingleChoice.propTypes = {
  id: PropTypes.string.isRequired,
  choices: PropTypes.arrayOf(ChoiceType),
  className: PropTypes.string,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  readOnly: PropTypes.bool,
  required: PropTypes.bool,
  value: ChoiceType,
  errorText: PropTypes.string,
};

CustomFieldInputSingleChoice.defaultProps = {
  choices: [],
  className: styles.container,
  onChange: () => {},
  placeholder: undefined,
  readOnly: false,
  required: false,
  value: undefined,
  errorText: undefined,
};

export default CustomFieldInputSingleChoice;
