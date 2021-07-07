import React from 'react';
import { render as _render, screen } from '@testing-library/react';
import Input from './input.jsx';

const render = (ui, options) => (
  _render(ui, {
    ...options,
    wrapper: props => (
      <table>
        <tbody>
          {props.children}
        </tbody>
      </table>
    ),
  })
);

describe('Input cell control', () => {
  const requiredProps = {
    labelledBy: 'labelled-by',
  };

  it('has defaults', () => {
    render(<Input {...requiredProps} />);
    expect(document.body).toMatchSnapshot();
  });

  describe('labelledBy API', () => {
    it('is a string', () => {
      render(<Input {...requiredProps} labelledBy="unique-labelledby" />);
      expect(screen.getByRole('gridcell')).toHaveAttribute('aria-labelledby', 'unique-labelledby');
    });
  });
});
