import React, {
  createRef,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import PropTypes from 'prop-types';
import useFetch from '@bloodyaugust/use-fetch';
import Select from '../select/select.jsx';
import ListOption from '../list-option/list-option.jsx';
import mockConstants from '../../mocks/mock-constants.js';

const { API_ROOT } = mockConstants;

const CustomFieldInputSingleChoice = forwardRef(function CustomFieldInputSingleChoice(props, ref) {
  const [choices, setChoices] = useState([]);
  const listOptionRefs = choices.map(() => createRef());
  const [value, setValue] = useState(props.value);
  const backupRef = useRef();
  const selfRef = ref || backupRef;
  const { execute } = useFetch();

  function selectOnChangeHandler(event) {
    if (event.target.value) {
      setValue(choices.find(choice => choice.id === event.target.value.id));
    } else {
      setValue(undefined);
    }
  }

  const listOptions = () => {
    return choices
      .map((item, index) => (
        <ListOption
          key={item.id}
          ref={listOptionRefs[index]}
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
    setValue(props.value);
  }, [props.value]);

  useEffect(() => {
    if (props.value === value) return;

    props.onChange({ target: selfRef.current });
  }, [value]);

  useEffect(() => {
    const getChoices = async () => {
      await execute(`${API_ROOT}/custom_field_choices?for_custom_fields=${props.id}`)
        .then(({ json, mounted }) => {
          if (mounted) {
            const mungedChoices = json.results.map((result) => {
              return {
                ...json[result.key][result.id],
                id: result.id,
              };
            });

            setChoices(mungedChoices);
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
    <React.Fragment>
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
      {choices.length === 0 &&
        <span>Loading...</span>
      }
    </React.Fragment>
  );
});

const ChoiceType = PropTypes.shape({
  id: PropTypes.number.isRequired,
  label: PropTypes.string.isRequired,
});

CustomFieldInputSingleChoice.propTypes = {
  /** Needs to be the Custom Field ID from the database for self-loading of choices */
  id: PropTypes.string.isRequired,
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
  className: undefined,
  onChange: () => {},
  placeholder: undefined,
  readOnly: false,
  required: false,
  value: undefined,
  errorText: undefined,
};

export default CustomFieldInputSingleChoice;
