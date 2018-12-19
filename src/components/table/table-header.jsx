import PropTypes from 'prop-types';
import React from 'react';
import styles from './table.module.css';

export default function TableHeader({ children, className, cssRow, ...rest }) {
  return (
    <thead className={className} {...rest}>
      <tr className={cssRow}>
        {children}
      </tr>
    </thead>
  );
}

TableHeader.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  cssRow: PropTypes.string,
};

TableHeader.defaultProps = {
  className: styles.head,
  cssRow: undefined,
};
