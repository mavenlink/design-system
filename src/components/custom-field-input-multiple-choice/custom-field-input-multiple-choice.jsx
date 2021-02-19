import React, {
  createRef,
  useEffect,
  useImperativeHandle,
  useLayoutEffect,
  useRef,
  useState,
  forwardRef,
} from 'react';
import PropTypes from 'prop-types';
import FormControl from '../form-control/form-control.jsx';
import Icon from '../icon/icon.jsx';
import IconButton from '../icon-button/icon-button.jsx';
import iconCaretDown from '../../svgs/caret-down.svg';
import iconCaretDownDisabled from '../../svgs/caret-down-disabled.svg';
import iconCaution from '../../svgs/caution.svg';
import iconClear from '../../svgs/clear.svg';
import Listbox from '../listbox/listbox.jsx';
import ListOption from '../list-option/list-option.jsx';
import TagList from '../tag-list/tag-list.jsx';
import Tag from '../tag/tag.jsx';
import NoOptions from '../no-options/no-options.jsx';
import styles from './custom-field-input-multiple-choice.css';
import useDropdownClose from '../../hooks/use-dropdown-close.js';
import useMounted from '../../hooks/use-mounted.js';
import useValidation from '../../hooks/use-validation.jsx';

function getClassName(className, readOnly, errorText) {
  if (className) return className;
  if (readOnly) return styles['read-only-container'];
  if (errorText) return styles['invalid-container'];

  return styles['read-write-container'];
}

const CustomFieldInputMultipleChoice = forwardRef(function CustomFieldInputMultipleChoice(props, ref) {
  const autocompleteRef = useRef();
  const [autocompleteValue, setAutocompleteValue] = useState('');
  const [expanded, setExpanded] = useState(false);
  const [value, setValue] = useState(props.value);
  const [validationMessage, validate] = useValidation(props.errorText, autocompleteRef);
  const visibleChoices = getVisibleChoices();
  const choicesRefs = visibleChoices.map(() => createRef());
  const valueRefs = value.map(() => createRef());
  const classContainer = getClassName(props.className, props.readOnly, validationMessage);
  const renderPopup = !props.readOnly && expanded;
  const backupRef = useRef();
  const selfRef = ref || backupRef;
  const ids = {
    emptyMessage: `${props.id}-empty`,
    errorMessage: `${props.id}-autocompleteHint`,
    label: `${props.id}-label`,
    listbox: `${props.id}-listbox`,
    textbox: `${props.id}-autocomplete`,
  };
  const mounted = useMounted();
  const wrapperRef = useRef(null);

  const handleDropdownClose = () => {
    setExpanded(false);
    setAutocompleteValue('');
  };
  useDropdownClose(wrapperRef, expanded, handleDropdownClose);

  function getVisibleChoices() {
    return props.choices
      .filter(choice => choice.label.includes(autocompleteValue))
      .filter(choice => !value.some(val => val.id === choice.id));
  }

  function onChoiceRemove(event) {
    const newValue = value.filter((choice, index) => (
      valueRefs[index].current !== event.target
    ));
    setValue(newValue);
  }

  function onChoiceSelect(event) {
    const selectedChoiceIndex = choicesRefs.findIndex(choiceRef => choiceRef === event.target);
    const selectedChoice = visibleChoices[selectedChoiceIndex];
    setExpanded(false);
    const newValue = [...value, selectedChoice].sort((a, b) => a.id - b.id);
    setValue(newValue);
    setAutocompleteValue('');
    autocompleteRef.current.focus();
  }

  function onChoicesClear(event) {
    event.preventDefault();
    setValue([]);
    setExpanded(false);
    autocompleteRef.current.focus();
  }

  function onAutocompleteBlur() {
    validate();
  }

  function onAutocompleteChange(event) {
    setExpanded(true);
    setAutocompleteValue(event.target.value);
  }

  function onClick(event) {
    if (event.defaultPrevented) return;

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

  useEffect(() => {
    if (expanded && autocompleteRef.current) {
      autocompleteRef.current.focus();
    }
  }, [expanded]);

  useEffect(() => {
    props.onChange({ target: selfRef.current });
  }, [value]);

  useLayoutEffect(() => {
    if (mounted.current) validate();
  }, [value]);

  useEffect(() => {
    setValue(props.value);
  }, [props.value.map(choice => choice.id).join('')]);

  useImperativeHandle(selfRef, () => ({
    get dirty() {
      return props.value.map(v => v.id).join(',') !== this.value.join(',');
    },
    id: props.id,
    name: props.name,
    get value() {
      return value ? value.map(v => v.id) : [];
    },
  }));

  return (
    <div ref={wrapperRef} className={styles['component-root']}>
      <FormControl
        error={validationMessage}
        label={props.label}
        labelId={ids.label}
        id={ids.textbox}
        onKeyDown={onKeyDown}
        readOnly={props.readOnly}
      >
        <div
          className={classContainer}
          onClick={onClick}
          role="presentation"
        >
          <TagList
            className={styles['tag-list']}
            id={props.id}
            labelledBy={ids.label}
            refs={valueRefs}
          >
            {value.map((choice, index) => (
              <Tag
                defaultActive={index === 0}
                id={`${props.id}-${choice.id}`}
                key={`${props.id}-${choice.id}`}
                onRemove={onChoiceRemove}
                readOnly={props.readOnly}
                ref={valueRefs[index]}
              >
                {choice.label}
              </Tag>
            ))}
            <input
              aria-autocomplete="list"
              aria-controls={ids.listbox}
              aria-describedby={`${ids.errorMessage} ${ids.emptyMessage}`}
              aria-expanded={renderPopup}
              aria-haspopup="listbox"
              aria-labelledby={ids.label}
              autoComplete="off"
              role="combobox"
              className={styles.combobox}
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
          <div className={styles['icons-container']}>
            {!props.readOnly && validationMessage && (
              <div className={styles['icon-container']}>
                <Icon
                  className={styles.icon}
                  icon={iconCaution}
                  label="Invalid multiple choice custom field"
                />
              </div>
            )}
            {!props.readOnly && value.length > 0 && (
              <div className={styles['icon-container']}>
                <IconButton
                  className={styles['clear-icon']}
                  icon={iconClear}
                  label={`Remove all selected choices on ${props.label}`}
                  onPress={onChoicesClear}
                />
              </div>
            )}
            <div className={styles['icon-container']}>
              <Icon
                className={styles.icon}
                icon={props.readOnly ? iconCaretDownDisabled : iconCaretDown}
                label="Open choices listbox"
              />
            </div>
          </div>
        </div>
        { renderPopup && (visibleChoices.length === 0 ? (<NoOptions className={styles['no-options']} id={ids.emptyMessage} />) : (
          <Listbox
            className={styles['popup-container']}
            id={ids.listbox}
            labelledBy={ids.label}
            refs={choicesRefs}
          >
            {visibleChoices.map((choice, index) => (
              <ListOption
                key={`${props.id}-${choice.id}`}
                onSelect={onChoiceSelect}
                ref={choicesRefs[index]}
                value={choice}
              >
                {choice.label}
              </ListOption>
            ))}
          </Listbox>)
        )}
      </FormControl>
    </div>
  );
});

const ChoiceType = PropTypes.shape({
  id: PropTypes.number.isRequired,
  label: PropTypes.string.isRequired,
});

CustomFieldInputMultipleChoice.propTypes = {
  choices: PropTypes.arrayOf(ChoiceType).isRequired,
  className: PropTypes.string,
  errorText: PropTypes.string,
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  readOnly: PropTypes.bool,
  required: PropTypes.bool,
  value: PropTypes.arrayOf(ChoiceType),
};

CustomFieldInputMultipleChoice.defaultProps = {
  className: undefined,
  errorText: '',
  onChange: () => {},
  placeholder: undefined,
  readOnly: false,
  required: false,
  value: [],
};

export default CustomFieldInputMultipleChoice;
