import React, {
  createRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
  forwardRef,
} from 'react';
import PropTypes from 'prop-types';
import FormControl from '../form-control/form-control.jsx';
import FormControlIcons from '../form-control-icons/form-control-icons.jsx';
import Icon from '../icon/icon.jsx';
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
import styles from './multi-select.css';

const MultiSelect = forwardRef(function MultiSelect(props, ref) {
  const [autocompleteValue, setAutocompleteValue] = useState('');
  const autocompleteRef = useRef();
  const backupRef = useRef();
  const [expanded, setExpanded] = useState(false);
  const selfRef = ref || backupRef;
  const [validationMessage, setValidationMessage] = useState(props.validationMessage);
  const [value, setValue] = useState(props.value || []);
  const valueRefs = value.map(() => createRef());
  const visibleOptions = getVisibleOptions();
  const visibleOptionsRefs = visibleOptions.map(() => createRef());
  const wrapperRef = useRef(null);

  const ids = {
    emptyMessage: `${props.id}-empty`,
    label: `${props.id}-label`,
    listbox: `${props.id}-listbox`,
    textbox: `${props.id}-autocomplete`,
  };

  const classNames = {
    container: styles.container,
    formControlChildrenContainer: props.readOnly ? styles['form-control-children-container-readonly'] : styles['form-control-children-container'],
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
          <Loader inline />
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
        {props.listboxChildren ?
          props.listboxChildren(visibleOptions, visibleOptionsRefs, onOptionSelect) :
          visibleOptions.map((option, index) => (
            <ListOption
              key={`${props.id}-${props.optionIDGetter(option)}`}
              onSelect={onOptionSelect}
              ref={visibleOptionsRefs[index]}
              value={props.optionIDGetter(option)}
            >
              {props.optionLabelGetter(option)}
            </ListOption>
          ))}
      </Listbox>
    );
  };

  function getOption(id) {
    return props.options.find(option => props.optionIDGetter(option) === id);
  }

  function getVisibleOptions() {
    return props.options
      .filter(option => props.optionLabelGetter(option).toLowerCase().includes(autocompleteValue.toLowerCase()))
      .filter(option => !value.some((val) => {
        const optionID = props.optionIDGetter(option);

        if (typeof optionID === 'string') {
          return val.toLowerCase() === optionID.toLowerCase();
        }

        return val === optionID;
      }));
  }

  function onAutocompleteBlur() {
    if (!autocompleteRef.current) return;

    autocompleteRef.current.setCustomValidity('');
    if (!autocompleteRef.current.validity.valid) {
      setValidationMessage(autocompleteRef.current.validationMessage);
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
      autocompleteRef.current.focus();
    }
  }

  function onOptionSelect(event) {
    const selectedOptionIndex = visibleOptionsRefs.findIndex(optionRef => optionRef === event.target);
    const selectedOption = visibleOptions[selectedOptionIndex];
    setExpanded(false);
    const newValue = [...value, props.optionIDGetter(selectedOption)]
      .sort((a, b) => props.optionIDGetter(a) - props.optionIDGetter(b));
    setValue(newValue);
    setAutocompleteValue('');
    autocompleteRef.current.focus();
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

  useDropdownClose(wrapperRef, expanded, onDropdownClose);

  useEffect(() => {
    setValue(props.value);
  }, [props.value.map(val => JSON.stringify(val)).join(',')]);

  useEffect(() => {
    props.onChange({ target: selfRef.current });
  }, [value.map(val => JSON.stringify(val)).join(',')]);

  useImperativeHandle(selfRef, () => ({
    get dirty() {
      return props.value.map(val => JSON.stringify(val)).join(',') !== this.value.map(val => JSON.stringify(val)).join(',');
    },
    id: props.id,
    name: props.name,
    get value() {
      return value;
    },
  }));

  return (
    <div className={classNames.container} id={props.id} ref={wrapperRef}>
      <FormControl
        label={props.label}
        labelId={ids.label}
        id={ids.textbox}
        error={validationMessage}
        onKeyDown={onKeyDown}
      >
        <div role="presentation" className={classNames.formControlChildrenContainer} onClick={onClick}>
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
                  id={`${props.id}-option-${props.optionIDGetter(getOption(val))}`}
                  key={props.optionIDGetter(getOption(val))}
                  onRemove={onOptionRemove}
                  readOnly={props.readOnly}
                  ref={valueRefs[index]}
                >
                  {props.optionLabelGetter(
                    props.options.find(option => props.optionIDGetter(option) === props.optionIDGetter(getOption(val))),
                  )}
                </Tag>
              ))
            }
            <input
              aria-autocomplete="list"
              aria-controls={ids.listbox}
              aria-describedby={`${ids.emptyMessage}`}
              aria-expanded={expanded}
              aria-haspopup="listbox"
              aria-labelledby={ids.label}
              autoComplete="off"
              role="combobox"
              className={classNames.input}
              id={ids.textbox}
              onBlur={onAutocompleteBlur}
              onChange={onAutocompleteChange}
              placeholder={value.length === 0 ? props.placeholder : undefined}
              readOnly={props.readOnly}
              required={props.required ? value.length === 0 : false}
              ref={autocompleteRef}
              value={autocompleteValue}
            />
          </TagList>
          <FormControlIcons validationMessage={props.validationMessage} className={classNames.iconsContainer}>
            {(!props.readOnly && value.length > 0) && (
              <IconButton
                icon={iconClear}
                label={`Remove all selected options on ${props.label}`}
                onPress={onOptionsClear}
                className={classNames.iconClear}
              />
            )}
            <Icon icon={iconCaretDown} label="Open multi select options" />
          </FormControlIcons>
        </div>
        {dropdownContents()}
      </FormControl>
    </div>
  );
});

MultiSelect.propTypes = {
  classNames: PropTypes.shape({
    container: PropTypes.string,
    formControlChildrenContainer: PropTypes.string,
    input: PropTypes.string,
    tagList: PropTypes.string,
  }),
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  listboxChildren: PropTypes.func, // eslint-disable-line react/no-unused-prop-types
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  options: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.object), PropTypes.arrayOf(PropTypes.string)]).isRequired,
  optionIDGetter: PropTypes.func,
  optionLabelGetter: PropTypes.func,
  placeholder: PropTypes.string,
  readOnly: PropTypes.bool,
  required: PropTypes.bool,
  showLoader: PropTypes.bool, // eslint-disable-line react/no-unused-prop-types
  tagChildren: PropTypes.func,
  validationMessage: PropTypes.string,
  value: PropTypes.arrayOf(PropTypes.string),
};

MultiSelect.defaultProps = {
  classNames: {},
  listboxChildren: undefined,
  onChange: () => { },
  optionIDGetter: option => option,
  optionLabelGetter: option => option,
  placeholder: undefined,
  readOnly: false,
  required: false,
  showLoader: false,
  tagChildren: undefined,
  value: [],
  validationMessage: undefined,
};

export default MultiSelect;
