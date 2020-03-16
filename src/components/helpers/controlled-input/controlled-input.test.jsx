import React, { createRef } from 'react';
import { cleanup, render } from '@testing-library/react';
import ControlledInput from './controlled-input.jsx';

describe('src/components/helpers/controlled-input/controlled-input', () => {
  const renderComponent = (props = {}) => render(<ControlledInput id="test-id" {...props} />);
  const testId = 'controlled input';

  afterEach(cleanup);

  describe('className API', () => {
    it('accepts a className prop', () => {
      const { getByTestId } = renderComponent({ className: 'bar' });
      expect(getByTestId(testId)).toHaveClass('bar');
    });
  });

  describe('disabled API', () => {
    it('can be enabled', () => {
      const { getByTestId } = renderComponent({ disabled: false });
      expect(getByTestId(testId)).not.toBeDisabled();
    });

    it('can be disabled', () => {
      const { getByTestId } = renderComponent({ disabled: true });
      expect(getByTestId(testId)).toBeDisabled();
    });
  });

  describe('id API', () => {
    it('sets the ID attribute', () => {
      const { getByTestId } = renderComponent();
      expect(getByTestId(testId)).toHaveAttribute('id', 'test-id');
    });
  });

  describe('inputRef API', () => {
    it('sets the ref on itself', () => {
      const inputRef = createRef();
      const { getByTestId } = renderComponent({ inputRef });
      expect(getByTestId(testId)).toBe(inputRef.current);
    });
  });
});
