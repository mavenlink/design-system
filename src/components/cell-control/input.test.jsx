import React, { createRef } from 'react';
import { render as _render, screen } from '@testing-library/react';
import user from '@testing-library/user-event';
import Input from './input.jsx';

const render = (ui, options = { labelledBy: 'labelled-by' }) => (
  _render(ui, {
    ...options,
    wrapper: props => (
      <table>
        <thead>
          <tr>
            <th id={options.labelledBy}>Column Header</th>
          </tr>
        </thead>
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
    id: 'test-id',
    labelledBy: 'labelled-by',
    name: 'test-name',
  };

  it('has defaults', () => {
    const ref = createRef();
    render(<Input {...requiredProps} ref={ref} />);
    expect(document.body).toMatchSnapshot();
    expect(document.body).toBe(document.activeElement);
    expect(ref.current).toMatchSnapshot();
  });

  it('className API', () => {
    render(<Input {...requiredProps} className="unique-class-name" />);
    expect(document.body).toMatchSnapshot();
  });

  describe('id API', () => {
    it('is a string', () => {
      render(<Input {...requiredProps} id="unique-id" />);
      expect(document.body).toMatchSnapshot();
    });
  });

  describe('labelledBy API', () => {
    it('is a string', () => {
      render(<Input {...requiredProps} labelledBy="unique-labelledby" />, { labelledBy: 'unique-labelledby' });
      expect(screen.getByRole('gridcell')).toHaveAttribute('aria-labelledby', 'unique-labelledby');
    });
  });

  describe('name API', () => {
    it('is a string', () => {
      render(<Input {...requiredProps} name="unique-name" />);
      expect(screen.getByRole('textbox')).toHaveAttribute('name', 'unique-name');
    });
  });

  describe('onChange API', () => {
    it('calls onChange when a new value is selected', () => {
      const onChange = jest.fn(event => event.persist());

      render(<Input {...requiredProps} onChange={onChange} />);

      user.type(screen.getByRole('textbox'), 'hello world!');

      expect(onChange).toHaveBeenCalledWith(expect.objectContaining({
        target: expect.objectContaining({ value: 'hello world!' }),
      }));
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

  describe('required API', () => {
    it('is true', () => {
      render(<Input {...requiredProps} required={true} />);
      expect(screen.getByRole('textbox')).toHaveAttribute('required');
    });

    it('is false', () => {
      render(<Input {...requiredProps} required={false} />);
      expect(screen.getByRole('textbox')).not.toHaveAttribute('required');
    });
  });

  describe('validationMessage API', () => {
    it('is a string', () => {
      render(<Input {...requiredProps} validationMessage="A unique error message." />);
      expect(screen.getByRole('textbox')).toBeInvalid();
      expect(screen.getByRole('textbox')).toHaveAccessibleDescription('A unique error message.');
    });
  });

  describe('value API', () => {
    it('can be supplied', () => {
      render(<Input {...requiredProps} value="Cheese burrito" />);
      expect(screen.getByRole('textbox')).toHaveValue('Cheese burrito');
    });
  });
});
