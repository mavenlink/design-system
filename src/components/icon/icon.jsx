import React from 'react';
import PropTypes from 'prop-types';
import styles from './icon.css';

function usePropsForVersion(v, className, size, fill, stroke, currentColor, name, icon) {
  if (v === 1) {
    const classes = [
      className,
      size === 'skip' ? '' : styles[`size-${size}`],
      fill === 'skip' ? '' : styles[`fill-${fill}`],
      stroke === 'skip' ? '' : styles[`stroke-${stroke}`],
      currentColor === 'skip' ? '' : styles[`color-${currentColor}`],
    ].filter(Boolean);

    return {
      className: classes.join(' '),
      name,
    };
  }

  if (v === 2) {
    const viewBox = icon.viewBox.split(' ');
    const width = parseInt(viewBox[2], 10);
    const height = parseInt(viewBox[3], 10);

    return {
      className,
      name: icon.id,
      height,
      width,
    };
  }

  return undefined;
}

function getTabIndex(active, role) {
  if (role === 'button') {
    return active ? 0 : -1;
  }

  return undefined;
}

export default function Icon(props) {
  const vProps = usePropsForVersion(
    props.v,
    props.className,
    props.size,
    props.fill,
    props.stroke,
    props.currentColor,
    props.name,
    props.icon,
  );

  const tabindex = getTabIndex(props.active, props.role);
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
      className={vProps.className}
      height={vProps.height}
      id={props.id}
      onClick={props.onClick}
      role={props.role}
      width={vProps.width}
    >
      { props.title && <title>{props.title}</title> }
      <use onKeyDown={onKeyDown} xlinkHref={`#${vProps.name}`} />
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
  icon: PropTypes.shape({
    id: PropTypes.string,
    viewBox: PropTypes.string,
  }),
  id: PropTypes.string,
  name(props, propName, componentName) {
    if (props.v === 1) {
      if (props.name === undefined) {
        return new Error(`Invalid prop \`${propName}\` supplied to \`${componentName}\`. It is required.`);
      }
    }

    return undefined;
  },
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
  v: PropTypes.number,
};

Icon.defaultProps = {
  ariaLabel: undefined,
  ariaLabelledBy: undefined,
  className: styles['icon-base'],
  currentColor: 'transparent',
  fill: 'none',
  icon: undefined,
  id: undefined,
  name: undefined,
  onClick: () => {},
  onEnter: () => {},
  role: 'img',
  size: 'medium',
  stroke: 'none',
  title: undefined,
  active: true,
  v: 1,
};
