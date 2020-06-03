import React from 'react';
import PropTypes from 'prop-types';
import iconTick from '../../svgs/icon-tick.svg';
import Icon from '../icon/icon.jsx';
import Tag from '../tag/tag.jsx';
import styles from './tag-skill.css';

export default function TagSkill(props) {
  return (
    <Tag id={props.id} readOnly>
      <span className={styles.row}>
        {props.name}
        {props.level ? (
          <span className={styles.level}>{props.level}</span>
        ) : (
          <span className={styles['level-tick']}>
            <Icon name={iconTick.id} size="small" stroke="skip" fill="skip" currentColor="skip" />
          </span>
        )}
      </span>
    </Tag>
  );
}

TagSkill.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  level: PropTypes.number,
};

TagSkill.defaultProps = {
  level: undefined,
};
