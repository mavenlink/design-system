import React from 'react';
import { render, cleanup, screen } from '@testing-library/react';
import renderer from 'react-test-renderer';
import Popup from './popup.jsx';

describe('Popup', () => {
  const requiredProps = {
    children: 'Hello',
  };

  afterEach(cleanup);

  it('has defaults', () => {
    const tree = renderer.create(<Popup {...requiredProps} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  describe('show API', () => {
    it('presents children when true', () => {
      render(<Popup {...requiredProps} show />);
      expect(screen.getByText('Hello')).toBeInTheDocument();
    });

    it('does not show children when false', () => {
      render(<Popup {...requiredProps} show={false} />);
      expect(screen.queryByText('Hello')).not.toBeInTheDocument();
    });
  });
});
