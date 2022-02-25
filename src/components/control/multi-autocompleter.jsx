import PropTypes from 'prop-types';
import React, { forwardRef, useEffect, useState } from 'react';
import useFetch from '@bloodyaugust/use-fetch';
import MultiSelect from '../control/multi-select.jsx';
import { API_ROOT } from '../../mocks/mock-constants.js';

function generateUrl(apiEndpoint, params) {
  return `${API_ROOT}${apiEndpoint}${apiEndpoint.includes('?') ? '&' : '?'}${params}`;
}

const MultiAutocompleter = forwardRef(function MultiAutocompleter(props, ref) {
  const { execute: fetchChoices } = useFetch();
  const { execute: fetchSelectedChoices } = useFetch();
  const [loading, setLoading] = useState(true);
  const [options, setOptions] = useState([]);
  const [value, setValue] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [validationMessage, setValidationMessage] = useState(props.validationMessage);

  function fetchOptions() {
    setLoading(true);
    fetchChoices(generateUrl(props.apiEndpoint, `${props.searchParam}=${searchValue}`)).then(({ json, mounted }) => {
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
    function fetchPropsValue() {
      setLoading(true);
      fetchSelectedChoices(generateUrl(props.apiEndpoint, `only=${props.value.map(props.optionIDGetter).join(',')}`)).then(({ json, mounted }) => {
        if (mounted) {
          setValue(json.results.map(result => json[result.key][result.id]));
          setLoading(false);
        }
      }).catch((error) => {
        if (error.error && error.error.type !== 'aborted') {
          setLoading(false);
          setValidationMessage('Failed to load options');
        }
      });
    }

    if (props.value.length) fetchPropsValue();
  }, [props.value.map(props.optionIDGetter).join(',')]);

  useEffect(() => {
    setValidationMessage(props.validationMessage);
  }, [props.validationMessage]);

  return (
    <MultiSelect
      classNames={props.classNames}
      containerRef={props.containerRef}
      filterOptions={false}
      id={props.id}
      name={props.name}
      onChange={onMultiSelectChange}
      onInput={onMultiSelectInput}
      onInvalid={props.onInvalid}
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
      value={value}
    />
  );
});

MultiAutocompleter.propTypes = {
  /** `apiEndpoint` should be the route of the api's endpoint (excluding the base api), eg. `/workspaces`. */
  apiEndpoint: PropTypes.string.isRequired,
  classNames: PropTypes.shape({}),
  // eslint-disable-next-line react/forbid-prop-types
  containerRef: PropTypes.any.isRequired,
  id: PropTypes.string.isRequired,
  name: PropTypes.string,
  onChange: PropTypes.func,
  onInvalid: PropTypes.func,
  optionIDGetter: PropTypes.func,
  optionLabelGetter: PropTypes.func,
  placeholder: PropTypes.string,
  readOnly: PropTypes.bool,
  required: PropTypes.bool,
  searchParam: PropTypes.string,
  tooltip: PropTypes.string,
  validationMessage: PropTypes.string,
  /** value is an array of objects matching the shape of options */
  value: PropTypes.arrayOf(PropTypes.object),
};

MultiAutocompleter.defaultProps = {
  classNames: {},
  name: undefined,
  onChange: () => {},
  onInvalid: () => {},
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
