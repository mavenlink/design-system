import React, { createRef } from 'react';
import renderer from 'react-test-renderer';
import { render, screen } from '@testing-library/react';
import CustomFieldInputText from './custom-field-input-text.jsx';

describe('CustomFieldInputText', () => {
  function TestComponent(props = {}) {
    return <CustomFieldInputText id="test-input" label="Test label" {...props} />;
  }

  it('has defaults', () => {
    expect(renderer.create(<TestComponent />).toJSON()).toMatchSnapshot();
  });

  describe('errorText API', () => {
    it('can have an error state through a native validation', () => {
      // I am not sure what is the best way to represent this in a test.
      // However, at the moment, there are end-to-end tests in the Number component tests.
      render(<TestComponent errorText="yo" />);
      expect(screen.getByLabelText('Test label')).toBeInvalid();
      expect(screen.getByRole('img').firstChild).toHaveAttribute('xlink:href', '#icon-caution-fill.svg');
    });

    it('can have an error state through a custom validation', () => {
      render(<TestComponent errorText="Custom validation message" />);
      expect(screen.getByLabelText('Test label')).toBeInvalid();
      expect(screen.getByRole('img').firstChild).toHaveAttribute('xlink:href', '#icon-caution-fill.svg');
    });

    it('can have no error state', () => {
      render(<TestComponent />);
      expect(screen.getByLabelText('Test label')).toBeValid();
      expect(screen.queryByRole('[role="img"]')).toBeFalsy();
    });
  });

  describe('inputRef API', () => {
    it('sets the ref on the input', () => {
      const inputRef = createRef();
      render(<TestComponent inputRef={inputRef} />);
      expect(screen.getByLabelText('Test label')).toBe(inputRef.current);
    });
  });

  describe('value API', () => {
    it('sets the value attribute', () => {
      render(<TestComponent value="test-value" />);
      expect(screen.getByLabelText('Test label')).toHaveValue('test-value');
    });
  });
});
