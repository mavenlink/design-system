import PropTypes from 'prop-types';
import React, { forwardRef, useRef } from 'react';
import CellControl from './cell-control.jsx';
import AutocompleterControl from '../control/autocompleter.jsx';
import styles from './autocompleter.css';

const Autocompleter = forwardRef(function Autocompleter(props, ref) {
  const classNames = {
    container: styles.container,
    innerContainer: styles.innerContainer,
    input: styles.input,
    invalidInput: styles.invalidInput,
    ...props.classNames,
  };
  const refs = {
    container: useRef(),
  };

  return (
    <CellControl
      className={classNames.container}
      labelledBy={props.labelledBy}
      readOnly={props.readOnly}
      ref={refs.container}
    >
      <AutocompleterControl
        apiEndpoint={props.apiEndpoint}
        classNames={{
          container: classNames.innerContainer,
          input: classNames.input,
          invalidInput: classNames.invalidInput,
        }}
        displayValueEvaluator={props.displayValueEvaluator}
        id={props.id}
        labelledBy={props.labelledBy}
        models={props.models}
        name={props.name}
        onChange={props.onChange}
        placeholder={props.placeholder}
        readOnly={props.readOnly}
        ref={ref}
        required={props.required}
        searchParam={props.searchParam}
        validationMessage={props.validationMessage}
        validationMessageTooltip
        value={props.value}
        wrapperRef={refs.container}
      />
    </CellControl>
  );
});

Autocompleter.propTypes = {
  /** `apiEndpoint` should be the route of the api's endpoint (excluding the base api), eg. `/workspaces`. */
  apiEndpoint: PropTypes.string,
  classNames: PropTypes.shape({
    /** A class name for the table cell container. */
    container: PropTypes.string,
    /** A class name for the nested select container. */
    innerContainer: PropTypes.string,
  }),
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
  placeholder: PropTypes.string,
  readOnly: PropTypes.bool,
  required: PropTypes.bool,
  searchParam: PropTypes.string,
  validationMessage: PropTypes.string,
  /** `value` and `models` shape is expected to be an object(s) with an `id` key */
  value: PropTypes.any, // eslint-disable-line react/forbid-prop-types
};

Autocompleter.defaultProps = {
  apiEndpoint: undefined,
  classNames: {},
  displayValueEvaluator: undefined,
  models: [],
  onChange: () => {},
  placeholder: undefined,
  readOnly: false,
  required: false,
  searchParam: 'matching',
  validationMessage: undefined,
  value: undefined,
};

export default Autocompleter;
