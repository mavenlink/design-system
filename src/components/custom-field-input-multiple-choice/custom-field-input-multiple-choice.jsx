import React, {
  createRef,
  forwardRef,
  useImperativeHandle,
} from 'react';
import PropTypes from 'prop-types';
import TagList from '../tag-list/tag-list.jsx';
import Tag from '../tag/tag.jsx';

const CustomFieldInputMultipleChoice = forwardRef(function CustomFieldInputMultipleChoice(props, ref) {
  const refs = props.value.map(() => createRef());

  useImperativeHandle(ref, () => ({
  }));

  return (
    <TagList refs={refs}>
      {props.value.map((choice, index) => (
        <Tag
          id={`${props.id}-${choice.id}`}
          key={`${props.id}-${choice.id}`}
          ref={refs[index]}
        >
          {choice.label}
        </Tag>
      ))}
    </TagList>
  );
});

CustomFieldInputMultipleChoice.propTypes = {
  id: PropTypes.string.isRequired,
  value: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  })),
};

CustomFieldInputMultipleChoice.defaultProps = {
  value: [],
};

export default CustomFieldInputMultipleChoice;
