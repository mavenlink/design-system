import PropTypes from 'prop-types';
import React, { forwardRef, useEffect, useState } from 'react';
import useFetch from '@bloodyaugust/use-fetch';
import useMounted from '../../hooks/use-mounted.js';
import Select from './select.jsx';
import ListOption from '../list-option/list-option.jsx';
import mockConstants from '../../mocks/mock-constants.js';

const { API_ROOT } = mockConstants;

const Autocompleter = forwardRef(function Autocompleter(props, ref) {
  const { execute } = useFetch();
  const mounted = useMounted();
  const [models, setModels] = useState(props.models);

  useEffect(() => {
    if (!mounted.current) return;

    setModels(props.models);
  }, [props.models]);

  useEffect(fetchModels, []);

  function fetchModels(searchString) {
    if (!props.apiEndpoint) { return; }

    execute(apiEndpoint(searchString))
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

  function apiEndpoint(searchString) {
    const baseUrl = `${API_ROOT}${props.apiEndpoint}`;
    if (searchString) {
      const containsQueryStart = baseUrl.match(/[?]/g);
      const paramPrefix = containsQueryStart ? '&' : '?';

      return `${baseUrl}${paramPrefix}${props.searchParam}=${searchString}`;
    }

    return baseUrl;
  }

  function onInput(event) {
    fetchModels(event.target.value);
  }

  const listOptionRefs = models.map(() => React.createRef());
  const listOptionElements = models.map((modelInfo, index) => {
    return (
      <ListOption key={modelInfo.id} ref={listOptionRefs[index]} value={modelInfo}>
        {props.displayValueEvaluator(modelInfo)}
      </ListOption>
    );
  });

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
      value={props.value}
      wrapperRef={props.wrapperRef}
    >
      {listOptionElements}
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
  /** `value` and `models` shape is expected to be an object(s) with an `id` key */
  value: PropTypes.any, // eslint-disable-line react/forbid-prop-types
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
