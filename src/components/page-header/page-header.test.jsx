import React from 'react';
import renderer from 'react-test-renderer';
import PageHeader from './page-header.jsx';

describe('PageHeader', () => {
  it('has defaults', () => {
    const tree = renderer
      .create((
        <PageHeader />
      )).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
