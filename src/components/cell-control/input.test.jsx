import React from 'react';
import { render as _render, screen } from '@testing-library/react';
import Input from './input.jsx';

const render = (ui, options) => (
  _render(ui, {
    ...options,
    wrapper: props => (
      <table>
        <tbody>
          <tr>
            {props.children}
          </tr>
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

  describe('readOnly API', () => {
    it('is true', () => {
      render(<Input {...requiredProps} readOnly={true} />);
      expect(screen.getByRole('textbox')).toHaveAttribute('readonly');
    });

    it('is false', () => {
      render(<Input {...requiredProps} readOnly={false} />);
      expect(screen.getByRole('textbox')).not.toHaveAttribute('readonly');
    });
  });
});
