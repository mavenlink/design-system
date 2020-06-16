import React from 'react';
import renderer from 'react-test-renderer';
import { render, screen } from '@testing-library/react';
import ListOption from './list-option.jsx';

describe('src/components/list-option/list-option', () => {
  it('renders defaults', () => {
    const tree = renderer.create(<ListOption />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  describe('selected API', () => {
    it('is selected when selected is true', () => {
      render(<ListOption selected>SelectMe!</ListOption>);
      expect(screen.getByText('SelectMe!').getAttribute('aria-selected')).toBe('true');
    });

    it('is not selected when selected is false', () => {
      render(<ListOption>SelectMe!</ListOption>);
      expect(screen.getByText('SelectMe!').getAttribute('aria-selected')).toBe('false');
    });
  });
});
