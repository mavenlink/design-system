import PropTypes from 'prop-types';
import React, { forwardRef, useEffect, useState } from 'react';
import useFetch from '@bloodyaugust/use-fetch';
import useMounted from '../../hooks/use-mounted.js';
import Select from './select.jsx';
import ListOption from '../list-option/list-option.jsx';
import { API_ROOT } from '../../mocks/mock-constants.js';

const Autocompleter = forwardRef(function Autocompleter(props, ref) {
  const { execute: executeModels } = useFetch();
  const { execute: executeValue } = useFetch();
  const mounted = useMounted();
  const [models, setModels] = useState(props.models);
  const [model, setModel] = useState();

  useEffect(() => {
    if (!mounted.current) return;

    setModels(props.models);
  }, [props.models]);

  useEffect(() => {
    fetchModels();
  }, []);

  useEffect(() => {
    if (props.value) {
      executeValue(apiEndpoint('only', props.value))
        .then((respObj) => {
          if (mounted.current) {
            setModel(respObj.json.results.map(result => respObj.json[result.key][result.id])[0]);
          }
        })
        .catch((error) => {
          if (error.error && error.error.type !== 'aborted') {
            throw error;
          }
        });
    } else {
      setModel(undefined);
    }
  }, [props.value]);

  function fetchModels(searchString) {
    if (!props.apiEndpoint) { return; }

    executeModels(apiEndpoint(props.searchParam, searchString))
      .then((respObj) => {
        if (mounted.current) {
          setModels(respObj.json.results.map(result => respObj.json[result.key][result.id]));
        }
      }).catch((error) => {
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
  }

  const listOptionRefs = models.map(() => React.createRef());

  return (
    <Select
      displayValueEvaluator={props.displayValueEvaluator}
      id={props.id}
      labelledBy={props.labelledBy}
      listOptionRefs={listOptionRefs}
      name={props.name}
      onChange={props.onChange}
      onInput={onInput}
      onInvalid={props.onInvalid}
      placeholder={props.placeholder}
      readOnly={props.readOnly}
      ref={ref}
      required={props.required}
      tooltip={props.tooltip}
      validationMessage={props.validationMessage}
      value={model}
      wrapperRef={props.wrapperRef}
    >
      {({ onSelect }) => (
        models.map((modelInfo, index) => (
          <ListOption key={modelInfo.id} onSelect={onSelect} ref={listOptionRefs[index]} value={modelInfo}>
            {props.displayValueEvaluator(modelInfo)}
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
  /** displayValueEvaluator is handled if the key following: `title`, `name`, `full_name`, `currency`; Otherwise, pass in something like `displayValueEvaluator: (model) -> { model.rate_card_name }` */
  displayValueEvaluator: PropTypes.func,
  id: PropTypes.string.isRequired,
  labelledBy: PropTypes.string.isRequired,
  /** `value` and `models` shape is expected to be an object(s) with an `id` key */
  models: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.required,
  })),
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func,
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
  className: undefined,
  displayValueEvaluator: displayName,
  label: undefined,
  models: [],
  onChange: () => {},
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
