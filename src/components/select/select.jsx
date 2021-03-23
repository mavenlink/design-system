import React, {
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
import styles from './select.css';
import Listbox from '../listbox/listbox.jsx';
import NoOptions from '../no-options/no-options.jsx';
import useValidation from '../../hooks/use-validation.jsx';
import useDropdownClose from '../../hooks/use-dropdown-close.js';
import useMounted from '../../hooks/use-mounted.js';

const Select = forwardRef(function Select(props, ref) {
  const [showOptions, setShowOptions] = useState(false);
  const [value, setValue] = useState(props.value);
  const [hasBeenFocused, setBeenFocused] = useState(false);
  const [searchValue, setSearchValue] = useState(undefined);
  const mounted = useMounted();
  const inputRef = useRef();
  const backupRef = useRef();
  const selfRef = ref || backupRef;

  const [validationMessage, validate] = useValidation(props.errorText, inputRef);
  const caretIcon = (<Icon
    className={styles['input-icon']}
    icon={props.readOnly ? iconCaretDownDisabled : iconCaretDown}
    label={props.readOnly ? 'Select is not editable' : 'Open choices listbox'}
  />);

  const defaultValue = value ? props.displayValueEvaluator(value) : '';

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
        className={styles['clear-button']}
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
    get dirty() {
      return props.value !== this.value;
    },
    id: props.id,
    name: props.name,
    get value() {
      return value;
    },
  }));

  useEffect(() => {
    if (!mounted.current) return;

    setValue(props.value);
  }, [props.value]);

  useEffect(() => {
    if (!mounted.current) return;

    if (!hasBeenFocused) {
      return;
    }

    validate();

    if (props.value === value) return;

    props.onChange({ target: selfRef.current });
  }, [value]);

  function handleFocus() {
    setBeenFocused(true);
    validate();
  }

  useEffect(function updateOptionVisibility() {
    if (searchValue) {
      props.listOptionRefs.forEach((listOptionRef) => {
        if (listOptionRef.current) {
          const listOptionDisplayValue = props.displayValueEvaluator(listOptionRef.current.value);

          listOptionRef.current.setVisible(listOptionDisplayValue.includes(searchValue));
        }
      });
    } else {
      props.listOptionRefs.forEach((listOptionRef) => {
        if (listOptionRef.current) {
          listOptionRef.current.setVisible(true);
        }
      });
    }
  }, [searchValue, props.listOptionRefs]);

  useEffect(function updateOptionSelected() {
    props.listOptionRefs.forEach((listOptionRef) => {
      if (listOptionRef.current) {
        listOptionRef.current.setSelected(JSON.stringify(value) === JSON.stringify(listOptionRef.current.value));
      }
    });
  }, [value, showOptions]);

  return (
    <div ref={wrapperRef} className={props.className}>
      <AbstractCustomField
        icon={caretIcon}
        clear={clearIcon()}
        id={props.id}
        label={props.label}
        name={props.name}
        onChange={onSearchChange}
        onClick={onClick}
        onKeyDown={onKeyDown}
        placeholder={props.placeholder}
        readOnly={props.readOnly}
        inputRef={inputRef}
        required={props.required}
        errorText={validationMessage}
        value={searchValue || defaultValue}
        onFocus={handleFocus}
        inputRole={'combobox'}
        ariaProps={{
          autocomplete: 'none',
          controls: `${props.id}-single-choice-listbox`,
          expanded: showOptions,
          haspopup: 'listbox',
        }}
        autoComplete="off"
      />
      { showOptions && (
        (!props.children || props.children.length === 0) ? (<NoOptions className={styles['no-options']} />) : (
          <Listbox
            className={styles.dropdown}
            id={`${props.id}-single-choice-listbox`}
            labelledBy={`${props.id}-label`}
            onChange={onSelectionChange}
            refs={props.listOptionRefs}
            value={value}
          >
            {props.children}
          </Listbox>
        )
      )}
    </div>
  );
});

const ListOptionRefType = PropTypes.shape({
  current: PropTypes.shape({
    contains: PropTypes.func,
    setActive: PropTypes.func,
    value: PropTypes.any,
  }),
});

Select.propTypes = {
  id: PropTypes.string.isRequired,
  children: PropTypes.node,
  className: PropTypes.string,
  /** Function is passed `value`, default returns value without modification, should always return a `string`. You *should* set this if your `value` is not of type `string`. */
  displayValueEvaluator: PropTypes.func,
  errorText: PropTypes.string,
  label: PropTypes.string.isRequired,
  listOptionRefs: PropTypes.arrayOf(ListOptionRefType).isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  readOnly: PropTypes.bool,
  required: PropTypes.bool,
  value: PropTypes.any, // eslint-disable-line react/forbid-prop-types
};

Select.defaultProps = {
  children: undefined,
  className: styles.container,
  displayValueEvaluator: value => value,
  errorText: '',
  onChange: () => {},
  placeholder: undefined,
  readOnly: false,
  required: false,
  value: undefined,
};

export default Select;
