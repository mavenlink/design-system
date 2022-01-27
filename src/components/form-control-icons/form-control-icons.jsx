import React from 'react';
import PropTypes from 'prop-types';
import Icon from '../icon/icon.jsx';
import cautionSvg from '../../svgs/caution.svg';
import styles from './form-control-icons.css';

export default function FormControlIcons(props) {
  return (
    <div className={props.className}>
      {!!props.validationMessage && (
        <Icon
          icon={cautionSvg}
          id={props.validationMessageId}
          label={props.validationMessage}
        />
      )}
      {props.children}
    </div>
  );
}

FormControlIcons.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  validationMessage: PropTypes.string,
  validationMessageId: PropTypes.string,
};

FormControlIcons.defaultProps = {
  children: undefined,
  className: styles.icons,
  validationMessage: '',
  validationMessageId: undefined, // Maybe required?
};
