import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import PropTypes, {func} from 'prop-types';
import Icons from './icons.jsx';
import IconButton from '../icon-button/icon-button.jsx';
import iconClear from '../../svgs/clear.svg';
import iconCaretDown from '../../svgs/caret-down.svg';
import iconCaretDownDisabled from '../../svgs/caret-down-disabled.svg';
import Listbox from '../listbox/listbox.jsx';
import NoOptions from '../no-options/no-options.jsx';
import styles from './select.css';
import useValidation from '../../hooks/use-validation.js';
import useDropdownClose from '../../hooks/use-dropdown-close.js';
import useMountedEffect from '../../hooks/use-mounted-effect.js';
import useForwardedRef from '../../hooks/use-forwarded-ref.js';

const Select = forwardRef(function Select(props, ref) {
  const [showOptions, setShowOptions] = useState(false);
  const [value, setValue] = useState(props.value);
  const [hasBeenBlurred, setBeenBlurred] = useState(false);
  const [searchValue, setSearchValue] = useState(undefined);
  const selfRef = useForwardedRef(ref);

  const defaultValue = value ? props.displayValueEvaluator(value) : '';

  const wrapperRef = useForwardedRef(props.wrapperRef);
  const handleDropdownClose = () => {
    setShowOptions(false);
    setSearchValue(defaultValue);
  };
  useDropdownClose(wrapperRef, showOptions, handleDropdownClose);

  const refs = {
    listbox: useRef(),
    input: useRef(),
  };

  const [validationMessage, validate] = useValidation(props.validationMessage, refs.input);
  const invalid = validationMessage.length > 0;

  const classNames = {
    container: undefined,
    input: styles.input,
    invalidInput: styles['input-invalid'],
    ...props.classNames,
  };

  const ids = {
    input: props.id,
    label: props.labelledBy,
    listbox: `${props.id}-single-choice-listbox`,
    tooltip: `${props.id}-tooltip`,
    validation: `${props.id}Hint`,
  };

  const clear = () => {
    props.onChange({ target: { ...selfRef.current, value: undefined } });
    setValue(undefined);
    setSearchValue(undefined);
    refs.input.current.focus();
  };

  function onBlur(event) {
    if (!(refs.listbox.current && refs.listbox.current.contains(event.relatedTarget))) {
      validate();
    }

    setBeenBlurred(true);
  }

  function onFocus(event) {
    if (props.readOnly) return;
    if (showOptions) return;
    props.onFocus(event);
  }

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
        if (showOptions) {
          event.nativeEvent.stopImmediatePropagation();
        }
        setShowOptions(false);
        break;
      case 'ArrowDown':
        event.preventDefault();
        setShowOptions(true);
        refs.listbox.current?.focus();
        break;
      default:
    }
  }

  function onSelectionChange(event) {
    const selectedValue = event.target.value;
    if (event.target.value) {
      setValue(selectedValue);
      setSearchValue(selectedValue.label);
    }
    setShowOptions(false);
    refs.input.current.focus();
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
    /** The name of the control element which is used to reference the data after submitting the control. */
    name: props.name,
    get value() {
      return value;
    },
  }));

  useEffect(() => {
    props.onInvalid({
      target: selfRef.current,
      detail: {
        validationMessage,
      },
    });
  }, [validationMessage]);

  useMountedEffect(() => {
    setValue(props.value);

    if (props.value === undefined || props.value === null) {
      setSearchValue(undefined);
    }
  }, [props.value]);

  useMountedEffect(() => {
    if (hasBeenBlurred) {
      validate();
    }

    if (JSON.stringify(props.value) === JSON.stringify(value)) return;

    props.onChange({ target: selfRef.current });
  }, [value]);

  useEffect(() => {
    if (searchValue) {
      if (!props.displayValueEvaluator) return;
      props.listOptionRefs
        .filter(_ref => _ref.current)
        .forEach((_ref) => {
          const displayValue = props.displayValueEvaluator(_ref.current.value);
          const matches = displayValue.toLowerCase().includes(searchValue.toLowerCase());
          _ref.current.setVisible(matches);
        });
    } else {
      props.listOptionRefs
        .filter(_ref => _ref.current)
        .forEach(_ref => _ref.current.setVisible(true));
    }
  }, [searchValue, props.listOptionRefs]);

  useEffect(() => {
    props.listOptionRefs
      .filter(_ref => _ref.current)
      .forEach(_ref => _ref.current.setSelected(JSON.stringify(value) === JSON.stringify(_ref.current.value)));
  }, [value, showOptions]);

  return (
    <div
      className={classNames.container}
      style={{ height: '100%', position: 'relative' }}
      onFocus={onFocus}
    >
      <input
        autoComplete="off"
        aria-autocomplete="none"
        aria-controls={ids.listbox}
        aria-haspopup="listbox"
        aria-expanded={showOptions}
        aria-invalid={invalid ? 'true' : undefined}
        aria-describedby={`${ids.tooltip} ${ids.validation}`}
        className={invalid ? classNames.invalidInput : classNames.input}
        id={ids.input}
        role="combobox"
        name={props.name}
        onBlur={onBlur}
        onChange={onSearchChange}
        onClick={onClick}
        onKeyDown={onKeyDown}
        onInput={props.onInput}
        placeholder={props.placeholder}
        readOnly={props.readOnly}
        ref={refs.input}
        required={props.required}
        style={{ '--numIcon': 3 }}
        type="text"
        value={searchValue ?? defaultValue ?? ''}
      />
      <Icons
        validationMessage={validationMessage}
        validationMessageId={ids.validation}
      >
        {!props.readOnly && (value || searchValue) ? (
          <IconButton
            icon={iconClear}
            label={'Remove selected choice'}
            onPress={clear}
          />
        ) : undefined}
        <IconButton
          disabled={props.readOnly}
          icon={props.readOnly ? iconCaretDownDisabled : iconCaretDown}
          label={props.readOnly ? 'Select is not editable' : 'Open choices listbox'}
          onPress={onClick}
        />
      </Icons>
      { showOptions && (
        <Listbox
          className={styles.dropdown}
          id={`${props.id}-single-choice-listbox`}
          labelledBy={`${props.id}-label`}
          onChange={onSelectionChange}
          ref={refs.listbox}
          refs={props.listOptionRefs}
          value={value}
        >
          {({ onSelect }) => {
            const options = props.children({ onSelect });
            if (React.Children.count(options) === 0) return <NoOptions />;
            return options;
          }}
        </Listbox>
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
  children: PropTypes.func,
  classNames: PropTypes.shape({
    container: PropTypes.string,
    input: PropTypes.string,
    invalidInput: PropTypes.string,
  }),
  /** Function is passed `value`, default returns value without modification, should always return a `string`. You *should* set this if your `value` is not of type `string`. Pass in `false` to prevent filtering. */
  displayValueEvaluator: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.bool,
  ]),
  id: PropTypes.string.isRequired,
  labelledBy: PropTypes.string.isRequired,
  listOptionRefs: PropTypes.arrayOf(ListOptionRefType).isRequired,
  name: PropTypes.string.isRequired,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  onInput: PropTypes.func,
  onInvalid: PropTypes.func,
  placeholder: PropTypes.string,
  readOnly: PropTypes.bool,
  required: PropTypes.bool,
  // type: PropTypes.oneOf(['cell', 'field']).isRequired,
  validationMessage: PropTypes.string,
  value: PropTypes.any, // eslint-disable-line react/forbid-prop-types
  wrapperRef: PropTypes.shape({ current: PropTypes.any }), // eslint-disable-line react/forbid-prop-types
};

Select.defaultProps = {
  children: () => {},
  classNames: {},
  displayValueEvaluator: value => value,
  onBlur: () => {},
  onChange: () => {},
  onFocus: () => {},
  onInput: () => {},
  onInvalid: () => {},
  placeholder: undefined,
  readOnly: false,
  required: false,
  validationMessage: '',
  value: undefined,
  wrapperRef: undefined,
};

export default Select;
