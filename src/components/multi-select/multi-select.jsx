import React, {
  useImperativeHandle,
  useRef,
  useState,
  forwardRef,
} from 'react';
import PropTypes from 'prop-types';
import FormControl from '../form-control/form-control.jsx';
import MultiSelectControl from '../control/multi-select.jsx';
import combineRefs from '../../utils/combine-refs.js';
import styles from './multi-select.css';

const MultiSelect = forwardRef(function MultiSelect(props, ref) {
  const [validationMessage, setValidationMessage] = useState(props.validationMessage);

  const ids = {
    label: `${props.id}-label`,
    textbox: `${props.id}-autocomplete`,
  };
  const refs = {
    control: useRef(),
    multiSelect: useRef(),
  };
  const { container: containerClassName, ...controlClassNames } = {
    container: styles.container,
    ...props.classNames,
  };

  function onInvalid(event) {
    setValidationMessage(event.detail.validationMessage);
  }

  useImperativeHandle(ref, () => combineRefs(
    refs.control,
    refs.multiSelect,
  ));

  return (
    <FormControl
      className={containerClassName}
      id={ids.textbox}
      label={props.label}
      labelId={ids.label}
      name={props.name}
      ref={refs.control}
      required={props.required}
      tooltip={props.tooltip}
      validationMessage={validationMessage}
    >
      <MultiSelectControl
        classNames={controlClassNames}
        containerRef={refs.control}
        filterOptions={props.filterOptions}
        id={props.id}
        label={props.label}
        listboxChildren={props.listboxChildren}
        onChange={props.onChange}
        onInput={props.onInput}
        onInvalid={onInvalid}
        options={props.options}
        optionIDGetter={props.optionIDGetter}
        optionLabelGetter={props.optionLabelGetter}
        placeholder={props.placeholder}
        readOnly={props.readOnly}
        ref={refs.multiSelect}
        required={props.required}
        showLoader={props.showLoader}
        tagChildren={props.tagChildren}
        validationMessage={props.validationMessage}
        value={props.value}
      />
    </FormControl>
  );
});

MultiSelect.propTypes = {
  classNames: PropTypes.shape({
    container: PropTypes.string,
    formControlChildrenContainer: PropTypes.string,
    input: PropTypes.string,
    tagList: PropTypes.string,
  }),
  filterOptions: PropTypes.bool,
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  listboxChildren: PropTypes.func, // eslint-disable-line react/no-unused-prop-types
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  onInput: PropTypes.func,
  options: PropTypes.arrayOf(PropTypes.object).isRequired,
  /** the default getters reflect a native `select` element with `option` element children:
   * this matches an object format of { value: 'unique-identifier', label: 'a human readable, filterable string' } */
  optionIDGetter: PropTypes.func,
  optionLabelGetter: PropTypes.func,
  placeholder: PropTypes.string,
  readOnly: PropTypes.bool,
  required: PropTypes.bool,
  showLoader: PropTypes.bool,
  tagChildren: PropTypes.func,
  tooltip: PropTypes.string,
  validationMessage: PropTypes.string,
  /** value is expected to be an array of objects that matches the "option" structure */
  value: PropTypes.arrayOf(PropTypes.object),
};

MultiSelect.defaultProps = {
  classNames: {},
  filterOptions: true,
  listboxChildren: undefined,
  onChange: () => {},
  onInput: () => {},
  optionIDGetter: option => option.value,
  optionLabelGetter: option => option.label,
  placeholder: undefined,
  readOnly: false,
  required: false,
  showLoader: false,
  tagChildren: undefined,
  tooltip: undefined,
  value: [],
  validationMessage: undefined,
};

export default MultiSelect;
