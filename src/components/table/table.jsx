import PropTypes from 'prop-types';
import React from 'react';
import styles from './table.css';

export default function Table({ children, className }) {
  return (
    <table className={className}>
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
