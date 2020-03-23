import React, { createRef } from 'react';
import renderer from 'react-test-renderer';
import { fireEvent, render, screen } from '@testing-library/react';
import CustomFieldInputText from './custom-field-input-text.jsx';

describe('CustomFieldInputText', () => {
  function TestComponent(props = {}) {
    return <CustomFieldInputText id="test-input" label="Test label" {...props} />;
  }

  it('has defaults', () => {
    expect(renderer.create(<TestComponent />).toJSON()).toMatchSnapshot();
  });

  describe('className API', () => {
    it('prioritizes className prop', () => {
      const { container } = render(<TestComponent className="prioritize-me" />);
      expect(container.firstChild).toHaveClass('prioritize-me');
    });
  });

  describe('disabled API', () => {
    it('can be disabled', () => {
      const { getByLabelText } = render(<TestComponent disabled />);
      expect(getByLabelText('Test label')).toBeDisabled();
    });

    it('can be enabled', () => {
      const { getByLabelText } = render(<TestComponent />);
      expect(getByLabelText('Test label')).not.toBeDisabled();
    });
  });

  describe('error API and helpText API', () => {
    xit('can have an error state through a native validation', () => {
      // I am not sure what is the best way to represent this in a test.
      // However, at the moment, there are end-to-end tests in the Number component tests.
      const { container } = render(<TestComponent error />);
      expect(container.firstChild).toHaveClass('error');
      expect(screen.getByLabelText('Test label')).toBeInvalid();
      expect(screen.getByRole('img').firstChild).toHaveAttribute('xlink:href', '#icon-caution-fill.svg');
    });

    it('can have an error state through a custom validation', () => {
      const { container } = render(<TestComponent error helpText="Custom validation message" />);
      expect(container.firstChild).toHaveClass('error');
      expect(screen.getByLabelText('Test label')).toBeInvalid();
      expect(screen.getByRole('img').firstChild).toHaveAttribute('xlink:href', '#icon-caution-fill.svg');
    });

    it('can have no error state', () => {
      const { container } = render(<TestComponent />);
      expect(container.firstChild).not.toHaveClass('error');
      expect(screen.getByLabelText('Test label')).toBeValid();
      expect(container.querySelector('[role="img"]')).toBeFalsy();
    });
  });

  describe('id API', () => {
    it('sets the id attribute', () => {
      render(<TestComponent id="test-id" />);
      expect(screen.getByLabelText('Test label')).toHaveAttribute('id', 'test-id');
    });
  });

  describe('inputRef API', () => {
    it('sets the ref on the input', () => {
      const inputRef = createRef();
      render(<TestComponent inputRef={inputRef} />);
      expect(screen.getByLabelText('Test label')).toBe(inputRef.current);
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

  describe('onChange', () => {
    it('accepts an onChange listener', () => {
      const onChange = jest.fn();
      const { getByLabelText } = render(<TestComponent onChange={e => onChange(e)} />);
      fireEvent.change(getByLabelText('Test label'), { target: { value: 'hey' } });
      expect(onChange.mock.calls.length).toBe(1);
    });
  });

  describe('onKeyUp', () => {
    it('handles the key up event', () => {
      const onKeyUpSpy = jest.fn();
      render(<TestComponent onKeyUp={onKeyUpSpy} />);
      fireEvent.keyUp(screen.getByLabelText('Test label'));
      expect(onKeyUpSpy.mock.calls.length).toBe(1);
    });
  });

  describe('onFocus', () => {
    it('accepts an onFocus event', () => {
      const onFocus = jest.fn();
      const { getByLabelText } = render(<TestComponent onFocus={onFocus} />);
      fireEvent.focus(getByLabelText('Test label'));
      expect(onFocus.mock.calls.length).toBe(1);
    });
  });

  describe('onBlur', () => {
    it('accepts an onBlur event', () => {
      const onBlur = jest.fn();
      const { getByLabelText } = render(<TestComponent onBlur={onBlur} />);
      fireEvent.focus(getByLabelText('Test label'));
      fireEvent.blur(getByLabelText('Test label'));
      expect(onBlur.mock.calls.length).toBe(1);
    });
  });

  describe('placeholder API', () => {
    it('can have placeholder for input', () => {
      const placeholder = 'This is placeholder input';
      render(<TestComponent placeholder={placeholder} />);
      expect(screen.getByLabelText('Test label')).toHaveAttribute('placeholder', placeholder);
    });
  });

  describe('required API', () => {
    it('can have a required indicator', () => {
      render(<TestComponent required />);
      expect(screen.getByLabelText('Test label')).toBeRequired();
    });

    it('can have no required indicator', () => {
      render(<TestComponent />);
      expect(screen.getByLabelText('Test label')).not.toBeRequired();
    });
  });

  describe('value API', () => {
    it('sets the value attribute', () => {
      render(<TestComponent value="test-value" />);
      expect(screen.getByLabelText('Test label')).toHaveValue('test-value');
    });
  });
});
