import React, { createRef } from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderer from 'react-test-renderer';
import CustomFieldInputNumber from './custom-field-input-number.jsx';

describe('CustomFieldInputNumber', () => {
  function TestComponent(props = {}) {
    return <CustomFieldInputNumber id="test-input" label="Test label" {...props} />;
  }

  it('has defaults', () => {
    const tree = renderer.create(<TestComponent />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  describe('className API', () => {
    it('prioritizes className prop', () => {
      const { container } = render(<TestComponent className="prioritize-me" />);
      expect(container.firstChild).toHaveClass('prioritize-me');
    });
  });

  describe('disabled API', () => {
    it('can be disabled', () => {
      render(<TestComponent disabled />);
      expect(screen.getByLabelText('Test label')).toBeDisabled();
    });

    it('can be enabled', () => {
      const { container } = render(<TestComponent />);
      expect(screen.getByLabelText('Test label')).not.toBeDisabled();
    });
  });

  describe('errorText API', () => {
    it('is invalid when true', () => {
      render(<TestComponent errorText="Here's some help text!" />);
      expect(screen.getByLabelText('Test label')).toBeInvalid();
    });

    it('updates correctly with a new errorText prop', () => {
      const { rerender } = render(<TestComponent errorText="" />);
      expect(screen.queryByText("Here's some help text!")).not.toBeInTheDocument();
      rerender(<TestComponent errorText="Here's some help text!" />);
      expect(screen.queryByText("Here's some help text!")).toBeInTheDocument();
    });

    it('shows the provided errorText when true', () => {
      render(<TestComponent errorText="Here's some help text!" />);
      expect(screen.getByText("Here's some help text!")).toBeInTheDocument();
    });

    it('does not show errorText when it does not exist', () => {
      render(<TestComponent errorText="" />);
      expect(screen.queryByText("Here's some help text!")).not.toBeInTheDocument();
    });
  });

  describe('id API', () => {
    it('sets the id attribute', () => {
      render(<TestComponent id="test-id" />);
      expect(screen.getByLabelText('Test label')).toHaveAttribute('id', 'test-id');
    });
  });

  describe('label API', () => {
    it('sets the label', () => {
      render(<TestComponent label="Another label" />);
      expect(screen.getByLabelText('Another label')).toBeDefined();
    });
  });

  describe('name API', () => {
    it('sets the name attribute', () => {
      render(<TestComponent name="test-name" />);
      expect(screen.getByLabelText('Test label')).toHaveAttribute('name', 'test-name');
    });
  });

  describe('placeholder API', () => {
    it('sets the placeholder attribute', () => {
      const placeholder = 'This is placeholder input';
      render(<TestComponent placeholder={placeholder} />);
      expect(screen.getByLabelText('Test label')).toHaveAttribute('placeholder', placeholder);
    });
  });

  describe('required API', () => {
    it('sets the required attribute', () => {
      render(<TestComponent required />);
      expect(screen.getByLabelText('Test label')).toBeRequired();
    });

    it('unsets the required attribute', () => {
      render(<TestComponent />);
      expect(screen.getByLabelText('Test label')).not.toBeRequired();
    });
  });

  describe('value API', () => {
    it('is valid on a positive integer', () => {
      render(<TestComponent value={1} />);
      expect(screen.getByLabelText('Test label')).toBeValid();
    });

    it('is valid on zero', () => {
      render(<TestComponent value={0} />);
      expect(screen.getByLabelText('Test label')).toBeValid();
    });

    it('is valid on a negative integer', () => {
      render(<TestComponent value={-1} />);
      expect(screen.getByLabelText('Test label')).toBeValid();
    });

    it('is valid on a decimal integer', () => {
      render(<TestComponent value={1.00} />);
      expect(screen.getByLabelText('Test label')).toBeValid();
    });

    it('is invalid on a decimal number', () => {
      const validityText = 'Constraints not satisfied';
      render(<TestComponent value={1.01} />);

      expect(screen.getByLabelText('Test label')).toBeInvalid();
      expect(screen.getByText(validityText)).toBeInTheDocument();
    });
  });

  describe('events API', () => {
    it('accepts an onBlur event', () => {
      const onBlur = jest.fn();
      const { getByLabelText } = render(<TestComponent label="foo" onBlur={onBlur} />);
      fireEvent.blur(getByLabelText('foo'));
      expect(onBlur.mock.calls.length).toEqual(1);
    });
  });

  describe('inputRef API', () => {
    it('sets the ref on the input', () => {
      const inputRef = createRef();
      render(<TestComponent inputRef={inputRef} />);
      expect(screen.getByLabelText('Test label')).toBe(inputRef.current);
    });
  });

  describe('readOnly API', () => {
    it('respects the readOnly prop', () => {
      const { getByLabelText } = render(<TestComponent readOnly />);
      expect(getByLabelText('Test label')).toHaveAttribute('readOnly', '');
    });

    it('is false by default', () => {
      const { getByLabelText } = render(<TestComponent />);
      expect(getByLabelText('Test label')).not.toHaveAttribute('readOnly', '');
    });
  });

  describe('step API', () => {
    it('respects a provided step', () => {
      const { getByLabelText } = render(<TestComponent label="foo" step={12} />);
      expect(getByLabelText('foo')).toHaveAttribute('step', '12');
    });
  });

  describe('forwardRef API', () => {
    it('can be used to get value', () => {
      const inputRef = createRef(null);
      render(<CustomFieldInputNumber id="test-input" label="Test label" ref={inputRef} />);

      userEvent.type(screen.getByLabelText('Test label'), '1234');
      expect(inputRef.current.value).toBe('1234');
    });
  });
});
