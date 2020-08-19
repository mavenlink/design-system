import React from 'react';
import { render, screen } from '@testing-library/react';
import renderer from 'react-test-renderer';
import LoaderInline from './loader-inline.jsx';

describe('LoaderInline', () => {
  it('has defaults', () => {
    const tree = renderer.create((<LoaderInline />)).toJSON();
    expect(tree).toMatchSnapshot();
  });

  describe('styling props', () => {
    it('permits provided inline styling', () => {
      render(<LoaderInline cssInline="goof" />);
      expect(screen.getByText('Loading...')).toHaveClass('goof');
    });

    it('permits provided inline container styling', () => {
      render(<LoaderInline cssInlineWrapper="gaff" />);
      expect(screen.getByTestId('loader')).toHaveClass('gaff');
    });
  });
});
