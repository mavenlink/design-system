import PropTypes from 'prop-types';
import React from 'react';
import styles from './link.css';

export default function Link({ children, className, ...rest }) {
  return <a className={className} {...rest}>{children}</a>;
}

Link.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

Link.defaultProps = {
  className: styles.link,
};
