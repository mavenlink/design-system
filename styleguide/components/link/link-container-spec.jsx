import React from 'react';
import { shallow } from 'enzyme';
import ReactGA from 'react-ga';
import LinkContainer from './link-container';

describe('frontend/features/styleguide/components/link/link-container', () => {
  beforeEach(function () {
    spyOn(ReactGA, 'pageview');
    this.wrapper = shallow(<LinkContainer href="/#!/button">Button</LinkContainer>);
  });

  afterEach(function () {
    this.wrapper.unmount();
  });

  describe('clicking', () => {
    beforeEach(function () {
      this.wrapper.diveUntil('Link').simulate('click');
    });

    it('logs a page view', () => {
      expect(ReactGA.pageview).toHaveBeenCalledWith('/button');
    });
  });
});
