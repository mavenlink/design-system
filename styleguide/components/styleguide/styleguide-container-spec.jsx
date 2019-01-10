import React from 'react';
import { shallow } from 'enzyme';
import ReactGA from 'react-ga';
import StyleguideContainer from './styleguide-container';

describe('frontend/features/styleguide/components/styleguide/styleguide-container', () => {
  beforeEach(function () {
    spyOn(ReactGA, 'pageview');
    this.wrapper = shallow(
      <StyleguideContainer toc="toc">
        Styleguide!
      </StyleguideContainer>,
    );
  });

  afterEach(function () {
    this.wrapper.unmount();
  });

  it('logs a page view', () => {
    expect(ReactGA.pageview).toHaveBeenCalled();
  });
});
