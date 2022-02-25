import React, {
  createRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
  forwardRef,
} from 'react';
import PropTypes from 'prop-types';
import Icons from './icons.jsx';
import IconButton from '../icon-button/icon-button.jsx';
import iconCaretDown from '../../svgs/caret-down.svg';
import iconClear from '../../svgs/clear.svg';
import Listbox from '../listbox/listbox.jsx';
import ListOption from '../list-option/list-option.jsx';
import Loader from '../loader/loader.jsx';
import NoOptions from '../no-options/no-options.jsx';
import TagList from '../tag-list/tag-list.jsx';
import Tag from '../tag/tag.jsx';
import useDropdownClose from '../../hooks/use-dropdown-close.js';
import useMountedEffect from '../../hooks/use-mounted-effect.js';
import styles from '../multi-select/multi-select.css';
import useForwardedRef from '../../hooks/use-forwarded-ref.js';

function getFormControlChildrenContainerClassName(readOnly, validationMessage, classNames) {
  if (readOnly) {
    return classNames.formControlChildrenContainerReadOnly;
  }

  if (validationMessage) {
    return classNames.formControlChildrenContainerInvalid;
  }

  return classNames.formControlChildrenContainer;
}

const MultiSelect = forwardRef(function MultiSelect(props, ref) {
  const [autocompleteValue, setAutocompleteValue] = useState('');
  const [expanded, setExpanded] = useState(false);
  const selfRef = useForwardedRef(ref);
  const [validationMessage, setValidationMessage] = useState(props.validationMessage);
  const [value, setValue] = useState(props.value || []);
  const valueRefs = value.map(() => createRef());
  const visibleOptions = getVisibleOptions();
  const visibleOptionsRefs = visibleOptions.map(() => createRef());

  const ids = {
    emptyMessage: `${props.id}-empty`,
    label: `${props.id}-label`,
    listbox: `${props.id}-listbox`,
    textbox: `${props.id}-autocomplete`,
    tooltip: `${props.id}-autocomplete-tooltip`,
    validation: `${props.id}Hint`,
  };
  const refs = {
    autocomplete: useRef(),
    container: props.containerRef,
  };

  const classNames = {
    formControlChildrenContainer: styles['form-control-children-container'],
    formControlChildrenContainerInvalid: styles['form-control-children-container-invalid'],
    formControlChildrenContainerReadOnly: styles['form-control-children-container-readonly'],
    iconClear: styles['icon-clear'],
    iconsContainer: styles['icon-container'],
    input: props.readOnly ? styles['input-readonly'] : styles.input,
    noOptionsContainer: styles['no-options'],
    popupContainer: styles['popup-container'],
    tagList: styles['tag-list'],
    ...props.classNames,
  };

  const dropdownContents = () => {
    if (!expanded) {
      return undefined;
    }

    if (props.showLoader) {
      return (
        <Listbox
          className={classNames.popupContainer}
          id={ids.listbox}
          labelledBy={ids.label}
          refs={[]}
        >
          {() => <Loader inline />}
        </Listbox>
      );
    }

    if (visibleOptions.length === 0) {
      return (<NoOptions className={classNames.noOptionsContainer} id={ids.emptyMessage} />);
    }

    return (
      <Listbox
        className={classNames.popupContainer}
        id={ids.listbox}
        labelledBy={ids.label}
        refs={visibleOptionsRefs}
      >
        {() => (props.listboxChildren
          ? props.listboxChildren(visibleOptions, visibleOptionsRefs, onOptionSelect)
          : visibleOptions.map((option, index) => (
            <ListOption
              key={`${props.id}-${props.optionIDGetter(option)}`}
              onSelect={onOptionSelect}
              ref={visibleOptionsRefs[index]}
              value={props.optionIDGetter(option)}
            >
              {props.optionLabelGetter(option)}
            </ListOption>
          ))
        )}
      </Listbox>
    );
  };

  function getVisibleOptions() {
    const filteredOptions = props.options.filter(option => !value.some((val) => {
      return props.optionIDGetter(val) === props.optionIDGetter(option);
    }));

    if (!props.filterOptions) {
      return filteredOptions;
    }

    return filteredOptions
      .filter(option => props.optionLabelGetter(option).toLowerCase().includes(autocompleteValue.toLowerCase()));
  }

  function onAutocompleteBlur() {
    if (!refs.autocomplete.current) return;

    refs.autocomplete.current.setCustomValidity('');
    if (!refs.autocomplete.current.validity.valid) {
      setValidationMessage(refs.autocomplete.current.validationMessage);
    } else {
      setValidationMessage(props.validationMessage || '');
    }
  }

  function onAutocompleteChange(event) {
    setExpanded(true);
    setAutocompleteValue(event.target.value);
  }

  function onDropdownClose() {
    setExpanded(false);
    setAutocompleteValue('');
  }

  function onOptionRemove(event) {
    const newValue = value.filter((option, index) => (
      valueRefs[index].current !== event.target
    ));
    setValue(newValue);
  }

  function onOptionsClear(event) {
    event.preventDefault();

    if (!props.readOnly) {
      setValue([]);
      setExpanded(false);
      refs.autocomplete.current.focus();
    }
  }

  function onOptionSelect(event) {
    const selectedOptionIndex = visibleOptionsRefs.findIndex(optionRef => optionRef === event.target);
    const selectedOption = visibleOptions[selectedOptionIndex];
    setExpanded(false);
    const newValue = [...value, selectedOption]
      .sort((a, b) => props.optionIDGetter(a) - props.optionIDGetter(b));
    setValue(newValue);
    setAutocompleteValue('');
    refs.autocomplete.current.focus();
  }

  function onClick(event) {
    if (event.defaultPrevented) return;
    if (props.readOnly) return;

    setExpanded(true);
  }

  function onKeyDown(event) {
    switch (event.key) {
      case 'Escape':
        setExpanded(false);
        break;
      default:
    }
  }

  useDropdownClose(refs.container, expanded, onDropdownClose);

  useEffect(() => {
    setValidationMessage(props.validationMessage);
  }, [props.validationMessage]);

  useEffect(() => {
    props.onInvalid({ detail: { validationMessage } });
  }, [validationMessage]);

  useEffect(() => {
    setValue(props.value);
  }, [props.value.map(val => JSON.stringify(val)).join(',')]);

  useMountedEffect(() => {
    props.onChange({ target: selfRef.current });
  }, [value.length]);

  useImperativeHandle(selfRef, () => ({
    get dirty() {
      return props.value.map(val => JSON.stringify(val)).join(',') !== this.value.map(val => JSON.stringify(val)).join(',');
    },
    id: props.id,
    get value() {
      return value;
    },
  }));

  return (
    <>
      <div
        role="presentation"
        className={getFormControlChildrenContainerClassName(props.readOnly, validationMessage, classNames)}
        onClick={onClick}
        onKeyDown={onKeyDown}
      >
        <TagList
          className={classNames.tagList}
          labelledBy={ids.label}
          refs={valueRefs}
        >
          {value.length !== 0 &&
          props.tagChildren ?
            props.tagChildren(value, valueRefs, onOptionRemove) :
            value.map((val, index) => (
              <Tag
                defaultActive={index === 0}
                id={`${props.id}-option-${props.optionIDGetter(val)}`}
                key={props.optionIDGetter(val)}
                onRemove={onOptionRemove}
                readOnly={props.readOnly}
                ref={valueRefs[index]}
              >
                {props.optionLabelGetter(val)}
              </Tag>
            ))
          }
          <input
            aria-autocomplete="list"
            aria-controls={ids.listbox}
            aria-describedby={`${ids.emptyMessage} ${ids.tooltip}`}
            aria-expanded={expanded}
            aria-haspopup="listbox"
            autoComplete="off"
            role="combobox"
            className={classNames.input}
            id={ids.textbox}
            onBlur={onAutocompleteBlur}
            onChange={onAutocompleteChange}
            onInput={props.onInput}
            placeholder={value.length === 0 ? props.placeholder : undefined}
            readOnly={props.readOnly}
            required={props.required ? value.length === 0 : false}
            ref={refs.autocomplete}
            value={autocompleteValue}
          />
        </TagList>
        <Icons
          classNames={{
            container: classNames.iconsContainer,
          }}
          validationMessage={validationMessage}
          validationMessageId={ids.validation}
          validationMessageTooltip
        >
          {(!props.readOnly && value.length > 0) && (
            <IconButton
              icon={iconClear}
              label="Remove all selected options"
              onPress={onOptionsClear}
              className={classNames.iconClear}
            />
          )}
          <IconButton
            disabled={props.readOnly}
            icon={iconCaretDown}
            label="Open options"
            onPress={onClick}
          />
        </Icons>
      </div>
      {dropdownContents()}
    </>
  );
});

MultiSelect.propTypes = {
  classNames: PropTypes.shape({
    formControlChildrenContainer: PropTypes.string,
    formControlChildrenContainerInvalid: PropTypes.string,
    formControlChildrenContainerReadOnly: PropTypes.string,
    input: PropTypes.string,
    tagList: PropTypes.string,
  }),
  // eslint-disable-next-line react/forbid-prop-types
  containerRef: PropTypes.any.isRequired,
  filterOptions: PropTypes.bool,
  id: PropTypes.string.isRequired,
  listboxChildren: PropTypes.func, // eslint-disable-line react/no-unused-prop-types
  onChange: PropTypes.func,
  onInput: PropTypes.func,
  onInvalid: PropTypes.func,
  options: PropTypes.arrayOf(PropTypes.object).isRequired,
  /** the default getters reflect a native `select` element with `option` element children:
   * this matches an object format of { value: 'unique-identifier', label: 'a human readable, filterable string' } */
  optionIDGetter: PropTypes.func,
  optionLabelGetter: PropTypes.func,
  placeholder: PropTypes.string,
  readOnly: PropTypes.bool,
  required: PropTypes.bool,
  showLoader: PropTypes.bool, // eslint-disable-line react/no-unused-prop-types
  tagChildren: PropTypes.func,
  validationMessage: PropTypes.string,
  /** value is expected to be an array of objects that matches the "option" structure */
  value: PropTypes.arrayOf(PropTypes.object),
};

MultiSelect.defaultProps = {
  classNames: {},
  filterOptions: true,
  listboxChildren: undefined,
  onChange: () => {},
  onInput: () => {},
  onInvalid: () => {},
  optionIDGetter: option => option.value,
  optionLabelGetter: option => option.label,
  placeholder: undefined,
  readOnly: false,
  required: false,
  showLoader: false,
  tagChildren: undefined,
  value: [],
  validationMessage: undefined,
};

export default MultiSelect;
