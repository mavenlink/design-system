import PropTypes from 'prop-types';
import React from 'react';
import styles from './table.css';

export default function TableBody({ children, className }) {
  return (
    <tbody className={className}>
      {children}
    </tbody>
  );
}

TableBody.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

TableBody.defaultProps = {
  className: styles.body,
};
