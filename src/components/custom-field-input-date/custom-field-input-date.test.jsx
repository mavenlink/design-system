import React, { createRef } from 'react';
import {
  fireEvent,
  render,
  screen,
} from '@testing-library/react';
import CustomFieldInputDate from './custom-field-input-date.jsx';

describe('src/components/custom-field-input-date/custom-field-input-date', () => {
  const requiredProps = {
    id: 'field-date',
    label: 'Field Date',
    name: 'field-id',
  };

  const changeValue = (getInputElement, value) => {
    fireEvent.focus(getInputElement());
    fireEvent.change(getInputElement(), { target: { value } });
    fireEvent.blur(getInputElement());
  };

  it('has defaults', () => {
    const ref = createRef();
    render(<CustomFieldInputDate {...requiredProps} ref={ref} />);
    expect(document.body).toMatchSnapshot();
    expect(ref.current).toMatchSnapshot();
  });

  describe('className API', () => {
    it('prioritizes className prop', () => {
      const { container } = render(<CustomFieldInputDate {...requiredProps} className='prioritize-me' />);
      expect(container.firstChild).toHaveClass('prioritize-me');
    });
  });

  describe('value API', () => {
    it('accepts a string in format YYYY-MM-DD', () => {
      const { getByLabelText } = render(<CustomFieldInputDate {...requiredProps} value='2016-07-18' />);
      expect(getByLabelText('Field Date')).toHaveValue('July 18, 2016');
    });

    it('accepts a string in format mm/dd/yyyy', () => {
      const { getByLabelText } = render(<CustomFieldInputDate {...requiredProps} value='07/18/2016' />);
      expect(getByLabelText('Field Date')).toHaveValue('July 18, 2016');
    });

    it('accepts a string in format mm-dd-yyyy', () => {
      const { getByLabelText } = render(<CustomFieldInputDate {...requiredProps} value='07-18-2016' />);
      expect(getByLabelText('Field Date')).toHaveValue('July 18, 2016');
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
        render(<CustomFieldInputDate {...requiredProps} label='Field Date' id='field-date' value='05/10/1992' />);
        expect(screen.getByLabelText('Field Date')).toBeValid('error');
      });
    });

    xdescribe('when the value is syntactically invalid', () => {
      it('shows an error', () => {
        const { getByTestId } = render(<CustomFieldInputDate {...requiredProps} value='not a date' />);
        expect(getByTestId('custom-field-input')).toHaveClass('error');
      });

      it('informs the user of an invalid value', () => {
        const { getByTestId } = render(<CustomFieldInputDate {...requiredProps} value='not a date' />);
        expect(getByTestId('custom-field-input').innerHTML).toContain('"not a date" is an invalid date');
      });
    });

    xdescribe('when the value is semantically invalid', () => {
      it('shows an error', () => {
        const { getByTestId } = render(<CustomFieldInputDate {...requiredProps} error={true} />);
        expect(getByTestId('custom-field-input')).toHaveClass('error');
      });

      it('presents the provided help text', () => {
        const helpText = 'This should appear';
        const { getByTestId } = render(<CustomFieldInputDate {...requiredProps} error={true} helpText={helpText} />);
        expect(getByTestId('custom-field-input').innerHTML).toContain(helpText);
      });

      it('still shows the provided value', () => {
        const { getByLabelText } = render(<CustomFieldInputDate {...requiredProps} error={true} value='05/10/1992' />);
        expect(getByLabelText('Field Date')).toHaveValue('1992-05-10');
      });
    });
  });

  describe('helpText', () => {
    xit('shows on error', () => {
      render(<CustomFieldInputDate {...requiredProps} helpText='YOOO' error={true} />);
      expect(screen.getByText('YOOO')).toBeInTheDocument();
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
    xdescribe('when focused', () => {
      it('switches to a date input when focused', () => {
        const { getByLabelText } = render(<CustomFieldInputDate {...requiredProps} />);
        expect(getByLabelText('Field Date')).toHaveAttribute('type', 'text');
        fireEvent.focus(getByLabelText('Field Date'));
        expect(getByLabelText('Field Date')).toHaveAttribute('type', 'date');
      });

      it('ensures the date input shows the correct value', () => {
        const { getByLabelText } = render(<CustomFieldInputDate {...requiredProps} value='07/18/2016' />);
        expect(getByLabelText('Field Date')).toHaveAttribute('type', 'text');
        fireEvent.focus(getByLabelText('Field Date'));
        expect(getByLabelText('Field Date')).toHaveValue('2016-07-18');
      });

      xit('focuses on the date input', () => {
        const { getByLabelText } = render(<CustomFieldInputDate {...requiredProps} value='07/18/2016' />);
        expect(getByLabelText('Field Date')).toHaveAttribute('type', 'text');
        fireEvent.focus(getByLabelText('Field Date'));
        expect(getByLabelText('Field Date')).toHaveFocus();
      });
    });

    xdescribe('when blurred', () => {
      it('switches over to the text input', () => {
        const { getByLabelText } = render(<CustomFieldInputDate {...requiredProps} value='07/18/2016' />);
        fireEvent.focus(getByLabelText('Field Date'));
        expect(getByLabelText('Field Date')).toHaveAttribute('type', 'date');
        fireEvent.blur(getByLabelText('Field Date'));
        expect(getByLabelText('Field Date')).toHaveAttribute('type', 'text');
      });

      it('stays in edit mode when it is invalid', () => {
        const { getByLabelText } = render(<CustomFieldInputDate {...requiredProps} value='07/18/2016' error={true} />);
        fireEvent.focus(getByLabelText('Field Date'));
        fireEvent.blur(getByLabelText('Field Date'));
        expect(getByLabelText('Field Date')).toHaveAttribute('type', 'date');
      });
    });
  });

  xdescribe('min API', () => {
    it('respects the min attribute', () => {
      const { getByTestId } = render(<CustomFieldInputDate {...requiredProps} min='01-01-2000' value='05-10-1992' />);
      expect(getByTestId('custom-field-input')).toHaveClass('error');
    });

    it('is respected after a change', () => {
      const { getByTestId, getByLabelText } = render(<CustomFieldInputDate {...requiredProps} min='01-01-2000' value='05-10-2001' />);
      expect(getByTestId('custom-field-input')).not.toHaveClass('error');
      changeValue(() => getByLabelText('Field Date'), '1998-01-01');
      expect(getByTestId('custom-field-input')).toHaveClass('error');
    });
  });

  xdescribe('max API', () => {
    it('respects the max attribute', () => {
      const { getByTestId } = render(<CustomFieldInputDate {...requiredProps} max='01-01-1990' value='05-10-1992' />);
      expect(getByTestId('custom-field-input')).toHaveClass('error');
    });
  });

  describe('onChange API', () => {
    xit('accepts an onChange listener', () => {
      const onChange = jest.fn();
      const { getByLabelText } = render(<CustomFieldInputDate {...requiredProps} value='' onChange={onChange} />);
      changeValue(() => getByLabelText('Field Date'), '2016-07-18');
      expect(onChange.mock.calls.length).toBe(1);
    });
  });

  describe('when the component is readOnly', () => {
    it('does not display the helpText', () => {
      render(<CustomFieldInputDate {...requiredProps} readOnly={true} helpText='Foo' error={true} />);
      expect(screen.queryByText('Foo')).not.toBeInTheDocument();
    });
  });

  xit('changing value changes valid/invalid state', () => {
    const { getByTestId, getByLabelText } = render(<CustomFieldInputDate {...requiredProps} value='not a date' />);
    expect(getByTestId('custom-field-input')).toHaveClass('error');
    changeValue(() => getByLabelText('Field Date'), '2016-07-18');
    expect(getByTestId('custom-field-input')).not.toHaveClass('error');
  });

  describe('forwardRef API', () => {
    it('can be used to get value', () => {
      const inputRef = createRef(null);
      render(<CustomFieldInputDate {...requiredProps} id='test-input' label='Test label' ref={inputRef} value='2016-07-18' />);

      expect(inputRef.current.value).toBe('July 18, 2016');
    });
  });
});
