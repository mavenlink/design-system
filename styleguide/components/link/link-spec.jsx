import React from 'react';
import { shallow } from 'enzyme';
import Link from './link';

describe('frontend/features/styleguide/components/link/link', () => {
  beforeEach(function () {
    this.wrapper = shallow(<Link href="mavenlink.com">Click!</Link>);
  });

  afterEach(function () {
    this.wrapper.unmount();
  });

  it('is a link', function () {
    expect(this.wrapper).toMatchJSX(<a href="mavenlink.com">Click!</a>);
  });
});
