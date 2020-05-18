import React from 'react';
import renderer from 'react-test-renderer';
import { render, screen } from '@testing-library/react';
import PageHeader from './page-header.jsx';

describe('PageHeader', () => {
  it('has defaults', () => {
    const tree = renderer
      .create((
        <PageHeader title="Defaults" />
      )).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('has a title', () => {
    render(<PageHeader title="Another title" />);
    expect(screen.getByText('Another title').tagName).toEqual('H1');
  });
});
