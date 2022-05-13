import PropTypes from 'prop-types';
import React, { forwardRef, useEffect, useImperativeHandle, useState, useRef } from 'react';
import useFetch from '@bloodyaugust/use-fetch';
import MultiSelect from '../control/multi-select.jsx';
import useForwardedRef from '../../hooks/use-forwarded-ref.js';
import combineRefs from '../../utils/combine-refs.js';
import { API_ROOT } from '../../mocks/mock-constants.js';

function generateUrl(apiEndpoint, params) {
  return `${API_ROOT}${apiEndpoint}${apiEndpoint.includes('?') ? '&' : '?'}${params}`;
}

const MultiAutocompleter = forwardRef(function MultiAutocompleter(props, forwardedRef) {
  const { execute: fetchChoices } = useFetch();
  const { execute: fetchSelectedChoices } = useFetch();
  const [loading, setLoading] = useState(true);
  const [options, setOptions] = useState([]);
  const mounted = useRef(false);

  const ref = useForwardedRef(forwardedRef);
  const refs = {
    select: useRef(),
  };
  const overrides = useRef({
    get value() {
      return refs.select.current.value ? refs.select.current.value.map(props.optionIDGetter) : undefined;
    },
  });

  const [value, setValue] = useState(props.value);
  const [valueForSelect, setValueForSelect] = useState(value.map(v => (typeof v === 'string' ? { id: v, label: '' } : v)));

  const [searchValue, setSearchValue] = useState('');
  const [validationMessage, setValidationMessage] = useState(props.validationMessage);

  function fetchOptions() {
    setLoading(true);
    fetchChoices(generateUrl(props.apiEndpoint, `${props.searchParam}=${searchValue}`)).then(({ json }) => {
      if (mounted.current) {
        setOptions(json.results.map(result => json[result.key][result.id]));
      }
    }).catch((error) => {
      if (mounted.current && error.error && error.error.type !== 'aborted') {
        setValidationMessage('Failed to load options');
      }
    }).finally(() => {
      if (mounted.current) {
        setLoading(false);
      }
    });
  }

  function onMultiSelectChange() {
    setSearchValue('');
    props.onChange({ target: ref.current });
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

      fetchSelectedChoices(generateUrl(props.apiEndpoint, `only=${listOfIdsString(value)}`)).then(({ json }) => {
        if (mounted.current) {
          setValueForSelect(json.results.map(result => json[result.key][result.id]));
        }
      }).catch((error) => {
        if (mounted.current && error.error && error.error.type !== 'aborted') {
          setValidationMessage('Failed to load options');
        }
      }).finally(() => {
        if (mounted.current) {
          setLoading(false);
        }
      });
    }

    if (value.length) {
      fetchPropsValue();
    } else {
      setValueForSelect([]);
    }
  }, [listOfIdsString(value)]);

  function listOfIdsString(v) {
    return v.map(x => (typeof x === 'string' ? x : props.optionIDGetter(x))).join(',');
  }

  useEffect(() => {
    setValue(props.value);
  }, [listOfIdsString(props.value)]);

  useEffect(() => {
    mounted.current = true;

    return () => {
      mounted.current = false;
    };
  }, []);

  useImperativeHandle(ref, () => combineRefs(refs.select, overrides));

  return (
    <MultiSelect
      classNames={props.classNames}
      containerRef={props.containerRef}
      filterOptions={false}
      id={props.id}
      name={props.name}
      onChange={onMultiSelectChange}
      onInput={onMultiSelectInput}
      onFocus={props.onFocus}
      onBlur={props.onBlur}
      onInvalid={props.onInvalid}
      optionIDGetter={props.optionIDGetter}
      optionLabelGetter={props.optionLabelGetter}
      options={options}
      placeholder={props.placeholder}
      readOnly={props.readOnly}
      ref={refs.select}
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
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
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
  ]),
};

MultiAutocompleter.defaultProps = {
  classNames: {},
  name: undefined,
  onBlur: () => {},
  onChange: () => {},
  onFocus: () => {},
  onInvalid: () => {},
  optionIDGetter: (option) => { return option?.id || option; },
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
