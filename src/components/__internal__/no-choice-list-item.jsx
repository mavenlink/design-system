import React from 'react';
import PropTypes from 'prop-types';
import ListOption from '../list-option/list-option.jsx';
import styles from '../no-choice-list-item.css';

export default function NoChoiceListItem(props) {
  return (
    <ListOption value={{}}>
      <span className={styles['no-options']}>{ props.noOptionText }</span>
    </ListOption>
  );
}

NoChoiceListItem.propTypes = {
  noOptionText: PropTypes.string,
};

NoChoiceListItem.defaultProps = {
  noOptionText: 'No options available.',
};
