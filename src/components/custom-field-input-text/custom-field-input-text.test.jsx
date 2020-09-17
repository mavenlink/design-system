import React, { createRef } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CustomFieldInputText from './custom-field-input-text.jsx';

describe('CustomFieldInputText', () => {
  const requiredProps = {
    id: 'test-input',
    label: 'Test label',
    name: 'field-id',
  };

  it('has defaults', () => {
    const ref = createRef();
    render(<CustomFieldInputText {...requiredProps} ref={ref} />);
    expect(document.body).toMatchSnapshot();
    expect(ref.current).toMatchSnapshot();
  });

  describe('dirty ref API', () => {
    it('updates on user interactions', () => {
      const ref = createRef();
      render(<CustomFieldInputText {...requiredProps} ref={ref} defaultValue="ab" />);
      expect(ref.current.dirty).toEqual(false);
      userEvent.type(screen.getByLabelText('Test label'), '{backspace}');
      expect(ref.current.dirty).toEqual(true);
      userEvent.type(screen.getByLabelText('Test label'), '{backspace}');
      expect(ref.current.dirty).toEqual(true);
    });
  });

  describe('errorText API', () => {
    it('can have an error state through a native validation', () => {
      // I am not sure what is the best way to represent this in a test.
      // However, at the moment, there are end-to-end tests in the Number component tests.
      render(<CustomFieldInputText {...requiredProps} errorText="yo" />);
      expect(screen.getByLabelText('Test label')).toBeInvalid();
      expect(screen.getByText('Invalid custom field')).toBeInTheDocument();
    });

    it('can have an error state through a custom validation', () => {
      render(<CustomFieldInputText {...requiredProps} errorText="Custom validation message" />);
      expect(screen.getByLabelText('Test label')).toBeInvalid();
      expect(screen.getByText('Invalid custom field')).toBeInTheDocument();
    });

    it('can have no error state', () => {
      render(<CustomFieldInputText {...requiredProps} />);
      expect(screen.getByLabelText('Test label')).toBeValid();
      expect(screen.queryByRole('[role="img"]')).toBeFalsy();
    });
  });

  describe('inputRef API', () => {
    it('sets the ref on the input', () => {
      const inputRef = createRef();
      render(<CustomFieldInputText {...requiredProps} inputRef={inputRef} />);
      expect(screen.getByLabelText('Test label')).toBe(inputRef.current);
    });
  });

  describe('value API', () => {
    it('sets the value attribute', () => {
      render(<CustomFieldInputText {...requiredProps} value="test-value" />);
      expect(screen.getByLabelText('Test label')).toHaveValue('test-value');
    });
  });

  describe('forwardRef API', () => {
    it('can be used to get value', () => {
      const inputRef = createRef(null);
      render(<CustomFieldInputText id="test-input" label="Test label" ref={inputRef} />);

      userEvent.type(screen.getByLabelText('Test label'), 'test-value');
      expect(inputRef.current.value).toBe('test-value');
    });
  });
});
