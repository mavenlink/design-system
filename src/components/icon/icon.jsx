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
      aria-label={props.ariaLabel || props.name.split('-')[1]}
      aria-labelledby={props.ariaLabelledBy}
      className={classes.join(' ')}
      id={props.id}
      role={props.role}
    >
      { props.title && <title>{props.title}</title> }
      <use xlinkHref={`#${props.name}`} />
    </svg>
  );
}

Icon.propTypes = {
  id: PropTypes.string,
  ariaLabel: PropTypes.string,
  ariaLabelledBy: PropTypes.string,
  className: PropTypes.string,
  fill: PropTypes.oneOf([
    'primary',
    'action',
    'highlight',
    'caution',
    'gray',
    'none',
    'skip',
  ]),
  currentColor: PropTypes.oneOf([
    'primary',
    'action',
    'highlight',
    'caution',
    'gray',
    'transparent',
    'skip',
  ]),
  name: PropTypes.string.isRequired,
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
};

Icon.defaultProps = {
  ariaLabel: undefined,
  ariaLabelledBy: undefined,
  className: styles['icon-base'],
  fill: 'none',
  id: undefined,
  currentColor: 'transparent',
  role: 'img',
  size: 'medium',
  stroke: 'none',
  title: undefined,
};
