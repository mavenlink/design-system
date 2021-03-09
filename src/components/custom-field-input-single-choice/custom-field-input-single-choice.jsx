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
import ListOption from '../list-option/list-option.jsx';
import Loader from '../loader/loader.jsx';
import Select from '../select/select.jsx';
import mockConstants from '../../mocks/mock-constants.js';

const { API_ROOT } = mockConstants;
const defaultValue = ['-1'];

const CustomFieldInputSingleChoice = forwardRef(function CustomFieldInputSingleChoice(props, ref) {
  const [choices, setChoices] = useState([]);
  const listOptionRefs = choices.map(() => createRef());
  const [value, setValue] = useState(props.value);
  const backupRef = useRef();
  const selfRef = ref || backupRef;
  const { execute } = useFetch();

  function selectOnChangeHandler(event) {
    if (event.target.value) {
      setValue([event.target.value.id]);
    } else {
      setValue(defaultValue);
    }
  }

  const listOptions = () => {
    return choices
      .map((item, index) => (
        <ListOption
          key={item.id}
          ref={listOptionRefs[index]}
          value={item}
        >
          {item.label}
        </ListOption>
      ));
  };

  useImperativeHandle(selfRef, () => ({
    get dirty() {
      const providedValue = props.value[0] !== defaultValue[0] ? props.value[0] : undefined;
      return providedValue !== this.value[0];
    },
    id: props.id,
    name: props.name,
    get value() {
      return value[0] === defaultValue[0] ? [] : value;
    },
  }));

  useEffect(() => {
    if (props.value.length) {
      setValue(props.value);
    } else {
      setValue(defaultValue);
    }
  }, (props.value.length ? [...props.value] : [...defaultValue]));

  useEffect(() => {
    props.onChange({ target: selfRef.current });
  }, [value]);

  useEffect(() => {
    const getChoices = async () => {
      await execute(`${API_ROOT}/custom_field_choices?for_custom_fields=${props.customFieldID}`)
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
        value={value[0] !== -1 ? choices.find(choice => choice.id === value[0]) : undefined}
      >
        {choices.length === 0
          ? <Loader inline />
          : listOptions()
        }
      </Select>
    </React.Fragment>
  );
});

CustomFieldInputSingleChoice.propTypes = {
  id: PropTypes.string.isRequired,
  className: PropTypes.string,
  /** Needs to be the Custom Field ID from the database for self-loading of choices */
  customFieldID: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  readOnly: PropTypes.bool,
  required: PropTypes.bool,
  value: PropTypes.arrayOf(PropTypes.string),
  errorText: PropTypes.string,
};

CustomFieldInputSingleChoice.defaultProps = {
  className: undefined,
  onChange: () => {},
  placeholder: undefined,
  readOnly: false,
  required: false,
  value: defaultValue,
  errorText: undefined,
};

export default CustomFieldInputSingleChoice;
