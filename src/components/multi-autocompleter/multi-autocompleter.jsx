import PropTypes from 'prop-types';
import React, { forwardRef, useEffect, useState } from 'react';
import useFetch from '@bloodyaugust/use-fetch';
import MultiSelect from '../multi-select/multi-select.jsx';
import mockConstants from '../../mocks/mock-constants.js';

const { API_ROOT } = mockConstants;

const MultiAutocompleter = forwardRef(function MultiAutocompleter(props, ref) {
  const { execute } = useFetch();
  const [loading, setLoading] = useState(true);
  const [options, setOptions] = useState([]);
  const [validationMessage, setValidationMessage] = useState(props.validationMessage);

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
    setValidationMessage(props.validationMessage);
  }, [props.validationMessage]);

  return (
    <MultiSelect
      classNames={{
        container: props.className,
      }}
      filterOptions={false}
      id={props.id}
      label={props.label}
      name={props.name}
      onChange={props.onChange}
      options={options}
      optionIDGetter={props.optionIDGetter}
      optionLabelGetter={props.optionLabelGetter}
      placeholder={props.placeholder}
      readOnly={props.readOnly}
      ref={ref}
      required={props.required}
      showLoader={loading}
      validationMessage={validationMessage}
      value={loading ? [] : props.value}
    />
  );
});

MultiAutocompleter.propTypes = {
  /** `apiEndpoint` should be the route of the api's endpoint (excluding the base api), eg. `/workspaces`. */
  apiEndpoint: PropTypes.string.isRequired,
  className: PropTypes.string,
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  optionIDGetter: PropTypes.func,
  optionLabelGetter: PropTypes.func,
  placeholder: PropTypes.string,
  readOnly: PropTypes.bool,
  required: PropTypes.bool,
  searchParam: PropTypes.string,
  validationMessage: PropTypes.string,
  /** value is an array of unique identifiers */
  value: PropTypes.arrayOf(PropTypes.string),
};

MultiAutocompleter.defaultProps = {
  className: undefined,
  onChange: () => {},
  optionIDGetter: option => option.id,
  optionLabelGetter: option => option.title || option.name || option.full_name || option.currency,
  placeholder: undefined,
  readOnly: false,
  required: false,
  searchParam: 'search',
  validationMessage: undefined,
  value: [],
};

export default MultiAutocompleter;
