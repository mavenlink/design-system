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
    it('accepts a string in format YYYY-MM-DD', () => {
      const { getByLabelText } = renderComponent({ value: '2016-07-16' });
      expect(getByLabelText('Field Date')).toHaveValue('2016-07-16');
    });

    it('accepts a string in format mm/dd/yyyy', () => {
      const { getByLabelText } = renderComponent({ value: '07/18/2016' });
      expect(getByLabelText('Field Date')).toHaveValue('2016-07-18');
    });

    it('accepts a string in format mm-dd-yyyy', () => {
      const { getByLabelText } = renderComponent({ value: '07-18-2016' });
      expect(getByLabelText('Field Date')).toHaveValue('2016-07-18');
    });
  });

  describe('disabled API', () => {
    it('permits itself to be disabled', () => {
      const { getByLabelText } = renderComponent({ disabled: true });
      expect(getByLabelText('Field Date')).toBeDisabled();
    });

    it('permits itself to be enabled', () => {
      const { getByLabelText } = renderComponent({ disabled: false });
      expect(getByLabelText('Field Date')).not.toBeDisabled();
    });
  });

  describe('valid API', () => {
    it('is invalid when given a date that is incorrectly formatted', () => {
      const { getByTestId } = renderComponent({ value: 'not a date' });
      expect(getByTestId('custom-field-input')).toHaveClass('error');
      expect(getByTestId('custom-field-input').innerHTML).toContain('"not a date" is an invalid date');
    });
  });
});
