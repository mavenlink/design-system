import React, {
  useEffect,
  useState,
  forwardRef,
} from 'react';
import PropTypes from 'prop-types';
import useFetch from '@bloodyaugust/use-fetch';
import MultiAutocompleter from './multi-autocompleter.jsx';
import { API_ROOT } from '../../mocks/mock-constants.js';

const MultiChoice = forwardRef(function MultiChoice(props, ref) {
  const [allChoices, setAllChoices] = useState([]);
  const [fullPropValue, setFullPropValue] = useState([]);
  const { execute } = useFetch();

  useEffect(() => {
    const fetchChoices = async () => {
      await execute(`${API_ROOT}/custom_field_choices?active=true&for_custom_fields=${props.customFieldID}`)
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

  return (
    <MultiAutocompleter
      apiEndpoint={`/custom_field_choices?active=true&for_custom_fields=${props.customFieldID}`}
      classNames={props.classNames}
      id={props.id}
      labelledBy={props.labelledBy}
      optionIDGetter={option => option.id}
      onChange={props.onChange}
      placeholder={props.placeholder}
      readOnly={props.readOnly}
      ref={ref}
      required={props.required}
      validationMessage={props.validationMessage}
      value={fullPropValue}
    />
  );
});

MultiChoice.propTypes = {
  classNames: PropTypes.shape({}),
  customFieldID: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  labelledBy: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  readOnly: PropTypes.bool,
  required: PropTypes.bool,
  validationMessage: PropTypes.string,
  value: PropTypes.arrayOf(PropTypes.string),
};

MultiChoice.defaultProps = {
  classNames: {},
  onChange: () => {},
  placeholder: undefined,
  readOnly: false,
  required: false,
  validationMessage: '',
  value: [],
};

export default MultiChoice;
