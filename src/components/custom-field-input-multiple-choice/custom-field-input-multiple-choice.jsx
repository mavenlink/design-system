import React, {
  createRef,
  forwardRef,
  useImperativeHandle,
} from 'react';
import PropTypes from 'prop-types';
import Icon from '../icon/icon.jsx';
import iconCaretDown from '../../svgs/icon-caret-down.svg';
import iconCaretDownDisabled from '../../svgs/icon-caret-down-disabled.svg';
import TagList from '../tag-list/tag-list.jsx';
import Tag from '../tag/tag.jsx';
import styles from './custom-field-input-multiple-choice.css';

const CustomFieldInputMultipleChoice = forwardRef(function CustomFieldInputMultipleChoice(props, ref) {
  const refs = props.value.map(() => createRef());
  const classContainer = props.readOnly ?
    styles['read-only-container'] :
    styles['read-write-container'];

  useImperativeHandle(ref, () => ({
  }));

  return (
    <React.Fragment>
      <label className={styles.label} htmlFor={props.id}>{props.label}</label>
      <div className={styles['input-container']}>
        <TagList
          classContainer={classContainer}
          id={props.id}
          refs={refs}
        >
          {props.value.map((choice, index) => (
            <Tag
              id={`${props.id}-${choice.id}`}
              key={`${props.id}-${choice.id}`}
              readOnly={props.readOnly}
              ref={refs[index]}
            >
              {choice.label}
            </Tag>
          ))}
          <Icon className={styles['input-icon']} name={props.readOnly ? iconCaretDownDisabled.id : iconCaretDown.id} fill="skip" />
        </TagList>
      </div>
    </React.Fragment>
  );
});

CustomFieldInputMultipleChoice.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  readOnly: PropTypes.bool,
  value: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  })),
};

CustomFieldInputMultipleChoice.defaultProps = {
  readOnly: false,
  value: [],
};

export default CustomFieldInputMultipleChoice;
