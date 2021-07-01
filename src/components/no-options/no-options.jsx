import PropTypes from 'prop-types';
import React from 'react';
import styles from './no-options.css';

/**
 * @deprecated
 */
export default function NoOptions(props) {
  return (
    <span className={props.className} id={props.id}>
      {props.text}
    </span>
  );
}

NoOptions.propTypes = {
  className: PropTypes.string,
  id: PropTypes.string,
  text: PropTypes.string,
};

NoOptions.defaultProps = {
  className: styles['no-options'],
  id: undefined,
  text: 'No options available.',
};
