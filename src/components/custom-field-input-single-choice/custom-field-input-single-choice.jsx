import React, {
  createRef,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import PropTypes from 'prop-types';
import Select from '../select/select.jsx';
import ListOption from '../list-option/list-option.jsx';

const CustomFieldInputSingleChoice = forwardRef(function CustomFieldInputSingleChoice(props, ref) {
  const [value, setValue] = useState(props.value);
  const backupRef = useRef();
  const selfRef = ref || backupRef;

  const listOptionRefs = props.choices.map(() => createRef());

  function selectOnChangeHandler(event) {
    if (event.target.value) {
      setValue(props.choices.find(choice => choice.id === event.target.value.id));
    } else {
      setValue(undefined);
    }
  }

  const listOptions = () => {
    const choices = {};
    props.choices.forEach((item, index) => { choices[item.id] = { ...item, index }; });

    return props.choices
      .map(item => choices[item.id])
      .map(item => (
        <ListOption
          key={item.id}
          ref={listOptionRefs[item.index]}
          selected={value && item.id === value.id}
          value={{
            id: item.id,
            label: item.label,
          }}
        >
          {item.label}
        </ListOption>
      ));
  };

  useImperativeHandle(selfRef, () => ({
    get dirty() {
      const providedValue = props.value ? props.value.id : undefined;
      return providedValue !== this.value[0];
    },
    id: props.id,
    name: props.name,
    get value() {
      return value ? [value.id] : [];
    },
  }));

  useEffect(() => {
    props.onChange({ target: selfRef.current });
  }, [value]);

  return (
    <Select
      className={props.className}
      displayValueEvaluator={selectValue => selectValue.label}
      errorText={props.errorText}
      id={props.id}
      label={props.label}
      listOptionRefs={listOptionRefs}
      name={props.name}
      onChange={selectOnChangeHandler}
      placeholder={props.placeholder}
      readOnly={props.readOnly}
      required={props.required}
      value={value}
    >
      { listOptions() }
    </Select>
  );
});

const ChoiceType = PropTypes.shape({
  id: PropTypes.number.isRequired,
  label: PropTypes.string.isRequired,
});

CustomFieldInputSingleChoice.propTypes = {
  id: PropTypes.string.isRequired,
  choices: PropTypes.arrayOf(ChoiceType),
  className: PropTypes.string,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  readOnly: PropTypes.bool,
  required: PropTypes.bool,
  value: ChoiceType,
  errorText: PropTypes.string,
};

CustomFieldInputSingleChoice.defaultProps = {
  choices: [],
  className: undefined,
  onChange: () => {},
  placeholder: undefined,
  readOnly: false,
  required: false,
  value: undefined,
  errorText: undefined,
};

export default CustomFieldInputSingleChoice;
