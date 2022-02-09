import React from 'react';
import PropTypes from 'prop-types';
import Icon from '../icon/icon.jsx';
import cautionSvg from '../../svgs/caution.svg';
import styles from './icons.css';

export default function Icons(props) {
  const classNames = {
    container: styles.container,
    validationIcon: styles.validationIcon,
    ...props.classNames,
  };

  return (
    <div className={classNames.container}>
      {!!props.validationMessage && (
        <Icon
          icon={cautionSvg}
          id={props.validationMessageId}
          label={props.validationMessage}
        />
      )}
    </div>
  );
}

Icons.propTypes = {
  classNames: PropTypes.shape({
    container: PropTypes.string,
    validationIcon: PropTypes.string,
  }),
  validationMessage: PropTypes.string,
  /* The ID of the validation icon to describe the invalid control. */
  validationMessageId: PropTypes.string.isRequired,
};

Icons.defaultProps = {
  children: undefined,
  classNames: {},
  validationMessage: '',
};
