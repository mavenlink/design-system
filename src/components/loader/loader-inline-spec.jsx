import React from 'react';
import { shallow } from 'enzyme';
import Loader from './loader';
import LoaderInline from './loader-inline';

describe('frontend/components/loader/loader-inline', () => {
  beforeEach(function () {
    this.wrapper = shallow(<LoaderInline />);
  });

  afterEach(function () {
    this.wrapper.unmount();
  });

  it('renders an inline loader', function () {
    expect(this.wrapper).toMatchJSX(<Loader inline />);
  });
});
