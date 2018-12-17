import PropTypes from 'prop-types';
import React from 'react';
import styles from './table.css';

export default function TableHead({ children, className, cssRow, ...rest }) {
  return (
    <thead className={className} {...rest}>
      <tr className={cssRow}>
        {React.Children.map(children, (child) => {
          return React.cloneElement(child, { header: true });
        })}
      </tr>
    </thead>
  );
}

TableHead.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  cssRow: PropTypes.string,
};

TableHead.defaultProps = {
  className: styles.head,
  cssRow: undefined,
};
