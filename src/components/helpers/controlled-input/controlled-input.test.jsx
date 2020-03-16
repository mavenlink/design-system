import React from 'react';
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

  describe('id API', () => {
    it('sets the ID attribute', () => {
      const { getByTestId } = renderComponent();
      expect(getByTestId(testId)).toHaveAttribute('id', 'test-id');
    });
  });
});
