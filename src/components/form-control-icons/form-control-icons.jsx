import React from 'react';
import PropTypes from 'prop-types';
import Icon from '../icon/icon.jsx';
import cautionSvg from '../../svgs/caution.svg';
import styles from './form-control-icons.css';

export default function FormControlIcons({
  children,
  className,
  validationMessage,
}) {
  return (
    <div className={className}>
      {!!validationMessage && (
        <Icon
          className={styles['invalid-icon']}
          icon={cautionSvg}
          label={validationMessage}
        />
      )}
      {children}
    </div>
  );
}

FormControlIcons.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  validationMessage: PropTypes.string,
};

FormControlIcons.defaultProps = {
  children: undefined,
  className: styles.icons,
  validationMessage: '',
};
