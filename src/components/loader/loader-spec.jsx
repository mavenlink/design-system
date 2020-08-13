import React from 'react';
import { shallow } from 'enzyme';
import Loader from './loader';
import styles from './loader.css';

describe('frontend/components/loader/loader', () => {
  beforeEach(function () {
    this.render = props => shallow(<Loader {...props} />);
  });

  afterEach(function () {
    this.wrapper.unmount();
  });

  it('renders a spinner', function () {
    this.wrapper = this.render();
    expect(this.wrapper).toMatchJSX(
      <div className={styles.wrapper}><span className={styles.spinner}>Loading...</span></div>,
    );
  });

  describe('when inline is true', () => {
    beforeEach(function () {
      this.wrapper = this.render({ inline: true });
    });

    it('applies the correct styles', function () {
      expect(this.wrapper.prop('className')).toEqual(styles.inlineWrapper);
      expect(this.wrapper.find('span').prop('className')).toEqual(styles.inline);
    });
  });
});
