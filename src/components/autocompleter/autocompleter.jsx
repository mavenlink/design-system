import PropTypes from 'prop-types';
import React, { forwardRef, useEffect, useState } from 'react';
import useFetch from '@bloodyaugust/use-fetch';
import useMounted from '../../hooks/use-mounted.js';
import Select from '../select/select.jsx';
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
        return setModels(respObj.json.results.map(result => respObj.json[result.key][result.id]));
      }).catch((error) => {
        if (error.error && error.error.type !== 'aborted') {
          throw error;
        }
      });
  }

  function apiEndpoint(searchString) {
    if (searchString) {
      return `${API_ROOT}${props.apiEndpoint}?${props.searchParam}=${searchString}`;
    }

    return `${API_ROOT}${props.apiEndpoint}`;
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
      label={props.label}
      id={props.id}
      name={props.name}
      className={props.className}
      listOptionRefs={listOptionRefs}
      displayValueEvaluator={props.displayValueEvaluator}
      onChange={props.onChange}
      onInput={onInput}
      required={props.required}
      readOnly={props.readOnly}
      placeholder={props.placeholder}
      errorText={props.validationMessage}
      value={props.value}
      ref={ref}
    >
      {listOptionElements}
    </Select>
  );
});

function displayName(modelInfo) {
  return modelInfo.title || modelInfo.name || modelInfo.full_name || modelInfo.currency;
}

Autocompleter.propTypes = {
  /** `apiEndpoint` should be the route of the api's endpoint (excluding the base api), eg. `/workspaces`. */
  apiEndpoint: PropTypes.string,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  searchParam: PropTypes.string,
  /** `value` and `models` shape is expected to be an object(s) with an `id` key */
  models: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.required,
  })),
  onChange: PropTypes.func,
  /** displayValueEvaluator is handled if the key following: `title`, `name`, `full_name`, `currency`; Otherwise, pass in something like `displayValueEvaluator: (model) -> { model.rate_card_name }` */
  displayValueEvaluator: PropTypes.func,
  label: PropTypes.string,
  required: PropTypes.bool,
  readOnly: PropTypes.bool,
  placeholder: PropTypes.string,
  className: PropTypes.string,
  validationMessage: PropTypes.string,
  /** `value` and `models` shape is expected to be an object(s) with an `id` key */
  value: PropTypes.any, // eslint-disable-line react/forbid-prop-types
};

Autocompleter.defaultProps = {
  apiEndpoint: undefined,
  searchParam: 'matching',
  models: [],
  label: undefined,
  required: false,
  readOnly: false,
  displayValueEvaluator: displayName,
  onChange: () => {},
  placeholder: undefined,
  className: undefined,
  validationMessage: undefined,
  value: undefined,
};

export default Autocompleter;
