import React, {
  useRef,
  forwardRef,
} from 'react';
import PropTypes from 'prop-types';
import CellControl from '../cell-control/cell-control.jsx';
import MultiSelectControl from '../control/multi-select.jsx';
import styles from './multi-select.css';

const MultiSelect = forwardRef(function MultiSelect(props, ref) {
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
      <MultiSelectControl
        classNames={{
          formControlChildrenContainer: classNames.formControlChildrenContainer,
          formControlChildrenContainerInvalid: classNames.formControlChildrenContainerInvalid,
          formControlChildrenContainerReadOnly: classNames.formControlChildrenContainerReadOnly,
        }}
        containerRef={refs.control}
        filterOptions={props.filterOptions}
        id={props.id}
        listboxChildren={props.listboxChildren}
        onBlur={props.onBlur}
        onChange={props.onChange}
        onFocus={props.onFocus}
        onInput={props.onInput}
        options={props.options}
        optionIDGetter={props.optionIDGetter}
        optionLabelGetter={props.optionLabelGetter}
        placeholder={props.placeholder}
        readOnly={props.readOnly}
        ref={ref}
        required={props.required}
        showLoader={props.showLoader}
        tagChildren={props.tagChildren}
        validationMessage={props.validationMessage}
        value={props.value}
      />
    </CellControl>
  );
});

MultiSelect.propTypes = {
  classNames: PropTypes.shape({
    container: PropTypes.string,
    formControlChildrenContainer: PropTypes.string,
  }),
  filterOptions: PropTypes.bool,
  id: PropTypes.string.isRequired,
  labelledBy: PropTypes.string.isRequired,
  listboxChildren: PropTypes.func, // eslint-disable-line react/no-unused-prop-types
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
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
  validationMessage: PropTypes.string,
  /** value is expected to be an array of objects that matches the "option" structure */
  value: PropTypes.arrayOf(PropTypes.object),
};

MultiSelect.defaultProps = {
  classNames: {},
  filterOptions: true,
  listboxChildren: undefined,
  onBlur: () => {},
  onChange: () => {},
  onFocus: () => {},
  onInput: () => {},
  optionIDGetter: option => option.value,
  optionLabelGetter: option => option.label,
  placeholder: undefined,
  readOnly: false,
  required: false,
  showLoader: false,
  tagChildren: undefined,
  value: [],
  validationMessage: undefined,
};

export default MultiSelect;
