import React from 'react';
import PropTypes from 'prop-types';
import Animations from './animations.jsx';
import styles from './hero.css';
import mdsComponents from './mds-components.jpeg';
import mdsGuidelines from './mds-guidelines.jpeg';
import mdsHero from './mds-hero.jpeg';
import mdsSoul from './mds-soul.jpeg';

const slugsToImage = {
  'section-overview': mdsHero,
  'section-components': mdsComponents,
  'section-guidelines': mdsGuidelines,
  'section-brand-identity': mdsSoul,
};

export default function Hero(props) {
  return slugsToImage[props.slug] ? (
    <div className={styles.container}>
      <img alt="" className={styles.hero} src={slugsToImage[props.slug]} />
      <Animations slug={props.slug} />
    </div>
  ) : (
    null
  );
}

Hero.propTypes = {
  slug: PropTypes.string.isRequired,
};

Hero.defaultProps = {
};
