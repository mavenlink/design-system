import React, { createRef } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CustomFieldInputNumber from './custom-field-input-number.jsx';

describe('CustomFieldInputNumber', () => {
  const requiredProps = {
    id: 'test-input',
    label: 'Test label',
    name: 'field-id',
  };

  it('has defaults', () => {
    const ref = createRef();
    render(<CustomFieldInputNumber {...requiredProps} ref={ref} />);
    expect(document.body).toMatchSnapshot();
    expect(ref.current).toMatchSnapshot();
  });
  describe('className API', () => {
    it('prioritizes className prop', () => {
      render(<CustomFieldInputNumber {...requiredProps} className="prioritize-me" />);
      expect(screen.getByLabelText('Test label')).toHaveClass('prioritize-me');
    });
  });

  describe('dirty ref API', () => {
    it('updates on user interactions', () => {
      const ref = createRef();
      render(<CustomFieldInputNumber {...requiredProps} ref={ref} value={12} />);
      expect(ref.current.dirty).toEqual(false);
      userEvent.type(screen.getByLabelText('Test label'), '{backspace}');
      expect(ref.current.dirty).toEqual(true);
      userEvent.type(screen.getByLabelText('Test label'), '{backspace}');
      expect(ref.current.dirty).toEqual(true);
    });
  });

  describe('disabled API', () => {
    it('can be disabled', () => {
      render(<CustomFieldInputNumber {...requiredProps} disabled />);
      expect(screen.getByLabelText('Test label')).toHaveAttribute('readOnly');
    });

    it('can be enabled', () => {
      render(<CustomFieldInputNumber {...requiredProps} />);
      expect(screen.getByLabelText('Test label')).not.toHaveAttribute('readOnly');
    });
  });

  describe('errorText API', () => {
    it('is invalid when true', () => {
      render(<CustomFieldInputNumber {...requiredProps} errorText="Here's some help text!" />);
      expect(screen.getByLabelText('Test label')).toBeInvalid();
    });

    it('updates correctly with a new errorText prop', () => {
      const { rerender } = render(<CustomFieldInputNumber {...requiredProps} errorText="" />);
      expect(screen.queryByText("Here's some help text!")).not.toBeInTheDocument();
      rerender(<CustomFieldInputNumber {...requiredProps} errorText="Here's some help text!" />);
      expect(screen.getByLabelText('Test label')).toHaveAccessibleDescription("Here's some help text!");
    });

    it('shows the provided errorText when true', () => {
      render(<CustomFieldInputNumber {...requiredProps} errorText="Here's some help text!" />);
      expect(screen.getByLabelText('Test label')).toHaveAccessibleDescription("Here's some help text!");
    });

    it('does not show errorText when it does not exist', () => {
      render(<CustomFieldInputNumber {...requiredProps} errorText="" />);
      expect(screen.queryByText("Here's some help text!")).not.toBeInTheDocument();
    });
  });

  describe('focus ref API', () => {
    it('focuses the input', () => {
      const ref = createRef();
      render(<CustomFieldInputNumber {...requiredProps} ref={ref} />);
      expect(screen.getByLabelText('Test label')).not.toBe(document.activeElement);
      ref.current.focus();
      expect(screen.getByLabelText('Test label')).toBe(document.activeElement);
    });
  });

  describe('id API', () => {
    it('sets the id attribute', () => {
      render(<CustomFieldInputNumber {...requiredProps} id="test-id" />);
      expect(screen.getByLabelText('Test label')).toHaveAttribute('id', 'test-id');
    });
  });

  describe('label API', () => {
    it('sets the label', () => {
      render(<CustomFieldInputNumber {...requiredProps} label="Another label" />);
      expect(screen.getByLabelText('Another label')).toBeDefined();
    });
  });

  describe('name API', () => {
    it('sets the name attribute', () => {
      render(<CustomFieldInputNumber {...requiredProps} name="test-name" />);
      expect(screen.getByLabelText('Test label')).toHaveAttribute('name', 'test-name');
    });
  });

  describe('onBlur API', () => {
    it('calls the handler', () => {
      const onBlurSpy = jest.fn(event => event.persist());
      const { getByLabelText } = render(<CustomFieldInputNumber {...requiredProps} onBlur={onBlurSpy} />);
      userEvent.click(getByLabelText('Test label'));
      userEvent.tab();
      expect(onBlurSpy).toHaveBeenCalledWith(expect.objectContaining({
        target: expect.objectContaining({}),
      }));
    });
  });

  describe('onChange API', () => {
    it('calls the handler', () => {
      const onChangeSpy = jest.fn(event => event.persist());
      const { getByLabelText } = render(<CustomFieldInputNumber {...requiredProps} onChange={onChangeSpy} />);
      userEvent.type(getByLabelText('Test label'), '1234');
      expect(onChangeSpy).toHaveBeenCalledWith(expect.objectContaining({
        target: expect.objectContaining({
          value: '1234',
        }),
      }));
    });
  });

  describe('placeholder API', () => {
    it('sets the placeholder attribute', () => {
      const placeholder = 'This is placeholder input';
      render(<CustomFieldInputNumber {...requiredProps} placeholder={placeholder} />);
      expect(screen.getByLabelText('Test label')).toHaveAttribute('placeholder', placeholder);
    });
  });

  describe('required API', () => {
    it('sets the required attribute', () => {
      render(<CustomFieldInputNumber {...requiredProps} required />);
      expect(screen.getByLabelText('Test label')).toBeRequired();
    });

    it('unsets the required attribute', () => {
      render(<CustomFieldInputNumber {...requiredProps} />);
      expect(screen.getByLabelText('Test label')).not.toBeRequired();
    });
  });

  describe('validity ref API', () => {
    it('is the DOM validity state', () => {
      const ref = createRef();
      render(<CustomFieldInputNumber {...requiredProps} ref={ref} />);
      expect(ref.current.validity).toBe(screen.getByLabelText('Test label').validity);
    });
  });

  describe('value API', () => {
    it('is valid on a positive integer', () => {
      const ref = createRef();
      render(<CustomFieldInputNumber {...requiredProps} ref={ref} value={1} />);
      expect(screen.getByLabelText('Test label')).toBeValid();
      expect(screen.getByLabelText('Test label')).toHaveValue(1);
      expect(ref.current.value).toEqual(1);
    });

    it('responds with the undefined as value when not defined', () => {
      const ref = createRef();
      render(<CustomFieldInputNumber ref={ref} {...requiredProps} />);
      expect(ref.current.value).toEqual(undefined);
    });

    it('is valid on zero', () => {
      render(<CustomFieldInputNumber {...requiredProps} value={0} />);
      expect(screen.getByLabelText('Test label')).toBeValid();
      expect(screen.getByLabelText('Test label')).toHaveValue(0);
    });

    it('is valid on undefined', () => {
      render(<CustomFieldInputNumber {...requiredProps} value={undefined} />);
      expect(screen.getByLabelText('Test label')).toBeValid();
      expect(screen.getByLabelText('Test label')).toHaveValue(null);
    });

    it('is valid on a negative integer', () => {
      render(<CustomFieldInputNumber {...requiredProps} value={-1} />);
      expect(screen.getByLabelText('Test label')).toBeValid();
    });

    it('is valid on a decimal integer', () => {
      render(<CustomFieldInputNumber {...requiredProps} value={1.00} />);
      expect(screen.getByLabelText('Test label')).toBeValid();
    });

    it('is invalid on a decimal number (but without validation message)', () => {
      render(<CustomFieldInputNumber {...requiredProps} value={1.01} />);
      expect(screen.getByLabelText('Test label')).toBeInvalid();
      expect(screen.getByLabelText('Test label')).toHaveAccessibleDescription('');
    });
  });

  describe('readOnly API', () => {
    it('respects the readOnly prop', () => {
      const { getByLabelText } = render(<CustomFieldInputNumber {...requiredProps} readOnly />);
      expect(getByLabelText('Test label')).toHaveAttribute('readOnly', '');
    });

    it('is false by default', () => {
      const { getByLabelText } = render(<CustomFieldInputNumber {...requiredProps} />);
      expect(getByLabelText('Test label')).not.toHaveAttribute('readOnly', '');
    });
  });

  describe('step API', () => {
    it('respects a provided step', () => {
      const { getByLabelText } = render(<CustomFieldInputNumber {...requiredProps} label="foo" step={12} />);
      expect(getByLabelText('foo')).toHaveAttribute('step', '12');
    });
  });

  describe('forwardRef API', () => {
    it('can be used to get value', () => {
      const inputRef = createRef(null);
      render(<CustomFieldInputNumber {...requiredProps} ref={inputRef} />);

      userEvent.type(screen.getByLabelText('Test label'), '1234');
      expect(inputRef.current.value).toBe(1234);
    });
  });

  describe('tooltip API', () => {
    const tooltip = 'I am an input, short and stout.';

    it('applies a description to the input when the help icon is hovered', () => {
      render(<CustomFieldInputNumber {...requiredProps} tooltip={tooltip} />);
      userEvent.hover(screen.getByRole('img', { name: 'More information' }));
      expect(screen.getByLabelText(requiredProps.label)).toHaveAccessibleDescription(tooltip);
    });

    it('removes the description to the input when the help icon is unhovered', () => {
      render(<CustomFieldInputNumber {...requiredProps} tooltip={tooltip} />);
      userEvent.hover(screen.getByRole('img', { name: 'More information' }));
      userEvent.unhover(screen.getByRole('img', { name: 'More information' }));
      expect(screen.getByLabelText(requiredProps.label)).toHaveAccessibleDescription('');
    });
  });
});
