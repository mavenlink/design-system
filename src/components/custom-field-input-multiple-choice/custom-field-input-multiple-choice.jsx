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

function getClassName(readOnly, errorText) {
  if (readOnly) return styles['read-only-container'];
  if (errorText) return styles['invalid-container'];

  return styles['read-write-container'];
}

const CustomFieldInputMultipleChoice = forwardRef((props, ref) => {
  const autocompleteRef = useRef();
  const [autocompleteValue, setAutocompleteValue] = useState('');
  const [expanded, setExpanded] = useState(false);
  const [value, setValue] = useState(props.value);
  const visibleChoices = getVisibleChoices();
  const choicesRefs = visibleChoices.map(() => createRef());
  const valueRefs = value.map(() => createRef());
  const classContainer = getClassName(props.readOnly, props.errorText);
  const renderPopup = !props.readOnly && expanded;
  const backupRef = useRef();
  const selfRef = ref || backupRef;

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
    props.onChange(selfRef.current);
  }, [value]);

  useEffect(() => {
    setValue(props.value);
  }, [props.value]);

  useImperativeHandle(selfRef, () => ({
    id: props.id,
    get value() {
      return value ? value.map(v => v.id) : [];
    },
  }));

  return (
    <div ref={wrapperRef}>
      <FormControl
        error={props.errorText}
        label={props.label}
        labelId={`${props.id}-label`}
        id={`${props.id}-autocomple`}
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
            labelledBy={`${props.id}-label`}
            refs={valueRefs}
          >
            {value.map((choice, index) => (
              <Tag
                className={styles.tag}
                classNameReadOnly={styles['tag-readonly']}
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
            {!props.readOnly && (
              <input
                aria-autocomplete="list"
                aria-controls={`${props.id}-multi-choice-listbox`}
                aria-expanded={renderPopup}
                aria-haspopup="listbox"
                aria-labelledby={`${props.id}-label`}
                role="combobox"
                className={styles['autocomplete-input']}
                id={`${props.id}-autocomple`}
                onChange={onAutocompleteChange}
                ref={autocompleteRef}
                value={autocompleteValue}
              />
            )}
          </TagList>
          <div className={styles['icons-container']}>
            {!props.readOnly && props.errorText && (
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
        { renderPopup && (visibleChoices.length === 0 ? (<NoOptions className={styles['no-options']} />) : (
          <Listbox
            className={styles['popup-container']}
            id={`${props.id}-multi-choice-listbox`}
            labelledBy={`${props.id}-label`}
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
  errorText: PropTypes.string,
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  readOnly: PropTypes.bool,
  value: PropTypes.arrayOf(ChoiceType),
};

CustomFieldInputMultipleChoice.defaultProps = {
  errorText: undefined,
  onChange: () => {},
  readOnly: false,
  value: [],
};

export default CustomFieldInputMultipleChoice;
