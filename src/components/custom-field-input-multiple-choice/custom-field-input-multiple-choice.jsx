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
import useFetch from '@bloodyaugust/use-fetch';
import Control from '../control/control.jsx';
import FormControl from '../form-control/form-control.jsx';
import Icon from '../icon/icon.jsx';
import IconButton from '../icon-button/icon-button.jsx';
import iconCaretDown from '../../svgs/caret-down.svg';
import iconCaretDownDisabled from '../../svgs/caret-down-disabled.svg';
import iconCaution from '../../svgs/caution.svg';
import iconClear from '../../svgs/clear.svg';
import Listbox from '../listbox/listbox.jsx';
import ListOption from '../list-option/list-option.jsx';
import Loader from '../loader/loader.jsx';
import TagList from '../tag-list/tag-list.jsx';
import Tag from '../tag/tag.jsx';
import NoOptions from '../no-options/no-options.jsx';
import styles from './custom-field-input-multiple-choice.css';
import useDropdownClose from '../../hooks/use-dropdown-close.js';
import useMounted from '../../hooks/use-mounted.js';
import useValidation from '../../hooks/use-validation.jsx';
import mockConstants from '../../mocks/mock-constants.js';
import useForwardedRef from '../../hooks/use-forwarded-ref.js';

const { API_ROOT } = mockConstants;

function getClassName(className, readOnly, errorText) {
  if (className) return className;
  if (readOnly) return styles['read-only-container'];
  if (errorText) return styles['invalid-container'];

  return styles['read-write-container'];
}

const CustomFieldInputMultipleChoice = forwardRef(function CustomFieldInputMultipleChoice(props, ref) {
  const [autocompleteValue, setAutocompleteValue] = useState('');
  const [choices, setChoices] = useState([]);
  const [expanded, setExpanded] = useState(false);
  const [value, setValue] = useState(props.value);
  const visibleChoices = getVisibleChoices();
  const choicesRefs = visibleChoices.map(() => createRef());
  const valueRefs = value.map(() => createRef());
  const selfRef = useForwardedRef(ref);

  const ids = {
    emptyMessage: `${props.id}-empty`,
    errorMessage: `${props.id}-autocompleteHint`,
    label: `${props.id}-label`,
    listbox: `${props.id}-listbox`,
    textbox: `${props.id}-autocomplete`,
    tooltip: `${props.id}-autocomplete-tooltip`,
  };
  const refs = {
    autocomplete: useRef(),
    control: useRef(),
    wrapper: useRef(),
  };

  const mounted = useMounted();
  const { completed, execute } = useFetch();
  const [validationMessage, validate] = useValidation(props.errorText, refs.autocomplete);
  const classContainer = getClassName(props.className, props.readOnly, validationMessage);

  const handleDropdownClose = () => {
    setExpanded(false);
    setAutocompleteValue('');
  };
  useDropdownClose(refs.wrapper, expanded, handleDropdownClose);

  const dropdownContents = () => {
    if (!expanded) {
      return undefined;
    }

    if (!completed) {
      return (
        <Listbox
          className={styles['popup-container']}
          id={ids.listbox}
          labelledBy={ids.label}
          refs={[]}
        >
          <Loader inline />
        </Listbox>
      );
    }

    if (visibleChoices.length === 0) {
      return (<NoOptions className={styles['no-options']} id={ids.emptyMessage} />);
    }

    return (
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
            value={choice.id}
          >
            {choice.label}
          </ListOption>
        ))}
      </Listbox>
    );
  };

  function getVisibleChoices() {
    return choices
      .filter(choice => choice.label.includes(autocompleteValue))
      .filter(choice => !value.some(val => val === choice.id));
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
    const newValue = [...value, selectedChoice.id].sort((a, b) => a.id - b.id);
    setValue(newValue);
    setAutocompleteValue('');
    refs.autocomplete.current.focus();
  }

  function onChoicesClear(event) {
    event.preventDefault();
    setValue([]);
    setExpanded(false);
    refs.autocomplete.current.focus();
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

  useEffect(() => {
    if (expanded && refs.autocomplete.current) {
      refs.autocomplete.current.focus();
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
  }, [props.value.join(',')]);

  useImperativeHandle(selfRef, () => ({
    ...refs.control.current,
    get dirty() {
      return props.value.join(',') !== this.value.join(',');
    },
    id: props.id,
    get value() {
      return value;
    },
  }));

  useEffect(() => {
    const getChoices = async () => {
      await execute(`${API_ROOT}/custom_field_choices?for_custom_fields=${props.customFieldID}`)
        .then(({ json, mounted: isMounted }) => {
          if (isMounted) {
            const choiceObjects = json.results.map(result => json[result.key][result.id]);

            setChoices(choiceObjects);
          }
        })
        .catch((error) => {
          if (error.error && error.error.type !== 'aborted') {
            throw error;
          }
        });
    };

    getChoices();
  }, []);

  return (
    <div ref={refs.wrapper} className={styles['component-root']}>
      <FormControl
        error={validationMessage}
        id={ids.textbox}
        label={props.label}
        labelId={ids.label}
        name={props.name}
        onKeyDown={onKeyDown}
        tooltip={props.tooltip}
        readOnly={props.readOnly}
        ref={refs.control}
      >
        <Control
          labelledBy={ids.label}
          validationMessage={validationMessage}
          validationMessageId={ids.errorMessage}
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
              {choices.length !== 0 && value.map((valueID, index) => (
                <Tag
                  defaultActive={index === 0}
                  id={`${props.id}-${valueID}`}
                  key={`${props.id}-${valueID}`}
                  onRemove={onChoiceRemove}
                  readOnly={props.readOnly}
                  ref={valueRefs[index]}
                >
                  {choices.find(choice => choice.id === valueID).label}
                </Tag>
              ))
              }
              <input
                aria-autocomplete="list"
                aria-controls={ids.listbox}
                aria-describedby={`${ids.errorMessage} ${ids.emptyMessage} ${ids.tooltip}`}
                aria-expanded={expanded}
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
                ref={refs.autocomplete}
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
          {dropdownContents()}
        </Control>
      </FormControl>
    </div>
  );
});

CustomFieldInputMultipleChoice.propTypes = {
  className: PropTypes.string,
  customFieldID: PropTypes.string.isRequired,
  errorText: PropTypes.string,
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  readOnly: PropTypes.bool,
  required: PropTypes.bool,
  tooltip: PropTypes.string,
  value: PropTypes.arrayOf(PropTypes.string),
};

CustomFieldInputMultipleChoice.defaultProps = {
  className: undefined,
  errorText: '',
  onChange: () => {},
  placeholder: undefined,
  readOnly: false,
  required: false,
  tooltip: undefined,
  value: [],
};

export default CustomFieldInputMultipleChoice;
