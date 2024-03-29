import PropTypes from 'prop-types';
import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import useFetch from '@bloodyaugust/use-fetch';
import Select from './select.jsx';
import ListOption from '../list-option/list-option.jsx';
import { API_ROOT } from '../../mocks/mock-constants.js';

const Autocompleter = forwardRef(function Autocompleter(props, ref) {
  const { execute: executeModels } = useFetch();
  const { execute: executeValue } = useFetch();
  const [models, setModels] = useState([]);
  const [searchModels, setSearchModels] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [model, setModel] = useState({ id: props.value });
  const selectRef = useRef();

  useEffect(() => {
    fetchModels();
  }, [props.apiEndpoint]);

  useEffect(() => {
    if (props.value) {
      executeValue(apiEndpoint('only', props.value))
        .then(({ json, mounted }) => {
          if (mounted) {
            setModel(json.results.map(result => json[result.key][props.value])[0]);
          }
        })
        .catch((error) => {
          if (error.error instanceof ProgressEvent) return;
          if (error.error && error.error.type !== 'aborted') {
            throw error;
          }
        });
    } else {
      setModel(undefined);
    }
  }, [props.apiEndpoint, props.value]);

  function fetchModels(searchString) {
    if (!props.apiEndpoint) { return; }

    executeModels(apiEndpoint(props.searchParam, searchString))
      .then(({ json, mounted }) => {
        if (mounted) {
          const jsonResults = json.results.map(result => json[result.key][result.id]);
          if (searchString) {
            setSearchModels(jsonResults);
          } else {
            setModels(jsonResults);
          }
        }
      }).catch((error) => {
        if (error.error instanceof ProgressEvent) return;
        if (error.error && error.error.type !== 'aborted') {
          throw error;
        }
      });
  }

  function apiEndpoint(key, value) {
    const baseUrl = `${API_ROOT}${props.apiEndpoint}`;
    if (value) {
      const containsQueryStart = baseUrl.match(/[?]/g);
      const paramPrefix = containsQueryStart ? '&' : '?';

      return `${baseUrl}${paramPrefix}${key}=${value}`;
    }

    return baseUrl;
  }

  function onInput(event) {
    fetchModels(event.target.value);
    setIsSearching(true);
  }

  useImperativeHandle(ref, () => ({
    ...selectRef.current,
    get dirty() {
      return selectRef.current.dirty;
    },
    get value() {
      return selectRef.current.value?.id;
    },
  }));

  const renderModels = isSearching ? searchModels : models;
  const listOptionRefs = models.map(() => React.createRef());

  function wrappedOnChange(event) {
    setIsSearching(false);
    return props.onChange(event);
  }

  return (
    <Select
      classNames={props.classNames}
      displayValueEvaluator={props.displayValueEvaluator}
      id={props.id}
      labelledBy={props.labelledBy}
      listOptionRefs={listOptionRefs}
      name={props.name}
      onBlur={props.onBlur}
      onChange={wrappedOnChange}
      onFocus={props.onFocus}
      onInput={onInput}
      onInvalid={props.onInvalid}
      placeholder={props.placeholder}
      readOnly={props.readOnly}
      ref={selectRef}
      required={props.required}
      specialChildrenRender={!!props.children}
      tooltip={props.tooltip}
      validationMessage={props.validationMessage}
      value={model}
      wrapperRef={props.wrapperRef}
    >
      {({ onSelect }) => (
        renderModels.map((modelInfo, index) => (
          <ListOption key={modelInfo.id} onSelect={onSelect} ref={listOptionRefs[index]} value={modelInfo}>
            { props.children ? props.children(modelInfo) : props.displayValueEvaluator(modelInfo) }
          </ListOption>
        ))
      )}
    </Select>
  );
});

function displayName(modelInfo) {
  return modelInfo.title || modelInfo.name || modelInfo.full_name || modelInfo.currency || modelInfo.label;
}

Autocompleter.propTypes = {
  /** `apiEndpoint` should be the route of the api's endpoint (excluding the base api), eg. `/workspaces`. */
  apiEndpoint: PropTypes.string,
  children: PropTypes.func,
  classNames: PropTypes.shape({
    container: PropTypes.string,
    input: PropTypes.string,
    invalidInput: PropTypes.string,
  }),
  /** displayValueEvaluator is handled if the key following: `title`, `name`, `full_name`, `currency`; Otherwise, pass in something like `displayValueEvaluator: (model) -> { model.rate_card_name }` */
  displayValueEvaluator: PropTypes.func,
  id: PropTypes.string.isRequired,
  labelledBy: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  onInvalid: PropTypes.func,
  placeholder: PropTypes.string,
  readOnly: PropTypes.bool,
  required: PropTypes.bool,
  searchParam: PropTypes.string,
  tooltip: PropTypes.string,
  validationMessage: PropTypes.string,
  /** The `value` props is expected an `id` used to fetch a model on the API. */
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  wrapperRef: PropTypes.shape({ current: PropTypes.any }).isRequired,
};

Autocompleter.defaultProps = {
  apiEndpoint: undefined,
  children: undefined,
  classNames: {},
  displayValueEvaluator: displayName,
  label: undefined,
  onBlur: () => {},
  onChange: () => {},
  onFocus: () => {},
  onInvalid: () => {},
  placeholder: undefined,
  readOnly: false,
  required: false,
  searchParam: 'matching',
  tooltip: undefined,
  validationMessage: undefined,
  value: undefined,
};

export default Autocompleter;
