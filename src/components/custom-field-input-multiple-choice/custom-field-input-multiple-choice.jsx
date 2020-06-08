import React, {
  forwardRef,
  useImperativeHandle,
} from 'react';
import PropTypes from 'prop-types';

const CustomFieldInputMultipleChoice = forwardRef(function CustomFieldInputMultipleChoice(props, ref) {
  useImperativeHandle(ref, () => ({
  }));

  return (
    <div>
      {props.test}
    </div>
  );
});

CustomFieldInputMultipleChoice.propTypes = {
  test: PropTypes.string,
};

CustomFieldInputMultipleChoice.defaultProps = {
  test: 'hello world!',
};

export default CustomFieldInputMultipleChoice;
