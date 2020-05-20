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

  it('has a description', () => {
    render(<PageHeader title="Title" description="I am a description" />);
    expect(screen.getByText('I am a description').tagName).toEqual('P');
  });
});
