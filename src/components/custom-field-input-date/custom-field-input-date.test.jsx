import React from 'react';
import { render, cleanup } from '@testing-library/react';
import renderer from 'react-test-renderer';
import CustomFieldInputDate from './custom-field-input-date.jsx';

describe('src/components/custom-field-input-date/custom-field-input-date', () => {
  const renderComponent = (props = {}) => render(<CustomFieldInputDate label="Field Date" id="field-date" {...props} />);

  afterEach(cleanup);

  it('has defaults', () => {
    const tree = renderer.create(<CustomFieldInputDate label="Hello" id="hello" />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  describe('value API', () => {
    it('accepts string in format YYYY-MM-DD', () => {
      const { getByLabelText } = renderComponent({ value: '2016-07-18' });
      expect(getByLabelText('Field Date')).toHaveValue('2016-07-18');
    });
  });
});
