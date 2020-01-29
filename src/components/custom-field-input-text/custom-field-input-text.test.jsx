import React from 'react';
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

  describe('className API', () => {
    it('prioritizes className prop', () => {
      const { container } = render(<TestComponent className="prioritize-me" />);
      expect(container.firstChild).toHaveClass('prioritize-me');
    });
  });

  describe('disabled API', () => {
    it('can be disabled', () => {
      const { container } = render(<TestComponent disabled />);
      expect(container.firstChild).toHaveClass('disabled');
      expect(screen.getByLabelText('Test label')).toBeDisabled();
    });

    it('can be enabled', () => {
      const { container } = render(<TestComponent />);
      expect(container.firstChild).not.toHaveClass('disabled');
      expect(screen.getByLabelText('Test label')).not.toBeDisabled();
    });
  });

  describe('error API', () => {
    it('can have an error state', () => {
      const { container } = render(<TestComponent error />);
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

  describe('help text API', () => {
    it('can have help text', () => {
      const helpText = 'Oh wow big helpful yes!';
      render(<TestComponent error helpText={helpText} />);
      expect(screen.getByLabelText('Test label')).toBeInvalid();
      expect(screen.getByText(helpText)).toBeTruthy();
    });

    it('can have empty help text', () => {
      render(<TestComponent error />);
      expect(screen.getByLabelText('Test label')).toBeInvalid();
    });
  });

  describe('name API', () => {
    it('sets the name attribute', () => {
      render(<TestComponent name="test-name" />);
      expect(screen.getByLabelText('Test label')).toHaveAttribute('name', 'test-name');
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
      render(<TestComponent required={true} />);
      expect(screen.getByLabelText('Test label')).toBeRequired();
    });

    it('can have no required indicator', () => {
      render(<TestComponent />);
      expect(screen.getByLabelText('Test label')).not.toBeRequired();
    });
  });

  describe('id API', () => {
    it('sets the id attribute', () => {
      render(<TestComponent id="test-id" />);
      expect(screen.getByLabelText('Test label')).toHaveAttribute('id', 'test-id');
    });
  });

  describe('value API', () => {
    it('sets the value attribute', () => {
      render(<TestComponent value="test-value" />);
      expect(screen.getByLabelText('Test label')).toHaveValue('test-value');
    });
  });
});
