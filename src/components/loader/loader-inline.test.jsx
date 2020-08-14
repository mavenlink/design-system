import React from 'react';
import renderer from 'react-test-renderer';
import LoaderInline from './loader-inline.jsx';

describe('LoaderInline', () => {
  it('has defaults', () => {
    const tree = renderer.create((<LoaderInline />)).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
