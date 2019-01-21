import React from 'react';
import { mount } from 'enzyme';
import styles from './hero.scss';
import Hero from './hero';

describe('frontend/features/styleguide/components/hero/hero', () => {
  const heroes = ['overview', 'components', 'soul', 'guidelines'];

  beforeEach(function () {
    this.render = props => mount(<Hero {...props} />);
  });

  afterEach(function () {
    this.wrapper.unmount();
  });

  describe('classes', () => {
    heroes.forEach((slug) => {
      it(`adds hero classes for the ${slug} slug`, function () {
        this.wrapper = this.render({ slug });
        const expected = styles[slug];
        expect(this.wrapper.find('div').prop('className')).toEqual(expected);
      });
    });

    it('adds the home class for an empty slug', function () {
      this.wrapper = this.render({ slug: '' });
      expect(this.wrapper.find('div').prop('className')).toEqual(styles.home);
    });
  });

  describe('animation', () => {
    beforeEach(function () {
      this.wrapper = this.render({ slug: heroes[0] });
    });

    it('initially does not show the animation', function () {
      expect(this.wrapper.find('Animations').length).toEqual(0);
    });

    describe('when the hero image is loaded', () => {
      beforeEach(function () {
        this.wrapper.setState({ heroLoaded: true });
      });

      it('shows the animation', function () {
        expect(this.wrapper.find('Animations').length).toEqual(1);
      });
    });
  });
});
