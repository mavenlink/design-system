import React from 'react';
import renderer from 'react-test-renderer';
import { render, screen } from '@testing-library/react';
import TagList from './tag-list.jsx';

describe('TagList', () => {
  it('has defaults', () => {
    expect(renderer.create(<TagList />).toJSON()).toMatchSnapshot();
  });

  describe('children API', () => {
    it('can have children', () => {
      render((
        <TagList>
          <span key="hello">Hello</span>
          <span key="world!">world!</span>
        </TagList>
      ));

      expect(screen.getByText('Hello')).toBeDefined();
      expect(screen.getByText('world!')).toBeDefined();
    });
  });
});
