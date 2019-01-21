import React from 'react';
import PropTypes from 'prop-types';
import styles from './stars.scss';

const particles = [];
const twinkles = [];
for (let i = 0; i < 20; i += 1) {
  particles.push(<div className={styles.particle} key={i} />);
  twinkles.push(<div className={styles.twinkle} key={i} />);
}

function hasStars(slug) {
  return slug !== 'soul' && slug !== 'guidelines';
}

export default function Stars(props) {
  return (
    <div>
      {hasStars(props.slug) &&
        <div className={styles.stars}>
          <div>
            {particles}
          </div>
          <div>
            {twinkles}
          </div>
          <div className={styles.mavenConstellation} />
          <div className={styles.largeStar} />
        </div>
      }
    </div>
  );
}

Stars.propTypes = {
  slug: PropTypes.string.isRequired,
};
