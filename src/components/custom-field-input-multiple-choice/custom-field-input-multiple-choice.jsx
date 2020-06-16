import React, {
  useRef,
} from 'react';
import PropTypes from 'prop-types';
import Icon from '../icon/icon.jsx';
import iconCaretDown from '../../svgs/icon-caret-down.svg';
import iconCaretDownDisabled from '../../svgs/icon-caret-down-disabled.svg';
import TagList from '../tag-list/tag-list.jsx';
import Tag from '../tag/tag.jsx';
import styles from './custom-field-input-multiple-choice.css';

function CustomFieldInputMultipleChoice(props) {
  const refs = props.value.map(() => useRef());
  const classContainer = props.readOnly ?
    styles['read-only-container'] :
    styles['read-write-container'];

  return (
    <div>
      <label // eslint-disable-line jsx-a11y/label-has-for
        className={styles.label}
        id={`${props.id}-label`}
      >
        {props.label}
      </label>
      <TagList
        className={classContainer}
        id={props.id}
        labelledBy={`${props.id}-label`}
        refs={refs}
      >
        {props.value.map((choice, index) => (
          <Tag
            defaultActive={index === 0}
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
  );
}

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
