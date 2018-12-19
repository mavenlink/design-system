import PropTypes from 'prop-types';
import React from 'react';
import styles from './table.css';

export default function TableHeaderCell({ children, className, ...rest }) {
  return (
    <th className={className} {...rest}>
      {children}
    </th>
  );
}

TableHeaderCell.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

TableHeaderCell.defaultProps = {
  children: null,
  className: styles.headerCell,
};
