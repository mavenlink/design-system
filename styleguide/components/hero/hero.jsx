import React from 'react';
import PropTypes from 'prop-types';
import Animations from './animations.jsx';
import styles from './hero.css';

export default class Hero extends React.Component {
  static propTypes = {
    slug: PropTypes.string.isRequired,
  }

  constructor() {
    super();
    this.heroRef = React.createRef();
  }

  state = { heroLoaded: false };

  componentDidMount() {
    const heroURL = this.getHeroImageURL();
    this.setHeroLoaded(heroURL);
  }

  getHeroClasses = (slug) => {
    if (slug === '') {
      return styles.home;
    }
    return styles[slug];
  }

  getHeroImageURL = () => {
    const heroCSSUrl = window.getComputedStyle(this.heroRef.current).getPropertyValue('background-image');
    // above returns a url(URL) which needs to be further sliced ;)
    const heroURL = heroCSSUrl.slice(5, -2);
    return heroURL;
  }

  setHeroLoaded = (heroURL) => {
    const img = new Image();
    img.src = heroURL;
    img.onload = () => {
      // cache image
      document.body.style.backgroundImage = heroURL;
      this.setState({ heroLoaded: true });
    };
  }

  isHero = (slug) => {
    const heroes = { overview: true, components: true, soul: true, guidelines: true };
    return heroes[slug];
  }

  render() {
    const heroKlasses = this.getHeroClasses(this.props.slug);

    return (
      <div className={heroKlasses} ref={this.heroRef}>
        {this.state.heroLoaded && <Animations slug={this.props.slug} />}
      </div>
    );
  }
}
