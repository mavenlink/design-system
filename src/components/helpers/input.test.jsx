import React from 'react';
import { render, cleanup } from '@testing-library/react';
import Input from './input.jsx';

describe('src/components/helpers/input', () => {
  const renderComponent = (props = {}) => render(<Input id="foo" {...props} />);
  const testId = 'controlled input';

  afterEach(cleanup);

  describe('controlled/uncontrolled API', () => {
    it('respects the controlled setting', () => {
      const { getByTestId } = renderComponent({
        controlled: true,
        type: 'number',
        min: '1',
        max: '10',
      });
      expect(getByTestId(testId)).not.toHaveAttribute('min', '1');
      expect(getByTestId(testId)).not.toHaveAttribute('max', '10');
    });

    it('respects the uncontrolled setting', () => {
      const { getByTestId } = renderComponent({
        controlled: false,
        type: 'number',
        min: '1',
        max: '10',
      });
      expect(getByTestId(testId)).toHaveAttribute('min', '1');
      expect(getByTestId(testId)).toHaveAttribute('max', '10');
    });
  });
});
