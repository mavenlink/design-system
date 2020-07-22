import PropTypes from 'prop-types';
import React from 'react';
import styles from './no-options.css';

export default function NoOptions(props) {
  return (<span className={styles['no-options']}>{ props.text }</span>);
}

NoOptions.propTypes = {
  text: PropTypes.string,
};

NoOptions.defaultProps = {
  text: 'No options available.',
};
