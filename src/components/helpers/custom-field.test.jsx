import React, { createRef } from 'react';
import renderer from 'react-test-renderer';
import { cleanup, render } from '@testing-library/react';
import CustomField from './custom-field.jsx';

describe('src/components/helpers/custom-field', () => {
  const renderComponent = (props = {}) => render(<CustomField
    id="custom-field"
    label="Custom Field"
    {...props}
  />);

  afterEach(cleanup);

  it('has defaults', () => {
    expect(renderer.create(<CustomField id="custom-field" label="Custom Field" />).toJSON()).toMatchSnapshot();
  });

  describe('label API', () => {
    it('sets the label', () => {
      const { getByLabelText } = renderComponent();
      expect(getByLabelText('Custom Field')).toBeDefined();
    });
  });

  describe('required API', () => {
    it('can have a required indicator', () => {
      const { getByLabelText } = renderComponent({ required: true });
      expect(getByLabelText('Custom Field')).toBeRequired();
    });

    it('can have no required indicator', () => {
      const { getByLabelText } = renderComponent({ required: false });
      expect(getByLabelText('Custom Field')).not.toBeRequired();
    });
  });

  describe('inputRef API', () => {
    it('sets the ref on the input', () => {
      const inputRef = createRef();
      const { getByLabelText } = renderComponent({ inputRef });
      expect(getByLabelText('Custom Field')).toBe(inputRef.current);
    });
  });

  describe('id API', () => {
    it('sets the id attribute', () => {
      const { getByLabelText } = renderComponent({ id: 'test-id' });
      expect(getByLabelText('Custom Field')).toHaveAttribute('id', 'test-id');
    });
  });

  describe('error API', () => {
    it('can have no error state', () => {
      const { container, getByLabelText } = renderComponent();
      expect(container.firstChild).not.toHaveClass('error');
      expect(getByLabelText('Custom Field')).toBeValid();
      expect(container.querySelector('[role="img"]')).toBeFalsy();
    });

    it('can be semantically invalid', () => {
      const { container, getByRole } = renderComponent({ error: true, helpText: 'YOOOOO' });
      expect(container.firstChild).toHaveClass('error');
      expect(getByRole('img').firstChild).toHaveAttribute('xlink:href', '#icon-caution-fill.svg');
    });
  });
});
