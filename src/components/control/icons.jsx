import React from 'react';
import PropTypes from 'prop-types';
import cautionSvg from '../../svgs/caution.svg';
import Icon from '../icon/icon.jsx';
import Tooltip from '../tooltip/tooltip.jsx';
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
        <Tooltip
          id=""
          text={props.validationMessage}
          direction="left"
        >
          <Icon
            icon={cautionSvg}
            id={props.validationMessageId}
            label={props.validationMessage}
          />
        </Tooltip>
      )}
      {props.children}
    </div>
  );
}

Icons.propTypes = {
  children: PropTypes.node,
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
