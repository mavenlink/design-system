import PropTypes from 'prop-types';
import React from 'react';
import styles from './table.module.css';

export default function TableRow({ children, className, ...rest }) {
  return (
    <tr className={className} {...rest}>
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
