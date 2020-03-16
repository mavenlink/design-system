import React from 'react';
import { cleanup, render } from '@testing-library/react';
import ControlledInput from './controlled-input.jsx';

describe('src/components/helpers/controlled-input/controlled-input', () => {
  const renderComponent = () => render(<ControlledInput id="test-id" />);
  const testId = 'controlled input';

  afterEach(cleanup);

  describe('id API', () => {
    it('sets the ID attribute', () => {
      const { getByTestId } = renderComponent();
      expect(getByTestId(testId)).toHaveAttribute('id', 'test-id');
    });
  });
});
