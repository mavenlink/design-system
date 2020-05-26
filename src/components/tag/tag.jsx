import PropTypes from 'prop-types';
import React from 'react';
import styles from './tag.css';
import clearIcon from '../../svgs/icon-clear-small.svg';
import Icon from '../icon/index.js';

export default function Tag(props) {
  return (
    <div className={styles.tag} role="row">
      <span className={styles.title} role="gridcell">{props.title}</span>
      <Icon name={clearIcon.id} size="small" stroke="skip" fill="skip" currentColor="skip" />
    </div>
  );
}

Tag.propTypes = {
  title: PropTypes.string.isRequired,
};

Tag.defaultProps = {};
