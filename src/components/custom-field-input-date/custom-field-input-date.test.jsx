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

  describe('className API', () => {
    it('prioritizes className prop', () => {
      const { container } = renderComponent({ className: 'prioritize-me' });
      expect(container.firstChild).toHaveClass('prioritize-me');
    });
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
    describe('when the value is valid', () => {
      it('does not show an error', () => {
        const { getByTestId } = renderComponent({ value: '05/10/1992' });
        expect(getByTestId('custom-field-input')).not.toHaveClass('error');
      });
    });

    describe('when the value is syntactically invalid', () => {
      it('shows an error', () => {
        const { getByTestId } = renderComponent({ value: 'not a date' });
        expect(getByTestId('custom-field-input')).toHaveClass('error');
      });

      it('informs the user of an invalid value', () => {
        const { getByTestId } = renderComponent({ value: 'not a date' });
        expect(getByTestId('custom-field-input').innerHTML).toContain('"not a date" is an invalid date');
      });
    });

    describe('when the value is semantically invalid', () => {
      it('shows an error', () => {
        const { getByTestId } = renderComponent({ error: true });
        expect(getByTestId('custom-field-input')).toHaveClass('error');
      });

      it('presents the provided help text', () => {
        const helpText = 'This should appear';
        const { getByTestId } = renderComponent({ error: true, helpText });
        expect(getByTestId('custom-field-input').innerHTML).toContain(helpText);
      });

      it('still shows the provided value', () => {
        const { getByLabelText } = renderComponent({ error: true, value: '05/10/1992' });
        expect(getByLabelText('Field Date')).toHaveValue('1992-05-10');
      });
    });
  });

  describe('required API', () => {
    it('is required when told to be', () => {
      const { getByLabelText } = renderComponent({ required: true });
      expect(getByLabelText('Field Date')).toBeRequired();
    });

    it('is not required when told not to be', () => {
      const { getByLabelText } = renderComponent({ required: false });
      expect(getByLabelText('Field Date')).not.toBeRequired();
    });
  });
});
