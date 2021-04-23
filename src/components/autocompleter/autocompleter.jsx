import PropTypes from 'prop-types';
import React, { forwardRef, useEffect, useState } from 'react';
import useFetch from '@bloodyaugust/use-fetch';
import Select from '../select/select.jsx';
import ListOption from '../list-option/list-option.jsx';
import mockConstants from '../../mocks/mock-constants.js';

const { API_ROOT } = mockConstants;

const Autocompleter = forwardRef(function Autocompleter(props, ref) {
  const { execute: fetch } = useFetch();
  const [models, setModels] = useState(props.models);

  useEffect(fetchModels, []);

  function fetchModels(searchString) {
    fetch(apiEndpoint(searchString))
      .then((results) => {
        setModels(results.json.results.map(resultInfo => results.json[resultInfo.key][resultInfo.id]));
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

  function onKeyUp(event) {
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
      onKeyUp={onKeyUp}
      required={props.required}
      readOnly={props.readOnly}
      placeholder={props.placeholder}
      errorText={props.errorText}
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
  apiEndpoint: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  searchParam: PropTypes.string,
  models: PropTypes.arrayOf(PropTypes.object),
  onChange: PropTypes.func,
  displayValueEvaluator: PropTypes.func,
  label: PropTypes.string,
  required: PropTypes.bool,
  readOnly: PropTypes.bool,
  placeholder: PropTypes.string,
  className: PropTypes.string,
  errorText: PropTypes.string,
  value: PropTypes.any, // eslint-disable-line react/forbid-prop-types
};

Autocompleter.defaultProps = {
  searchParam: 'search',
  models: [],
  label: '',
  required: false,
  readOnly: false,
  displayValueEvaluator: displayName,
  onChange: () => {},
  placeholder: '',
  className: '',
  errorText: '',
  value: undefined,
};

export default Autocompleter;
