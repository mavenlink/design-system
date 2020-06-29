import React from 'react';
import PropTypes from 'prop-types';
import styles from './stars.css';

function hasStars(slug) {
  return slug !== 'soul' && slug !== 'guidelines';
}

export default function Stars(props) {
  return (hasStars(props.slug) &&
    <div className={styles.stars}>
      <div className={styles.mavenConstellation} />
      <div className={styles.largeStar} />
    </div>
  );
}

Stars.propTypes = {
  slug: PropTypes.string.isRequired,
};
