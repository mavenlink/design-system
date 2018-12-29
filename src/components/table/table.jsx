import PropTypes from 'prop-types';
import React from 'react';
import styles from './table.module.css';

/**
 * Base table component.
 * @see [RFC](https://github.com/mavenlink/rfc/pull/148)
 */
export default function Table({ children, className, ...rest }) {
  return (
    <table className={className} {...rest}>
      {children}
    </table>
  );
}

Table.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

Table.defaultProps = {
  className: styles.table,
};
