import PropTypes from 'prop-types';
import React from 'react';
import cautionSvg from '../../svgs/icon-caution-fill.svg';
import Icon from '../icon/icon.jsx';
import styles from './input.css';
import labelPropType from './label-prop-type';

/**
 * Base input component. Accepts any prop that an input can take.
 * @see [RFC](https://github.com/mavenlink/rfc/pull/75)
 * @see [Design spec](https://zpl.io/295Yp7p)
 */
export default function Input({ 'aria-labelledby': ariaLabelledBy, className, id, ...rest }) {
  return (
    <input
      {...rest}
      aria-labelledby={ariaLabelledBy}
      className={className}
      id={id}
    />
  );
}

Input.propTypes = {
  /**
   * Reference to the ID of a labelling element. Useful for tables where the column header can serve as
   * the label for the input. Either this or 'id' must be present.
   */
  'aria-labelledby': labelPropType,
  className: PropTypes.string,
  /** ID used by a corresponding label element. Either this or 'aria-labelledby' must be present. */
  id: labelPropType,
};

Input.defaultProps = {
  'aria-labelledby': undefined,
  className: styles.input,
  id: undefined,
};
