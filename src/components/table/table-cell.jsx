import PropTypes from 'prop-types';
import React from 'react';
import styles from './table.css';

export default function TableCell({ children, className, header }) {
  const Element = header ? 'th' : 'td';

  return (
    <Element className={className}>
      {children}
    </Element>
  );
}

TableCell.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  header: PropTypes.bool,
};

TableCell.defaultProps = {
  className: styles.cell,
  header: false,
};
