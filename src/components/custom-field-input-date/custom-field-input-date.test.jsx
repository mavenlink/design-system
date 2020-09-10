import React, { createRef } from 'react';
import {
  cleanup,
  fireEvent,
  render,
  screen,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
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
        render(<CustomFieldInputDate label="Field Date" id="field-date" value="05/10/1992" />);
        expect(screen.getByLabelText('Field Date')).toBeValid('error');
      });
    });
  });

  describe('errorText', () => {
    it('shows an error icon and the error text', () => {
      renderComponent({ value: '2016-07-18', errorText: 'Bad Date!' });
      expect(screen.getByLabelText('Field Date')).not.toBeValid();
      expect(screen.getByText('Bad Date!')).toBeInTheDocument();
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
    describe('when focused', () => {
      it('switches to a date input when focused and opens the calendar', () => {
        const { getByLabelText } = renderComponent({ value: '07/18/2016' });
        expect(getByLabelText('Field Date')).toHaveAttribute('type', 'text');
        userEvent.click(getByLabelText('Field Date'));
        expect(getByLabelText('Field Date')).toHaveAttribute('type', 'date');
        expect(screen.getByText('July 2016')).toBeInTheDocument();
      });

      it('ensures the date input shows the correct value', () => {
        const { getByLabelText } = renderComponent({ value: '07/18/2016' });
        expect(getByLabelText('Field Date')).toHaveAttribute('type', 'text');
        fireEvent.focus(getByLabelText('Field Date'));
        expect(getByLabelText('Field Date')).toHaveValue('2016-07-18');
      });

      it('focuses on the date input', () => {
        const { getByLabelText } = renderComponent({ value: '07/18/2016' });
        expect(getByLabelText('Field Date')).toHaveAttribute('type', 'text');
        fireEvent.focus(getByLabelText('Field Date'));
        expect(getByLabelText('Field Date')).toHaveFocus();
      });
    });

    describe('when blurred', () => {
      it('switches over to the text input', () => {
        render(
          <div>
            <CustomFieldInputDate label="Field Date" id="field-date" value={'07/18/2016'} />
            <input aria-label={'force-blur'} />
          </div>,
        );
        expect(screen.getByLabelText('Field Date')).toHaveAttribute('type', 'text');
        userEvent.click(screen.getByLabelText('Field Date'));
        expect(screen.getByLabelText('Field Date')).toHaveAttribute('type', 'date');
        userEvent.click(screen.getByLabelText('force-blur'));
        expect(screen.getByLabelText('Field Date')).toHaveAttribute('type', 'text');
      });

      it('stays in edit mode when it is invalid', () => {
        const { getByLabelText } = renderComponent({ value: '07/18/2016', error: true });
        fireEvent.focus(getByLabelText('Field Date'));
        fireEvent.blur(getByLabelText('Field Date'));
        expect(getByLabelText('Field Date')).toHaveAttribute('type', 'date');
      });
    });
  });

  describe('calendar icon', () => {
    it('opens to the correct date on click and closes when clicking away', () => {
      renderComponent({ value: '2016-07-18' });
      expect(screen.queryByText('July 2016')).not.toBeInTheDocument();
      userEvent.click(screen.getByTitle('Field Date calendar button'));
      expect(screen.getByText('July 2016')).toBeInTheDocument();
      userEvent.click(document.body);
      expect(screen.queryByText('July 2016')).not.toBeInTheDocument();
    });

    it('opens to the correct date on click / pressing enter and closes on escape', () => {
      const { getByLabelText } = renderComponent({ value: '2016-07-18' });
      expect(screen.queryByText('July 2016')).not.toBeInTheDocument();
      userEvent.click(getByLabelText('Field Date'));
      expect(screen.getByText('July 2016')).toBeInTheDocument();
      fireEvent.keyDown(document.activeElement, { key: 'Escape' });
      expect(screen.queryByText('July 2016')).not.toBeInTheDocument();
      fireEvent.keyDown(getByLabelText('Field Date'), { key: 'Enter' });
      expect(screen.getByText('July 2016')).toBeInTheDocument();
    });

    it('changes the date to the date selected', () => {
      const { getByLabelText } = renderComponent({ value: '2016-09-13' });
      expect(getByLabelText('Field Date')).toHaveValue('September 13, 2016');
      userEvent.click(screen.getByTitle('Field Date calendar button'));
      userEvent.click(screen.getByLabelText('September 14'));
      expect(getByLabelText('Field Date')).toHaveValue('September 14, 2016');
    });
  });

  describe('onChange API', () => {
    it('accepts an onChange listener', () => {
      const onChange = jest.fn();
      const { getByLabelText } = renderComponent({ value: '', onChange });
      changeValue(() => getByLabelText('Field Date'), '2016-07-18');
      expect(onChange.mock.calls.length).toBe(1);
    });
  });

  describe('when the component is readOnly', () => {
    it('does not display the helpText', () => {
      renderComponent({ readOnly: true, helpText: 'Foo', error: true });
      expect(screen.queryByText('Foo')).not.toBeInTheDocument();
    });
  });

  describe('forwardRef API', () => {
    it('can be used to get value', () => {
      const inputRef = createRef(null);
      render(<CustomFieldInputDate id="test-input" label="Test label" ref={inputRef} value="2016-07-18" />);

      expect(inputRef.current.value).toBe('July 18, 2016');
    });
  });
});
