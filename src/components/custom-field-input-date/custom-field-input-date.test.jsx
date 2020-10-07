import React, { createRef } from 'react';
import {
  fireEvent,
  render,
  screen,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CustomFieldInputDate from './custom-field-input-date.jsx';

describe('src/components/custom-field-input-date/custom-field-input-date', () => {
  const requiredProps = {
    id: 'field-date',
    label: 'Field Date',
    name: 'field-id',
  };

  const changeValue = (getInputElement, value) => {
    userEvent.click(getInputElement());
    fireEvent.change(getInputElement(), { target: { value } });
    fireEvent.blur(getInputElement());
  };

  it('has defaults', () => {
    const ref = createRef();
    render(<CustomFieldInputDate {...requiredProps} ref={ref} />);
    expect(document.body).toMatchSnapshot();
    expect(ref.current).toMatchSnapshot();
  });

  describe('ref', () => {
    it('has a dirty attribute; which returns true only when the value has changed', () => {
      const ref = createRef();
      render(<CustomFieldInputDate {...requiredProps} ref={ref} />);
      expect(ref.current.dirty).toBe(false);
      changeValue(() => screen.getByLabelText('Field Date'), '2016-07-18');
      expect(ref.current.dirty).toBe(true);
    });

    it('has a id attribute; returns the id prop', () => {
      const ref = createRef();
      render(<CustomFieldInputDate {...requiredProps} ref={ref} />);
      expect(ref.current.id).toEqual('field-date');
    });

    it('has a name attribute; returns name prop', () => {
      const ref = createRef();
      render(<CustomFieldInputDate {...requiredProps} ref={ref} />);
      expect(ref.current.name).toEqual('field-id');
    });

    it('has a value attribute; returns the value in yyyy-mm-dd format', () => {
      const ref = createRef();
      render(<CustomFieldInputDate {...requiredProps} ref={ref} value={'09/27/2020'} />);
      expect(ref.current.value).toEqual('2020-09-27');
    });
  });

  describe('dirty ref API', () => {
    xit('updates on user interactions', () => {
      const ref = createRef();
      render(<CustomFieldInputDate {...requiredProps} ref={ref} />);
      userEvent.click(screen.getByLabelText('Field Date'));
      expect(ref.current.dirty).toEqual(false);
      userEvent.type(screen.getByLabelText('Field Date'), '12/12/1212');
      expect(ref.current.dirty).toEqual(true);
      userEvent.type(screen.getByLabelText('Field Date'), '');
      expect(ref.current.dirty).toEqual(false);
    });
  });

  describe('value API', () => {
    it('accepts a string in format YYYY-MM-DD', () => {
      const { getByLabelText } = render(<CustomFieldInputDate {...requiredProps} value="2016-07-18" />);
      expect(getByLabelText('Field Date')).toHaveValue('Jul 18, 2016');
    });

    it('accepts a string in format mm/dd/yyyy', () => {
      const { getByLabelText } = render(<CustomFieldInputDate {...requiredProps} value="07/18/2016" />);
      expect(getByLabelText('Field Date')).toHaveValue('Jul 18, 2016');
    });

    it('accepts a string in format mm-dd-yyyy', () => {
      const { getByLabelText } = render(<CustomFieldInputDate {...requiredProps} value="07-18-2016" />);
      expect(getByLabelText('Field Date')).toHaveValue('Jul 18, 2016');
    });
  });

  describe('disabled API', () => {
    it('permits itself to be disabled', () => {
      const { getByLabelText } = render(<CustomFieldInputDate {...requiredProps} disabled={true} />);
      expect(getByLabelText('Field Date')).toBeDisabled();
    });

    it('permits itself to be enabled', () => {
      const { getByLabelText } = render(<CustomFieldInputDate {...requiredProps} disabled={false} />);
      expect(getByLabelText('Field Date')).not.toBeDisabled();
    });
  });

  describe('error API', () => {
    describe('when the value is valid', () => {
      it('does not show an error', () => {
        render(<CustomFieldInputDate {...requiredProps} label="Field Date" id="field-date" value="05/10/1992" />);
        expect(screen.getByLabelText('Field Date')).toBeValid('error');
      });
    });
  });

  describe('placeholder API', () => {
    it('does not show an error', () => {
      render(<CustomFieldInputDate {...requiredProps} label="Field Date" id="field-date" placeholder="Select a date!" />);
      expect(screen.getByLabelText('Field Date')).toHaveAttribute('placeholder', 'Select a date!');
    });
  });

  describe('errorText', () => {
    it('shows an error icon and the error text', () => {
      render(<CustomFieldInputDate {...requiredProps} value="2016-07-18" errorText="Bad Date!" />);
      expect(screen.getByLabelText('Field Date')).not.toBeValid();
      expect(screen.getByText('Bad Date!')).toBeInTheDocument();
    });
  });

  describe('required API', () => {
    it('is required when told to be', () => {
      const { getByLabelText } = render(<CustomFieldInputDate {...requiredProps} required={true} />);
      expect(getByLabelText('Field Date')).toBeRequired();
    });

    it('is not required when told not to be', () => {
      const { getByLabelText } = render(<CustomFieldInputDate {...requiredProps} required={false} />);
      expect(getByLabelText('Field Date')).not.toBeRequired();
    });
  });

  describe('interaction', () => {
    describe('when focused', () => {
      it('switches to a date input when focused and opens the calendar', () => {
        const { getByLabelText } = render(<CustomFieldInputDate {...requiredProps} value="07/18/2016" />);
        expect(getByLabelText('Field Date')).toHaveAttribute('type', 'text');
        userEvent.click(getByLabelText('Field Date'));
        expect(getByLabelText('Field Date')).toHaveAttribute('type', 'date');
        expect(screen.getByText('July 2016')).toBeInTheDocument();
      });
    });

    describe('when clicked', () => {
      it('ensures the date input shows the correct value', () => {
        const { getByLabelText } = render(<CustomFieldInputDate {...requiredProps} value="07/18/2016" />);
        expect(getByLabelText('Field Date')).toHaveAttribute('type', 'text');
        userEvent.click(getByLabelText('Field Date'));
        expect(getByLabelText('Field Date')).toHaveValue('2016-07-18');
      });

      it('focuses on the date input', () => {
        const { getByLabelText } = render(<CustomFieldInputDate {...requiredProps} value="07/18/2016" />);
        expect(getByLabelText('Field Date')).toHaveAttribute('type', 'text');
        userEvent.click(getByLabelText('Field Date'));
        expect(getByLabelText('Field Date')).toHaveFocus();
      });
    });

    describe('when blurred', () => {
      it('switches over to the text input', () => {
        render(
          <div>
            <CustomFieldInputDate {...requiredProps} value={'07/18/2016'} />
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
        const { getByLabelText } = render(<CustomFieldInputDate {...requiredProps} value="07/18/2016" error />);
        userEvent.click(getByLabelText('Field Date'));
        fireEvent.blur(getByLabelText('Field Date'));
        expect(getByLabelText('Field Date')).toHaveAttribute('type', 'date');
      });
    });
  });

  describe('calendar icon', () => {
    it('opens to the correct date on click and closes when clicking away', () => {
      render(<CustomFieldInputDate {...requiredProps} value="2016-07-18" />);
      expect(screen.queryByText('July 2016')).not.toBeInTheDocument();
      userEvent.click(screen.getByTitle('Field Date calendar button'));
      expect(screen.getByText('July 2016')).toBeInTheDocument();
      userEvent.click(document.body);
      expect(screen.queryByText('July 2016')).not.toBeInTheDocument();
    });

    it('opens to the correct date on click / pressing enter and closes on escape', () => {
      const { getByLabelText } = render(<CustomFieldInputDate {...requiredProps} value="2016-07-18" />);
      expect(screen.queryByText('July 2016')).not.toBeInTheDocument();
      userEvent.click(getByLabelText('Field Date'));
      expect(screen.getByText('July 2016')).toBeInTheDocument();
      fireEvent.keyDown(document.activeElement, { key: 'Escape' });
      expect(screen.queryByText('July 2016')).not.toBeInTheDocument();
      fireEvent.keyDown(getByLabelText('Field Date'), { key: 'Enter' });
      expect(screen.getByText('July 2016')).toBeInTheDocument();
    });

    it('changes the date to the date selected', () => {
      const { getByLabelText } = render(<CustomFieldInputDate {...requiredProps} value="2016-09-13" />);
      expect(getByLabelText('Field Date')).toHaveValue('Sep 13, 2016');
      userEvent.click(screen.getByTitle('Field Date calendar button'));
      userEvent.click(screen.getByLabelText('September 14'));
      expect(getByLabelText('Field Date')).toHaveValue('Sep 14, 2016');
    });

    it('does not open when disabled', () => {
      render(<CustomFieldInputDate {...requiredProps} value="2016-07-18" disabled />);
      expect(screen.queryByText('July 2016')).not.toBeInTheDocument();
      userEvent.click(screen.getByTitle('Field Date calendar'));
      expect(screen.queryByText('July 2016')).not.toBeInTheDocument();
    });
  });

  describe('onChange API', () => {
    it('accepts an onChange listener', () => {
      const onChange = jest.fn();
      const { getByLabelText } = render(<CustomFieldInputDate {...requiredProps} value="" onChange={onChange} />);
      changeValue(() => getByLabelText('Field Date'), '2016-07-18');
      expect(onChange.mock.calls.length).toBe(1);
      expect(onChange).toHaveBeenLastCalledWith('2016-07-18');
    });

    it('passes an object with target pointing to the current ref when initialized with a ref', () => {
      const onChange = jest.fn();
      const ref = createRef();
      const { getByLabelText } = render(<CustomFieldInputDate {...requiredProps} ref={ref} value="2016-07-16" onChange={onChange} />);
      changeValue(() => getByLabelText('Field Date'), '2016-07-18');
      expect(onChange.mock.calls.length).toBe(1);
      expect(onChange).toHaveBeenLastCalledWith({ target: ref.current });
    });
  });

  describe('when the component is readOnly', () => {
    it('does not display the helpText', () => {
      render(<CustomFieldInputDate {...requiredProps} readOnly={true} helpText="Foo" error={true} />);
      expect(screen.queryByText('Foo')).not.toBeInTheDocument();
    });
  });

  describe('forwardRef API', () => {
    it('can be used to get value', () => {
      const inputRef = createRef(null);
      render(<CustomFieldInputDate {...requiredProps} id="test-input" label="Test label" ref={inputRef} value="2016-07-18" />);
      expect(inputRef.current.value).toBe('2016-07-18');
    });
  });
});
