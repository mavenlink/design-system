import React from 'react';
import renderer from 'react-test-renderer';
import { render, screen } from '@testing-library/react';
import ListOption from './list-option.jsx';

describe('src/components/list-option/list-option', () => {
  it('renders defaults', () => {
    const tree = renderer.create(<ListOption />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  describe('children API', () => {
    it('accepts a node as children', () => {
      render(<ListOption><div><span>Text is here!</span></div></ListOption>);
      expect(screen.getByText('Text is here!')).toBeInTheDocument();
    });
  });

  describe('selected API', () => {
    it('is selected when selected is true', () => {
      render(<ListOption selected>SelectMe!</ListOption>);
      expect(screen.getByText('SelectMe!')).toHaveAttribute('aria-selected', 'true');
    });

    it('is not selected when selected is false', () => {
      render(<ListOption>SelectMe!</ListOption>);
      expect(screen.getByText('SelectMe!')).toHaveAttribute('aria-selected', 'false');
    });
  });

  describe('title API', () => {
    it('accepts a title', () => {
      const title = "Hello. Is it me you're looking for?";
      render(<ListOption title={title} />);

      expect(screen.getByRole('option')).toHaveAttribute('title', title);
    });
  });
});
