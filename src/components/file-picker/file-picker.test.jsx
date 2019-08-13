import React from 'react';
import { render, fireEvent, cleanup } from '@testing-library/react';
import renderer from 'react-test-renderer';
import FilePicker from './file-picker';

describe('FilePicker', () => {
  describe('API', () => {
    it('title', function () {
      const expected = 'Attach Le Files';
      const { getByText } = render(<FilePicker id="123" title={ expected } />);
      expect(getByText(expected).textContent).toContain(expected);
    });

    it('multiple', function () {
      const testRenderer = renderer.create(
        <FilePicker multiple='multiple' id="123" title='yo' />
      );
      const testInstance = testRenderer.root;
      expect(testInstance.findByType('input').props.multiple).toBe('multiple');
    });
  });
});
