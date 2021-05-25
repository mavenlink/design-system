import PropTypes from 'prop-types';
import React, { forwardRef, useEffect, useState } from 'react';
import useFetch from '@bloodyaugust/use-fetch';
import MultiSelect from '../multi-select/multi-select.jsx';
import mockConstants from '../../mocks/mock-constants.js';

const { API_ROOT } = mockConstants;

const MultiAutocompleter = forwardRef(function MultiAutocompleter(props, ref) {
  const { execute } = useFetch();
  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState([]);
  const [validationMessage, setValidationMessage] = useState(props.validationMessage);
  const [value, setValue] = useState(props.value || []);

  function fetchOptions() {
    setLoading(true);
    execute(`${API_ROOT}${props.apiEndpoint}`)
      .then(({ json, mounted }) => {
        if (mounted) {
          setOptions(json.results.map(result => json[result.key][result.id]));
          setLoading(false);
        }
      }).catch((error) => {
        if (error.error && error.error.type !== 'aborted') {
          setLoading(false);
          setValidationMessage('Failed to load options');
        }
      });
  }

  useEffect(fetchOptions, []);

  useEffect(() => {
    setValue(props.value);
  }, [props.value.map(val => JSON.stringify(val)).join(',')]);

  return (
    <MultiSelect
      classNames={{
        container: props.className,
      }}
      id={props.id}
      label={props.label}
      name={props.name}
      onChange={props.onChange}
      options={options}
      optionIDGetter={option => option.id}
      optionLabelGetter={option => option.name}
      placeholder={props.placeholder}
      readOnly={props.readOnly}
      ref={ref}
      required={props.required}
      showLoader={loading}
      validationMessage={validationMessage}
      value={value}
    />
  );
});

MultiAutocompleter.propTypes = {
  // `apiEndpoint` should be the route of the api's endpoint (excluding the base api), eg. `/workspaces`.
  apiEndpoint: PropTypes.string.isRequired,
  className: PropTypes.string,
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  readOnly: PropTypes.bool,
  required: PropTypes.bool,
  searchParam: PropTypes.string,
  validationMessage: PropTypes.string,
  // `value` shape is expected to be a collection objects with an `id` key
  value: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.required,
  })),
};

MultiAutocompleter.defaultProps = {
  className: undefined,
  onChange: () => { },
  placeholder: undefined,
  readOnly: false,
  required: false,
  searchParam: 'search',
  validationMessage: undefined,
  value: [],
};

export default MultiAutocompleter;
