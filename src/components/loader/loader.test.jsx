import React from 'react';
import { screen, render, cleanup } from '@testing-library/react';
import renderer from 'react-test-renderer';
import Loader from './loader.jsx';
import styles from './loader.css';

describe('Loader', () => {
  it('has defaults', () => {
    const tree = renderer.create((<Loader />)).toJSON();
    expect(tree).toMatchSnapshot();
  });

  afterEach(cleanup);

  describe('inline API', () => {
    it('applies the correct styles when true', () => {
      render(<Loader inline />);
      expect(screen.getByText('Loading...')).toHaveClass(styles.inline);
    });

    it('does not apply inline styles when false', () => {
      render(<Loader inline={false} />);
      expect(screen.getByText('Loading...')).not.toHaveClass(styles.inline);
    });
  });

  describe('styling props', () => {
    it('permits provided inline styling', () => {
      render(<Loader inline cssInline="goof" />);
      expect(screen.getByText('Loading...')).toHaveClass('goof');
    });

    it('permits provided inline container styling', () => {
      render(<Loader inline cssInlineWrapper="goof" />);
      expect(screen.getByTestId('loader')).toHaveClass('goof');
    });

    it('permits provided styling', () => {
      render(<Loader cssSpinner="gaff" />);
      expect(screen.getByText('Loading...')).toHaveClass('gaff');
    });

    it('permits provided styling', () => {
      render(<Loader cssWrapper="gaff" />);
      expect(screen.getByTestId('loader')).toHaveClass('gaff');
    });
  });
});
