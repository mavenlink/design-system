import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import Date from '../date/date.jsx';

const CustomFieldInputDate = forwardRef(function CustomFieldInputDate(props, ref) {
  return <Date {...props} ref={ref} validationMessage={props.errorText} />;
});

CustomFieldInputDate.propTypes = {
  errorText: PropTypes.string,
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  min: PropTypes.string, /* eslint-disable-line react/no-unused-prop-types */
  max: PropTypes.string, /* eslint-disable-line react/no-unused-prop-types */
  placeholder: PropTypes.string, /* eslint-disable-line react/no-unused-prop-types */
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  readOnly: PropTypes.bool,
  required: PropTypes.bool,
  value: PropTypes.string,
};

CustomFieldInputDate.defaultProps = {
  errorText: '',
  min: undefined,
  max: undefined,
  onChange: () => {},
  placeholder: undefined,
  readOnly: false,
  required: false,
  value: undefined,
};

export default CustomFieldInputDate;
