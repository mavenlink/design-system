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

  function arrayWrap(v) {
    return Object.prototype.toString.call(v) !== '[object Array]' ? [v] : v;
  }

  const [value, setValue] = useState(arrayWrap(props.value));
  const [valueForSelect, setValueForSelect] = useState([]);

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
    setValidationMessage(props.validationMessage);
  }, [props.validationMessage]);

  useEffect(() => {
    function fetchPropsValue() {
      setLoading(true);

      const listOfIds = value.map((d) => { return d?.id || d; }).join(',');
      fetchSelectedChoices(generateUrl(props.apiEndpoint, `only=${listOfIds}`)).then(({ json, mounted }) => {
        if (mounted) {
          setValueForSelect(json.results.map(result => json[result.key][result.id]));
          setLoading(false);
        }
      }).catch((error) => {
        if (error.error && error.error.type !== 'aborted') {
          setLoading(false);
          setValidationMessage('Failed to load options');
        }
      });
    }

    if (value.length) {
      fetchPropsValue();
    } else {
      setValueForSelect([]);
    }
  }, [value.map((d) => { return d?.id || d; }).join(','), options]);

  function safePropsValue(v) {
    if (Object.prototype.toString.call(props.value) !== '[object Array]') {
      return v;
    }
    return v.map((d) => { return d?.id || d; }).join(',');
  }

  useEffect(() => {
    setValue(arrayWrap(props.value));
  }, [safePropsValue(props.value)]);

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
      value={valueForSelect}
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
  value: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.object),
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.string,
  ]),
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
