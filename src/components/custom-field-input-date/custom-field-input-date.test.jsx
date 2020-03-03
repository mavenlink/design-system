import React from 'react';
import { render, cleanup } from '@testing-library/react';
import CustomFieldInputDate from './custom-field-input-date.jsx';

describe('src/components/custom-field-input-date/custom-field-input-date', () => {
  const renderComponent = (props = {}) => render(<CustomFieldInputDate label="Field Date" id="field-date" {...props} />);

  afterEach(cleanup);

  it('exists', () => {
    const { getByTestId } = renderComponent();
    expect(getByTestId('custom-field-input')).toExist();
  });
});
