import React, {
  useEffect,
  useRef,
  useState,
} from 'react';
import PropTypes from 'prop-types';
import CustomFieldInputText from '../custom-field-input-text/custom-field-input-text.jsx';
import Icon from '../icon/icon.jsx';
import iconCaretDown from '../../svgs/icon-caret-down.svg';
import iconCaretDownDisabled from '../../svgs/icon-caret-down-disabled.svg';
import styles from './custom-field-input-single-choice.css';
import Listbox from '../listbox/listbox.jsx';
import ListOption from '../list-option/list-option.jsx';

export default function CustomFieldInputSingleChoice(props) {
  const [didMount, setDidMount] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [value, setValue] = useState(props.value);

  const inputRef = useRef();
  const refs = props.choices.map(() => useRef());
  const caretIcon = (<Icon
    className={styles['input-icon']}
    name={props.readOnly ? iconCaretDownDisabled.id : iconCaretDown.id}
    fill="skip"
  />);

  function onChange(event) {
    setValue(event.target.value);
    setShowOptions(false);
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
        event.preventDefault();
        setShowOptions(false);
        break;
      default:
    }
  }

  const listOptions = props.choices.map((item, index) => (
    <ListOption
      key={item.id}
      ref={refs[index]}
      selected={value && item.id === value.id}
      value={{
        id: item.id,
        label: item.label,
      }}
    >
      {item.label}
    </ListOption>
  ));

  useEffect(() => {
    setDidMount(true);
  }, []);

  useEffect(() => {
    if (!didMount) return;
    if (!showOptions) inputRef.current.focus();
  }, [showOptions])

  return (
    <div className={styles.container}>
      <CustomFieldInputText
        icon={caretIcon}
        id={props.id}
        label={props.label}
        onChange={() => {}}
        onClick={onClick}
        onKeyDown={onKeyDown}
        placeholder={props.placeholder}
        readOnly={props.readOnly}
        inputRef={inputRef}
        required={props.required}
        value={value ? value.label : ''}
      />
      { showOptions && (
        <Listbox
          className={styles.dropdown}
          labelledBy={`${props.id}-label`}
          onChange={onChange}
          refs={refs}
          value={value}
        >
          { listOptions }
        </Listbox>
      ) }
    </div>
  );
}

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
};

CustomFieldInputSingleChoice.defaultProps = {
  choices: [],
  placeholder: undefined,
  readOnly: false,
  required: false,
  value: undefined,
};
