import React from 'react';
import renderer from 'react-test-renderer';
import { render, screen } from '@testing-library/react';
import ListOption from './list-option.jsx';

describe('src/components/list-option/list-option', () => {
  const requiredProps = {
    children: 'Test option',
  };

  it('renders defaults', () => {
    const tree = renderer.create(<ListOption {...requiredProps} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  describe('children API', () => {
    it('accepts a node as children', () => {
      render(<ListOption><div><span>Text is here!</span></div></ListOption>);
      expect(screen.getByText('Text is here!')).toBeInTheDocument();
    });
  });

  describe('defaultActive API', () => {
    it('can be set', () => {
      render(<ListOption {...requiredProps} defaultActive={true} />);
      expect(screen.getByText('Test option')).toHaveAttribute('tabindex', '0');
    });

    it('can be unset', () => {
      render(<ListOption {...requiredProps} defaultActive={false} />);
      expect(screen.getByText('Test option')).toHaveAttribute('tabindex', '-1');
    });
  });

  describe('selected API', () => {
    it('is selected when selected is true', () => {
      render(<ListOption {...requiredProps} selected={true} />);
      expect(screen.getByText('Test option')).toHaveAttribute('aria-selected', 'true');
    });

    it('is not selected when selected is false', () => {
      render(<ListOption {...requiredProps} selected={false} />);
      expect(screen.getByText('Test option')).toHaveAttribute('aria-selected', 'false');
    });
  });

  describe('title API', () => {
    it('accepts a title', () => {
      const title = "Hello. Is it me you're looking for?";
      render(<ListOption {...requiredProps} title={title} />);
      expect(screen.getByText('Test option')).toHaveAttribute('title', title);
    });
  });
});
