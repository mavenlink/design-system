import React from 'react';
import renderer from 'react-test-renderer';
import { render, screen } from '@testing-library/react';
import TagList from './tag-list.jsx';

describe('TagList', () => {
  const requiredProps = {
    children: <span>Test Fake Tag</span>,
  };

  it('renders a TagList', () => {
    const tree = renderer
      .create((
        <TagList {...requiredProps} />
      )).toJSON();
    expect(tree).toMatchSnapshot();
  });

  describe('children API', () => {
    it('can be set', () => {
      render(<TagList {...requiredProps}>Unique children</TagList>);
      expect(screen.getByText('Unique children')).toBeDefined();
    });
  });
});
