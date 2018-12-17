import PropTypes from 'prop-types';
import React from 'react';
import styles from './table.css';

export default function TableRow({ children, className }) {
  return (
    <tr className={className}>
      {children}
    </tr>
  );
}

TableRow.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

TableRow.defaultProps = {
  className: styles.row,
};
