import React from 'react';
import renderer from 'react-test-renderer';
import { render, screen } from '@testing-library/react';
import Tag from './tag.jsx';

describe('Tag', () => {
  it('renders a tag component', () => {
    const tree = renderer
      .create((
        <Tag title="Test Title" />
      )).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('uses a title', () => {
    render(<Tag title="Test Title" />);
    expect(screen.getByText('Test Title').tagName).toEqual('SPAN');
  });
});
