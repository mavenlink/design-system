import React, {
  createRef,
  useState,
} from 'react';
import PropTypes from 'prop-types';
import FormControl from '../form-control/form-control.jsx';
import Icon from '../icon/icon.jsx';
import iconCaretDown from '../../svgs/icon-caret-down.svg';
import iconCaretDownDisabled from '../../svgs/icon-caret-down-disabled.svg';
import Listbox from '../listbox/listbox.jsx';
import ListOption from '../list-option/list-option.jsx';
import TagList from '../tag-list/tag-list.jsx';
import Tag from '../tag/tag.jsx';
import styles from './custom-field-input-multiple-choice.css';

function CustomFieldInputMultipleChoice(props) {
  const [expanded, setExpanded] = useState(false);
  const [value, setValue] = useState(props.value);
  const visibleChoices = props.choices.filter(choice => !value.includes(choice));
  const choicesRefs = visibleChoices.map(() => createRef());
  const valueRefs = value.map(() => createRef());
  const classContainer = props.readOnly ?
    styles['read-only-container'] :
    styles['read-write-container'];

  function onChoiceRemove(event) {
    const newValue = value.filter((choice, index) => (
      valueRefs[index].current !== event.target
    ));
    setValue(newValue);
  }

  function onChoiceSelect(event) {
    const selectedChoiceIndex = choicesRefs.findIndex(choiceRef => choiceRef === event.target);
    const selectedChoice = visibleChoices[selectedChoiceIndex];
    setValue([...value, selectedChoice]);
  }

  function onClick() {
    setExpanded(true);
  }

  return (
    <FormControl
      label={props.label}
      labelId={`${props.id}-label`}
      readOnly={props.readOnly}
    >
      <TagList
        className={classContainer}
        id={props.id}
        labelledBy={`${props.id}-label`}
        onClick={onClick}
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
        <Icon className={styles['input-icon']} name={props.readOnly ? iconCaretDownDisabled.id : iconCaretDown.id} fill="skip" />
      </TagList>
      {(expanded &&
        <Listbox
          className={styles['dropdown-container']}
          labelledBy={`${props.id}-label`}
          refs={choicesRefs}
        >
          {props.choices
            .filter(choice => !value.includes(choice))
            .map((choice, index) => (
              <ListOption
                key={`${props.id}-${choice.id}`}
                onSelect={onChoiceSelect}
                ref={choicesRefs[index]}
                value={choice}
              >
                {choice.label}
              </ListOption>
            ))
          }
        </Listbox>
      )}
    </FormControl>
  );
}

CustomFieldInputMultipleChoice.propTypes = {
  choices: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  })).isRequired,
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  readOnly: PropTypes.bool,
  value: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  })),
};

CustomFieldInputMultipleChoice.defaultProps = {
  readOnly: false,
  value: [],
};

export default CustomFieldInputMultipleChoice;
