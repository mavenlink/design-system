import React from 'react';
import PropTypes from 'prop-types';
import styles from './icon.css';

export default function Icon(props) {
  const classes = [
    props.className,
    styles[`size-${props.size}`],
    props.fill === 'skip' ? '' : styles[`fill-${props.fill}`],
    props.stroke === 'skip' ? '' : styles[`stroke-${props.stroke}`],
    props.currentColor === 'skip' ? '' : styles[`color-${props.currentColor}`],
  ].filter(Boolean);

  return (
    <svg
      aria-label={props.ariaLabel}
      aria-labelledby={props.ariaLabelledBy}
      className={classes.join(' ')}
      id={props.id}
      onClick={props.onClick}
      role={props.role}
      onClick={props.onClick}
    >
      { props.title && <title>{props.title}</title> }
      <use xlinkHref={`#${props.name}`} />
    </svg>
  );
}

Icon.propTypes = {
  ariaLabel: PropTypes.string,
  ariaLabelledBy: PropTypes.string,
  className: PropTypes.string,
  currentColor: PropTypes.oneOf([
    'primary',
    'action',
    'highlight',
    'caution',
    'gray',
    'transparent',
    'skip',
  ]),
  fill: PropTypes.oneOf([
    'primary',
    'action',
    'highlight',
    'caution',
    'gray',
    'none',
    'skip',
  ]),
  id: PropTypes.string,
  name: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  role: PropTypes.oneOf([
    'button',
    'img',
  ]),
  size: PropTypes.oneOf([
    'small',
    'medium',
    'large',
  ]),
  stroke: PropTypes.oneOf([
    'primary',
    'action',
    'highlight',
    'caution',
    'gray',
    'none',
    'skip',
  ]),
  title: PropTypes.string,
  onClick: PropTypes.func,
};

Icon.defaultProps = {
  ariaLabel: undefined,
  ariaLabelledBy: undefined,
  className: styles['icon-base'],
  currentColor: 'transparent',
  fill: 'none',
  id: undefined,
  onClick: () => {},
  role: 'img',
  size: 'medium',
  stroke: 'none',
  title: undefined,
  onClick: () => {},
};
