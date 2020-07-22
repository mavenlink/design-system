import React, {
  createRef,
  useEffect,
  useRef,
  useState,
} from 'react';
import PropTypes from 'prop-types';
import FormControl from '../form-control/form-control.jsx';
import Icon from '../icon/icon.jsx';
import iconCaretDown from '../../svgs/icon-caret-down.svg';
import iconCaretDownDisabled from '../../svgs/icon-caret-down-disabled.svg';
import iconCaution from '../../svgs/icon-caution-fill.svg';
import iconClear from '../../svgs/icon-clear-small.svg';
import Listbox from '../listbox/listbox.jsx';
import ListOption from '../list-option/list-option.jsx';
import TagList from '../tag-list/tag-list.jsx';
import Tag from '../tag/tag.jsx';
import NoOptions from '../no-options/no-options.jsx';
import Popup from '../popup/popup.jsx';
import styles from './custom-field-input-multiple-choice.css';
import useDropdownClose from '../../hooks/use-dropdown-close.js';

function getClassName(readOnly, errorText) {
  if (readOnly) return styles['read-only-container'];
  if (errorText) return styles['invalid-container'];

  return styles['read-write-container'];
}

function CustomFieldInputMultipleChoice(props) {
  const autocompleteRef = useRef();
  const [autocompleteValue, setAutocompleteValue] = useState('');
  const [expanded, setExpanded] = useState(false);
  const [value, setValue] = useState(props.value);
  const visibleChoices = props.choices
    .filter(choice => choice.label.includes(autocompleteValue))
    .filter(choice => !value.includes(choice));
  const choicesRefs = visibleChoices.map(() => createRef());
  const valueRefs = value.map(() => createRef());
  const classContainer = getClassName(props.readOnly, props.errorText);
  const renderPopup = !props.readOnly && expanded;

  const wrapperRef = useRef(null);
  const handleDropdownClose = () => {
    setExpanded(false);
    setAutocompleteValue('');
  };
  useDropdownClose(wrapperRef, expanded, handleDropdownClose);

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
    setValue([...value, selectedChoice]);
    setAutocompleteValue('');
  }

  function onChoicesClear(event) {
    event.preventDefault();
    setValue([]);
    setExpanded(false);
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
                aria-labelledby={`${props.id}-label`}
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
              <Icon
                className={styles.icon}
                currentColor="caution"
                fill="skip"
                name={iconCaution.id}
              />
            )}
            {!props.readOnly && value.length > 0 && (
              <Icon
                className={styles['clear-icon']}
                fill="skip"
                name={iconClear.id}
                onClick={onChoicesClear}
                ariaLabel={`Remove all selected choices on ${props.label}`}
                role="button"
              />
            )}
            <Icon
              className={styles.icon}
              name={props.readOnly ? iconCaretDownDisabled.id : iconCaretDown.id}
              fill="skip"
            />
          </div>
        </div>
        <Popup show={renderPopup}>
          { visibleChoices.length === 0 ? (<NoOptions />) : (
            <Listbox
              className={styles['popup-container']}
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
            </Listbox>
          ) }
        </Popup>
      </FormControl>
    </div>
  );
}

CustomFieldInputMultipleChoice.propTypes = {
  choices: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  })).isRequired,
  errorText: PropTypes.string,
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  readOnly: PropTypes.bool,
  value: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  })),
};

CustomFieldInputMultipleChoice.defaultProps = {
  errorText: undefined,
  readOnly: false,
  value: [],
};

export default CustomFieldInputMultipleChoice;
