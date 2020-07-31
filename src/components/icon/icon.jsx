import React from 'react';
import PropTypes from 'prop-types';
import styles from './icon.css';

export default function Icon(props) {
  const classes = [
    props.className,
    props.size === 'skip' ? '' : styles[`size-${props.size}`],
    props.fill === 'skip' ? '' : styles[`fill-${props.fill}`],
    props.stroke === 'skip' ? '' : styles[`stroke-${props.stroke}`],
    props.currentColor === 'skip' ? '' : styles[`color-${props.currentColor}`],
  ].filter(Boolean);

  const tabindex = props.active && props.role === 'button' ? 0 : -1;
  const onKeyDown = (event) => {
    if (event.key === 'Enter' || event.key === 'Space') {
      props.onEnter();
    }
  };

  return (
    <svg
      tabIndex={tabindex}
      aria-label={props.ariaLabel}
      aria-labelledby={props.ariaLabelledBy}
      className={classes.join(' ')}
      height={props.height}
      id={props.id}
      onClick={props.onClick}
      role={props.role}
      width={props.width}
    >
      { props.title && <title>{props.title}</title> }
      <use onKeyDown={onKeyDown} xlinkHref={`#${props.name}`} />
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
  height: PropTypes.number,
  id: PropTypes.string,
  name: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  onEnter: PropTypes.func,
  role: PropTypes.oneOf([
    'button',
    'img',
  ]),
  size: PropTypes.oneOf([
    'small',
    'medium',
    'large',
    'skip',
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
  active: PropTypes.bool,
  width: PropTypes.number,
};

Icon.defaultProps = {
  ariaLabel: undefined,
  ariaLabelledBy: undefined,
  className: styles['icon-base'],
  currentColor: 'transparent',
  fill: 'none',
  height: undefined,
  id: undefined,
  onClick: () => {},
  onEnter: () => {},
  role: 'img',
  size: 'medium',
  stroke: 'none',
  title: undefined,
  active: true,
  width: undefined,
};
