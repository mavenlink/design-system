import React from 'react';
import PropTypes from 'prop-types';
import CSSTransition from 'react-transition-group/CSSTransition'; // eslint-disable-line import/extensions
import astroStyles from './astronauts.css';
import Stars from './stars.jsx';

function getTransition(klass, appearKlass, appearActiveKlass) {
  const baseClassName = klass;
  const appearClassName = appearKlass;
  const appearActiveClassName = appearActiveKlass;
  return (
    <CSSTransition
      appear
      key={baseClassName}
      timeout={{
        appear: 0,
      }}
      in={true}
      classNames={{
        appear: astroStyles[appearClassName],
        appearActive: astroStyles[appearActiveClassName],
      }}
      unmountOnExit
    >
      <div className={astroStyles[baseClassName]} />
    </CSSTransition>
  );
}

export default function Animations(props) {
  return (
    <React.Fragment>
      <Stars slug={props.slug} />
      {props.slug === 'section-overview' && [
        getTransition('astro-1', 'astro-1-appear', 'astro-1-appear-active'),
        getTransition('astro-2', 'astro-2-appear', 'astro-2-appear-active'),
        getTransition('astros-laptop', 'astros-laptop-appear', 'astros-laptop-appear-active'),
      ]}
      {props.slug === 'section-components' && [
        getTransition('astros-browser', 'astros-browser-appear', 'astros-browser-appear-active'),
        getTransition('astro-with-browser2', 'astro-with-browser2-appear', 'astro-with-browser2-appear-active'),
      ]}
      {props.slug === 'section-brand-identity' && [
        getTransition('singer-dancers', 'singer-dancers-appear', 'singer-dancers-appear-active'),
        getTransition('singer-flying', 'singer-flying-appear', 'singer-flying-appear-active'),
        getTransition('singers', 'singers-appear', 'singers-appear-active'),
        getTransition('goth-dancer', 'goth-dancer-appear', 'goth-dancer-appear-active'),
      ]}
    </React.Fragment>
  );
}

Animations.propTypes = {
  slug: PropTypes.string.isRequired,
};
