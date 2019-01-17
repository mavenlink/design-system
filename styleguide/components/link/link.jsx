import PropTypes from 'prop-types';
import React from 'react';
import styles from './link.css';

export default function Link({ children, ...rest }) {
  return <a {...rest} className={styles.link}>{children}</a>;
}

Link.propTypes = {
  children: PropTypes.node.isRequired,
};
