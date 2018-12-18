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
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

TableHeaderCell.defaultProps = {
  className: styles.headerCell,
};
