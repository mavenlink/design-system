import PropTypes from 'prop-types';
import React, { forwardRef, useEffect, useState } from 'react';
import useFetch from '@bloodyaugust/use-fetch';
import MultiSelect from '../multi-select/multi-select.jsx';
import { API_ROOT } from '../../mocks/mock-constants.js';
import multiSelectStyles from '../multi-select/multi-select.css';

const MultiAutocompleter = forwardRef(function MultiAutocompleter(props, ref) {
  const { execute } = useFetch();
  const [loading, setLoading] = useState(true);
  const [options, setOptions] = useState([]);
  const [valueForSelect, setValueForSelect] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [validationMessage, setValidationMessage] = useState(props.validationMessage);

  function fetchOptions() {
    setLoading(true);
    execute(`${API_ROOT}${props.apiEndpoint}?${props.extraParams !== '' ? `${props.extraParams}&` : ''}${props.searchParam}=${searchValue}`)
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

  function onMultiSelectChange(event) {
    setSearchValue('');
    props.onChange(event);
  }

  function onMultiSelectInput(event) {
    setSearchValue(event.target.value);
  }

  useEffect(fetchOptions, [searchValue]);

  useEffect(() => {
    setValidationMessage(props.validationMessage);
  }, [props.validationMessage]);

  useEffect(() => {
    if (options.length && props.value.length) {
      if (typeof props.value[0] === 'string' || props.value[0] instanceof String) {
        const models = options.filter((modelData) => { return props.value.includes(modelData.id); });
        setValueForSelect(models);
      } else {
        setValueForSelect(props.value);
      }
    }
  }, [props.value, options]);

  return (
    <MultiSelect
      classNames={{
        container: props.className,
      }}
      filterOptions={false}
      id={props.id}
      label={props.label}
      name={props.name}
      onChange={onMultiSelectChange}
      onInput={onMultiSelectInput}
      optionIDGetter={props.optionIDGetter}
      optionLabelGetter={props.optionLabelGetter}
      options={options}
      placeholder={props.placeholder}
      readOnly={props.readOnly}
      ref={ref}
      required={props.required}
      showLoader={loading}
      tooltip={props.tooltip}
      validationMessage={validationMessage}
      value={valueForSelect}
    />
  );
});

MultiAutocompleter.propTypes = {
  /** `apiEndpoint` should be the route of the api's endpoint (excluding the base api), eg. `/workspaces`. */
  apiEndpoint: PropTypes.string.isRequired,
  className: PropTypes.string,
  extraParams: PropTypes.string,
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
  tooltip: PropTypes.string,
  validationMessage: PropTypes.string,
  /** value is an array of objects matching the shape of options */
  value: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.object),
    PropTypes.arrayOf(PropTypes.string),
  ]),
};

MultiAutocompleter.defaultProps = {
  className: multiSelectStyles.container,
  extraParams: '',
  onChange: () => {},
  optionIDGetter: option => option.id,
  optionLabelGetter: option => option.title || option.name || option.full_name || option.currency || option.label,
  placeholder: undefined,
  readOnly: false,
  required: false,
  searchParam: 'matching',
  tooltip: undefined,
  validationMessage: undefined,
  value: [],
};

export default MultiAutocompleter;
