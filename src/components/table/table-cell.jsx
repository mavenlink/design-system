import PropTypes from 'prop-types';
import React from 'react';
import styles from './table.module.css';

export default function TableCell({ children, className, ...rest }) {
  return (
    <td className={className} {...rest}>
      {children}
    </td>
  );
}

TableCell.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

TableCell.defaultProps = {
  children: null,
  className: styles.cell,
};
