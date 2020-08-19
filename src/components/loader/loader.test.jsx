import React from 'react';
import { screen, render, cleanup } from '@testing-library/react';
import renderer from 'react-test-renderer';
import Loader from './loader.jsx';
import styles from './loader.css';

describe('Loader', () => {
  afterEach(cleanup);

  it('has defaults', () => {
    const tree = renderer.create((<Loader />)).toJSON();
    expect(tree).toMatchSnapshot();
  });

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
});
