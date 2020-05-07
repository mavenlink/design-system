import React from 'react';
import PropTypes from 'prop-types';
import styles from './icon.css';

export default function Icon({ className, name, size, stroke, fill, currentColor, title }) {
  const classes = [
    className,
    styles[`size-${size}`],
    fill === 'skip' ? '' : styles[`fill-${fill}`],
    stroke === 'skip' ? '' : styles[`stroke-${stroke}`],
    currentColor === 'skip' ? '' : styles[`color-${currentColor}`],
  ].filter(Boolean);

  return (
    <svg className={classes.join(' ')} role="img">
      { title && <title>{title}</title> }
      <use xlinkHref={`#${name}`} />
    </svg>
  );
}

Icon.propTypes = {
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
  className: styles['icon-base'],
  fill: 'none',
  currentColor: 'transparent',
  size: 'medium',
  stroke: 'none',
  title: undefined,
};
