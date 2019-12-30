import React from 'react';
import PropTypes from 'prop-types';
import styles from './icon.css';

export default function Icon({ className, name, size, stroke, fill, currentColor, title }) {
  const classes = [
    styles['icon-base'],
    size && styles[`size-${size}`],
    styles[`fill-${fill}`],
    stroke && styles[`stroke-${stroke}`],
    styles[`color-${currentColor}`],
    className,
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
    'none',
  ]),
  currentColor: PropTypes.oneOf([
    'primary',
    'action',
    'highlight',
    'caution',
    'transparent',
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
  fill: 'none',
  currentColor: 'transparent',
  size: undefined,
  stroke: undefined,
  title: undefined,
};
