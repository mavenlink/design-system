import PropTypes from 'prop-types';
import React from 'react';
import styles from './section-row.css';

export default function SectionRow(props) {
  return (
    <div className={styles['section-row']}>
      {props.children}
    </div>
  );
}

SectionRow.propTypes = {
  children: PropTypes.node,
};

SectionRow.defaultProps = {
  children: undefined,
};
