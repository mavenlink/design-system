import React from 'react';
import PropTypes from 'prop-types';
import iconTick from '../../svgs/tick.svg';
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
            <Icon icon={iconTick} v={2} />
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
