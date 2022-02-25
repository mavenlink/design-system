import React, {
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
  forwardRef,
} from 'react';
import PropTypes from 'prop-types';
import useFetch from '@bloodyaugust/use-fetch';
import MultiAutocompleter from '../multi-autocompleter/multi-autocompleter.jsx';
import { API_ROOT } from '../../mocks/mock-constants.js';
import useForwardedRef from '../../hooks/use-forwarded-ref.js';

const CustomFieldInputMultipleChoice = forwardRef(function CustomFieldInputMultipleChoice(props, ref) {
  const multiAutocompleterRef = useRef();
  const [allChoices, setAllChoices] = useState([]);
  const [fullPropValue, setFullPropValue] = useState([]);
  const { execute } = useFetch();
  const selfRef = useForwardedRef(ref);

  useEffect(() => {
    const fetchChoices = async () => {
      await execute(`${API_ROOT}/custom_field_choices?for_custom_fields=${props.customFieldID}`)
        .then(({ json, mounted }) => {
          if (mounted) {
            setAllChoices(json.results.map(result => json[result.key][result.id]));
          }
        })
        .catch((error) => {
          if (error.error && error.error.type !== 'aborted') {
            throw error;
          }
        });
    };

    fetchChoices();
  }, []);

  useEffect(() => {
    setFullPropValue(props.value.map((choiceID) => {
      return allChoices.find(choice => choice.id === choiceID);
    }).filter(mappedChoice => mappedChoice !== undefined));
  }, [props.value, allChoices]);

  useImperativeHandle(selfRef, () => ({
    id: multiAutocompleterRef.current.id,
    name: multiAutocompleterRef.current.name,
    get dirty() {
      return multiAutocompleterRef.current.dirty;
    },
    get value() {
      return multiAutocompleterRef.current.value.map(value => value.id);
    },
  }));

  return (
    <MultiAutocompleter
      apiEndpoint={`/custom_field_choices?for_custom_fields=${props.customFieldID}`}
      className={props.className}
      id={props.id}
      label={props.label}
      name={props.name}
      optionIDGetter={option => option.id}
      onChange={props.onChange}
      placeholder={props.placeholder}
      readOnly={props.readOnly}
      ref={multiAutocompleterRef}
      required={props.required}
      tooltip={props.tooltip}
      validationMessage={props.errorText}
      value={fullPropValue}
    />
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
