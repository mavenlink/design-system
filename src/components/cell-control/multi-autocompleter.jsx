import PropTypes from 'prop-types';
import React, {
  forwardRef,
  useRef,
} from 'react';
import CellControl from '../cell-control/cell-control.jsx';
import MultiAutocompleterControl from '../control/multi-autocompleter.jsx';
import styles from './multi-autocompleter.css';

const MultiAutocompleter = forwardRef(function MultiAutocompleter(props, ref) {
  const classNames = {
    container: styles.container,
    formControlChildrenContainer: styles.formControlChildrenContainer,
    formControlChildrenContainerInvalid: styles.formControlChildrenContainerInvalid,
    formControlChildrenContainerReadOnly: styles.formControlChildrenContainerReadOnly,
    ...props.classNames,
  };
  const refs = {
    control: useRef(),
  };

  return (
    <CellControl
      className={classNames.container}
      labelledBy={props.labelledBy}
      ref={refs.control}
    >
      <MultiAutocompleterControl
        apiEndpoint={props.apiEndpoint}
        classNames={{
          formControlChildrenContainer: classNames.formControlChildrenContainer,
          formControlChildrenContainerInvalid: classNames.formControlChildrenContainerInvalid,
          formControlChildrenContainerReadOnly: classNames.formControlChildrenContainerReadOnly,
        }}
        containerRef={refs.control}
        filterOptions={false}
        id={props.id}
        onBlur={props.onBlur}
        onChange={props.onChange}
        onFocus={props.onFocus}
        optionIDGetter={props.optionIDGetter}
        optionLabelGetter={props.optionLabelGetter}
        placeholder={props.placeholder}
        readOnly={props.readOnly}
        ref={ref}
        required={props.required}
        searchParam={props.searchParam}
        tooltip={props.tooltip}
        validationMessage={props.validationMessage}
        value={props.value}
      />
    </CellControl>
  );
});

MultiAutocompleter.propTypes = {
  /** `apiEndpoint` should be the route of the api's endpoint (excluding the base api), eg. `/workspaces`. */
  apiEndpoint: PropTypes.string.isRequired,
  classNames: PropTypes.shape({}),
  id: PropTypes.string.isRequired,
  labelledBy: PropTypes.string.isRequired,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
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
  onBlur: () => {},
  onChange: () => {},
  onFocus: () => {},
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
