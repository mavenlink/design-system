import React from 'react';
import PropTypes from 'prop-types';
import styles from './icon.css';

export default function Icon({ className, name, size, stroke, fill, currentColor, title, focusable }) {
  const strokeOnly = stroke && !currentColor && !fill;
  const fillValue = strokeOnly ? 'none' : fill;
  const color = strokeOnly ? 'transparent' : currentColor;

  const classes = [
    styles['icon-base'],
    size && styles[`size-${size}`],
    fillValue && styles[`fill-${fillValue}`],
    stroke && styles[`stroke-${stroke}`],
    color && styles[`color-${color}`],
    className,
  ].filter(Boolean);

  return (
    <svg className={classes.join(' ')} focusable={focusable} title={title}>
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
    'none',
  ]),
  focusable: PropTypes.bool,
  currentColor: PropTypes.oneOf([
    'primary',
    'action',
    'highlight',
    'caution',
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
  ]),
  title: PropTypes.string,
};

Icon.defaultProps = {
  className: undefined,
  fill: undefined,
  focusable: false,
  currentColor: undefined,
  size: undefined,
  stroke: undefined,
  title: undefined,
};
