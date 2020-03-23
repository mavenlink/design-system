import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import renderer from 'react-test-renderer';
import CustomFieldInputDate from './custom-field-input-date.jsx';

describe('src/components/custom-field-input-date/custom-field-input-date', () => {
  const renderComponent = (props = {}) => render(<CustomFieldInputDate label="Field Date" id="field-date" {...props} />);
  const changeValue = (getInputElement, value) => {
    fireEvent.focus(getInputElement());
    fireEvent.change(getInputElement(), { target: { value } });
    fireEvent.blur(getInputElement());
  };

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
      const { getByLabelText } = renderComponent({ value: '2016-07-18' });
      expect(getByLabelText('Field Date')).toHaveValue('July 18, 2016');
    });

    it('accepts a string in format mm/dd/yyyy', () => {
      const { getByLabelText } = renderComponent({ value: '07/18/2016' });
      expect(getByLabelText('Field Date')).toHaveValue('July 18, 2016');
    });

    it('accepts a string in format mm-dd-yyyy', () => {
      const { getByLabelText } = renderComponent({ value: '07-18-2016' });
      expect(getByLabelText('Field Date')).toHaveValue('July 18, 2016');
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

  describe('error API', () => {
    describe('when the value is valid', () => {
      it('does not show an error', () => {
        const { getByTestId } = render(<CustomFieldInputDate label="Field Date" id="field-date" value="05/10/1992" />);
        expect(getByTestId('custom-field-input')).not.toHaveClass('error');
      });
    });

    xdescribe('when the value is syntactically invalid', () => {
      it('shows an error', () => {
        const { getByTestId } = renderComponent({ value: 'not a date' });
        expect(getByTestId('custom-field-input')).toHaveClass('error');
      });

      it('informs the user of an invalid value', () => {
        const { getByTestId } = renderComponent({ value: 'not a date' });
        expect(getByTestId('custom-field-input').innerHTML).toContain('"not a date" is an invalid date');
      });
    });

    xdescribe('when the value is semantically invalid', () => {
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

  describe('helpText', () => {
    it('shows on error', () => {
      const { container } = renderComponent({ helpText: 'YOOO', error: true });
      expect(container.innerHTML).toContain('YOOO');
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

  describe('interaction', () => {
    xdescribe('when focused', () => {
      it('switches to a date input when focused', () => {
        const { getByLabelText } = renderComponent();
        expect(getByLabelText('Field Date')).toHaveAttribute('type', 'text');
        fireEvent.focus(getByLabelText('Field Date'));
        expect(getByLabelText('Field Date')).toHaveAttribute('type', 'date');
      });

      it('ensures the date input shows the correct value', () => {
        const { getByLabelText } = renderComponent({ value: '07/18/2016' });
        expect(getByLabelText('Field Date')).toHaveAttribute('type', 'text');
        fireEvent.focus(getByLabelText('Field Date'));
        expect(getByLabelText('Field Date')).toHaveValue('2016-07-18');
      });

      xit('focuses on the date input', () => {
        const { getByLabelText } = renderComponent({ value: '07/18/2016' });
        expect(getByLabelText('Field Date')).toHaveAttribute('type', 'text');
        fireEvent.focus(getByLabelText('Field Date'));
        expect(getByLabelText('Field Date')).toHaveFocus();
      });
    });

    xdescribe('when blurred', () => {
      it('switches over to the text input', () => {
        const { getByLabelText } = renderComponent({ value: '07/18/2016' });
        fireEvent.focus(getByLabelText('Field Date'));
        expect(getByLabelText('Field Date')).toHaveAttribute('type', 'date');
        fireEvent.blur(getByLabelText('Field Date'));
        expect(getByLabelText('Field Date')).toHaveAttribute('type', 'text');
      });

      it('stays in edit mode when it is invalid', () => {
        const { getByLabelText } = renderComponent({ value: '07/18/2016', error: true });
        fireEvent.focus(getByLabelText('Field Date'));
        fireEvent.blur(getByLabelText('Field Date'));
        expect(getByLabelText('Field Date')).toHaveAttribute('type', 'date');
      });
    });
  });

  xdescribe('min API', () => {
    it('respects the min attribute', () => {
      const { getByTestId } = renderComponent({ min: '01-01-2000', value: '05-10-1992' });
      expect(getByTestId('custom-field-input')).toHaveClass('error');
    });

    it('is respected after a change', () => {
      const { getByTestId, getByLabelText } = renderComponent({ min: '01-01-2000', value: '05-10-2001' });
      expect(getByTestId('custom-field-input')).not.toHaveClass('error');
      changeValue(() => getByLabelText('Field Date'), '1998-01-01');
      expect(getByTestId('custom-field-input')).toHaveClass('error');
    });
  });

  xdescribe('max API', () => {
    it('respects the max attribute', () => {
      const { getByTestId } = renderComponent({ max: '01-01-1990', value: '05-10-1992' });
      expect(getByTestId('custom-field-input')).toHaveClass('error');
    });
  });

  describe('onChange API', () => {
    xit('accepts an onChange listener', () => {
      const onChange = jest.fn();
      const { getByLabelText } = renderComponent({ value: '', onChange });
      changeValue(() => getByLabelText('Field Date'), '2016-07-18');
      expect(onChange.mock.calls.length).toBe(1);
    });
  });

  describe('when the component is readOnly', () => {
    it('displays the helpText on semantic error', () => {
      const { getByTestId } = renderComponent({ readOnly: true, helpText: 'Foo', error: true });
      expect(getByTestId('custom-field-input').innerHTML).toContain('Foo');
    });
  });

  xit('changing value changes valid/invalid state', () => {
    const { getByTestId, getByLabelText } = renderComponent({ value: 'not a date' });
    expect(getByTestId('custom-field-input')).toHaveClass('error');
    changeValue(() => getByLabelText('Field Date'), '2016-07-18');
    expect(getByTestId('custom-field-input')).not.toHaveClass('error');
  });
});
