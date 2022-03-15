import React, { createRef } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Checkbox from './inline-checkbox.jsx';

describe('Checkbox', () => {
  const name = 'You good?';
  const requiredProps = {
    id: 'fart',
    label: name,
  };

  it('has defaults', () => {
    const ref = createRef();
    render(<Checkbox {...requiredProps} ref={ref} />);
    expect(document.body).toMatchSnapshot();
    expect(ref.current).toMatchSnapshot();
  });

  describe('className API', () => {
    it('sets <input> classname', () => {
      const className = 'kerfuffle';
      render(<Checkbox {...requiredProps} className={className} />);
      expect(screen.getByRole('checkbox', { name })).toHaveClass(className);
    });
  });

  describe('cssContainer API', () => {
    it('sets input container className', () => {
      render(<Checkbox {...requiredProps} cssContainer="test-class" />);
      expect(screen.getByRole('presentation')).toHaveClass('test-class');
    });
  });

  describe('id API', () => {
    it('sets the id', () => {
      render(<Checkbox {...requiredProps} id="hello-mario" />);
      expect(screen.getByRole('checkbox', { name })).toHaveAttribute(
        'id',
        'hello-mario',
      );
    });

    it('is set on the ref', () => {
      const ref = createRef();
      render(<Checkbox {...requiredProps} ref={ref} id="hello-mario" />);
      expect(ref.current.id).toBe('hello-mario');
    });
  });

  describe('label API', () => {
    it('can be set', () => {
      render(<Checkbox {...requiredProps} label="Unique label" />);
      expect(
        screen.getByRole('checkbox', { name: 'Unique label' }),
      ).toBeInTheDocument();
    });
  });

  describe('name API', () => {
    it('sets the name attribute', () => {
      render(<Checkbox {...requiredProps} name="test-name" />);
      expect(screen.getByRole('checkbox', { name })).toHaveAttribute(
        'name',
        'test-name',
      );
    });

    it('is set on the ref', () => {
      const ref = createRef();
      render(<Checkbox {...requiredProps} name="unique-name" ref={ref} />);
      expect(ref.current.name).toBe('unique-name');
    });
  });

  describe('onblur api', () => {
    it('sets the onblur handler', () => {
      const onBlur = jest.fn();
      render(<Checkbox {...requiredProps} onBlur={onBlur} />);
      userEvent.click(screen.getByRole('checkbox', { name }));
      userEvent.tab();
      expect(onBlur.mock.calls.length).toEqual(1);
    });
  });

  describe('onChange API', () => {
    it('sets the onChange handler', () => {
      const onChange = jest.fn();
      render(<Checkbox {...requiredProps} onChange={onChange} />);
      userEvent.click(screen.getByRole('checkbox', { name }));
      expect(onChange.mock.calls.length).toEqual(1);
    });
  });

  describe('onFocus API', () => {
    it('sets the onFocus handler', () => {
      const onFocus = jest.fn();
      render(<Checkbox {...requiredProps} onFocus={onFocus} />);
      userEvent.click(screen.getByRole('checkbox', { name }));
      expect(onFocus.mock.calls.length).toEqual(1);
    });
  });

  describe('readOnly API', () => {
    it('sets readonly', () => {
      render(<Checkbox {...requiredProps} readOnly={true} />);
      expect(screen.getByRole('checkbox', { name })).toHaveAttribute(
        'readonly',
      );
      userEvent.click(screen.getByRole('checkbox', { name }));
      expect(screen.getByRole('checkbox', { name })).not.toBeChecked();
      userEvent.keyboard(' ');
      expect(screen.getByRole('checkbox', { name })).not.toBeChecked();
    });

    it('can be not readonly', () => {
      render(<Checkbox {...requiredProps} readOnly={false} />);
      expect(screen.getByRole('checkbox', { name })).not.toHaveAttribute(
        'readonly',
      );
      userEvent.click(screen.getByRole('checkbox', { name }));
      expect(screen.getByRole('checkbox', { name })).toBeChecked();
      userEvent.keyboard(' ');
      expect(screen.getByRole('checkbox', { name })).not.toBeChecked();
    });
  });

  describe('ref api', () => {
    it('can be set', () => {
      const ref = createRef();
      render(<Checkbox {...requiredProps} ref={ref} checked />);
      expect(ref.current.checked).toEqual(true);
    });
  });

  describe('checked API', () => {
    it('sets the checked value', () => {
      render(<Checkbox {...requiredProps} checked />);
      expect(screen.getByRole('checkbox', { name })).toBeChecked();
    });

    it('updates the value', () => {
      const { rerender } = render(
        <Checkbox {...requiredProps} checked={false} />,
      );
      expect(screen.getByRole('checkbox', { name })).not.toBeChecked();
      rerender(<Checkbox {...requiredProps} checked={true} />);
      expect(screen.getByRole('checkbox', { name })).toBeChecked();
    });

    it('is set on the ref', () => {
      const ref = createRef();
      const { rerender } = render(
        <Checkbox {...requiredProps} ref={ref} checked={false} />,
      );
      expect(ref.current.checked).toBe(false);

      userEvent.click(screen.getByRole('checkbox', { name }));

      rerender(<Checkbox {...requiredProps} ref={ref} checked={true} />);
      expect(ref.current.checked).toBe(true);
    });
  });

  describe('value api', () => {
    it('prioritizes the value provided', () => {
      const ref = createRef();
      render(<Checkbox {...requiredProps} value="i-am-good-bruh" ref={ref} />);
      expect(ref.current.value).toBe('i-am-good-bruh');
    });

    it('sets the value to on if checked', () => {
      const ref = createRef();
      render(<Checkbox {...requiredProps} checked ref={ref} />);
      expect(ref.current.value).toBe('on');
    });

    it('sets the value to off if not checked', () => {
      const ref = createRef();
      render(<Checkbox {...requiredProps} checked={false} ref={ref} />);
      expect(ref.current.value).toBe('off');
    });
  });

  describe('dirty api', () => {
    it('is unset without any changes', () => {
      const ref = createRef();
      render(<Checkbox {...requiredProps} ref={ref} />);
      expect(ref.current.dirty).toBe(false);
    });

    it('is set with any changes', () => {
      const ref = createRef();
      render(<Checkbox {...requiredProps} ref={ref} />);
      userEvent.click(screen.getByRole('checkbox', { name }));
      expect(ref.current.dirty).toBe(true);
    });

    it('is unset with changes back to initial state', () => {
      const ref = createRef();
      render(<Checkbox {...requiredProps} ref={ref} checked />);
      userEvent.click(screen.getByRole('checkbox', { name }));
      expect(ref.current.dirty).toBe(true);

      userEvent.click(screen.getByRole('checkbox', { name }));
      expect(ref.current.dirty).toBe(false);
    });

    it('is unset with changes and new value prop', () => {
      const ref = createRef();
      const { rerender } = render(
        <Checkbox {...requiredProps} ref={ref} checked={true} />,
      );
      userEvent.click(screen.getByRole('checkbox', { name }));
      expect(ref.current.dirty).toBe(true);

      rerender(<Checkbox {...requiredProps} ref={ref} checked={false} />);
      expect(ref.current.dirty).toBe(false);
    });
  });

  describe('tooltip API', () => {
    const tooltip = 'I am an input, short and stout.';

    it('applies a description to the input when the help icon is hovered', () => {
      render(<Checkbox {...requiredProps} tooltip={tooltip} />);
      userEvent.hover(screen.getByRole('img'));
      expect(screen.getByLabelText(requiredProps.label)).toHaveAccessibleDescription(
        tooltip,
      );
    });

    it('removes the description to the input when the help icon is unhovered', () => {
      render(<Checkbox {...requiredProps} tooltip={tooltip} />);
      userEvent.hover(screen.getByRole('img'));
      userEvent.unhover(screen.getByRole('img'));
      expect(screen.getByRole('checkbox', { name })).toHaveAccessibleDescription('');
    });
  });

  describe('required api', () => {
    it('can be set', () => {
      render(<Checkbox {...requiredProps} required />);
      expect(screen.getByRole('checkbox', { name })).toBeRequired();
      expect(screen.getByRole('checkbox', { name })).toBeInvalid();
    });

    it('tells the user it is required', () => {
      render(<Checkbox {...requiredProps} required />);
      expect(screen.getByText(/required/i)).toBeInTheDocument();
    });

    it('can be unset', () => {
      render(<Checkbox {...requiredProps} required={false} />);
      expect(screen.getByRole('checkbox', { name })).not.toBeRequired();
      expect(screen.getByRole('checkbox', { name })).toBeValid();
    });

    it('is invalid on mount but does not have an error message', () => {
      render(<Checkbox {...requiredProps} required />);
      expect(screen.getByRole('checkbox', { name })).toBeInvalid();
      expect(screen.getByRole('checkbox', { name })).toHaveAccessibleDescription('');
    });

    it('shows validation message after tabbing through', () => {
      render(<Checkbox {...requiredProps} required />);
      userEvent.tab();
      expect(document.activeElement).toBe(
        screen.getByRole('checkbox', { name }),
      );
      expect(screen.getByRole('checkbox', { name })).toBeInvalid();
      expect(screen.getByRole('checkbox', { name })).toHaveAccessibleDescription('');

      userEvent.tab();
      expect(screen.getByRole('checkbox', { name })).toBeInvalid();
      expect(screen.getByRole('checkbox', { name })).toHaveAccessibleDescription(
        'Constraints not satisfied',
      );
    });
  });

  describe('validation message api', () => {
    it('can be set', () => {
      render(<Checkbox {...requiredProps} validationMessage="unique error" />);
      expect(screen.getByRole('checkbox', { name })).toBeInvalid();
      expect(screen.getByRole('checkbox', { name })).toHaveAccessibleDescription(
        'unique error',
      );
      expect(
        screen.getByRole('img', { name: 'unique error' }),
      ).toBeInTheDocument();
    });

    it('can be unset', () => {
      render(<Checkbox {...requiredProps} validationMessage="" />);
      expect(screen.getByRole('checkbox', { name })).toBeValid();
      expect(screen.getByRole('checkbox', { name })).toHaveAccessibleDescription('');
    });
  });
});
