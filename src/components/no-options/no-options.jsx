import PropTypes from 'prop-types';
import React from 'react';
import styles from './no-options.css';

export default function NoOptions(props) {
  return (<span className={props.className}>{ props.text }</span>);
}

NoOptions.propTypes = {
  className: PropTypes.string,
  text: PropTypes.string,
};

NoOptions.defaultProps = {
  className: styles['no-options'],
  text: 'No options available.',
};
