import React, {
  createRef,
} from 'react';
import {
  render,
  screen,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Date from './date.jsx';

function getLocaleDate(date) {
  return {
    calendarDate: date.toLocaleDateString(undefined, { month: 'long', day: 'numeric' }),
    calendarHeading: date.toLocaleDateString(undefined, { year: 'numeric', month: 'long' }),
    displayValue: date.toLocaleDateString(undefined, { month: 'short', year: 'numeric', day: 'numeric' }),
    editableValue: date.toISOString().slice(0, 10),
  };
}

describe('src/components/date/date.test.jsx', () => {
  const requiredProps = {
    id: 'test-id',
    label: 'Test label',
    name: 'test_name',
  };

  it('has defaults', () => {
    const ref = createRef();
    render(<Date {...requiredProps} ref={ref} />);
    expect(document.body).toMatchSnapshot();
    expect(ref.current).toMatchSnapshot();
  });

  it('validates when the component loses focus', () => {
    render(<Date {...requiredProps} required={true} />);
    expect(screen.getByLabelText('Test label')).toBeRequired();
    expect(screen.getByText('(Required)')).toBeInTheDocument();
    expect(screen.getByLabelText('Test label')).toBeInvalid();
    expect(screen.getByLabelText('Test label')).toHaveAccessibleDescription('');
    userEvent.click(screen.getByLabelText('Test label'));
    userEvent.tab({ shift: true });
    expect(screen.getByLabelText('Test label')).toBeInvalid();
    expect(screen.getByLabelText('Test label')).toHaveAccessibleDescription('Constraints not satisfied');
  });

  it('updates the calendar when the user types', async () => {
    const date = getLocaleDate(new window.Date('1999-01-01'));

    render(<Date {...requiredProps} />);
    userEvent.tab();
    userEvent.type(screen.getByLabelText('Test label'), '1999-01-01');
    expect(await screen.findByText(date.calendarHeading)).toBeInTheDocument();
  });

  describe('calendar behavior', () => {
    it('toggles open/close', () => {
      const today = getLocaleDate(new window.Date());

      render(<Date {...requiredProps} />);
      userEvent.click(screen.getByTitle('calendar button'));
      expect(screen.getByText(today.calendarHeading)).toBeInTheDocument();
      userEvent.click(screen.getByTitle('calendar button'));
      expect(screen.queryByText(today.calendarHeading)).not.toBeInTheDocument();
    });

    it('closes on selection', () => {
      const today = getLocaleDate(new window.Date());

      render(<Date {...requiredProps} />);
      userEvent.click(screen.getByTitle('calendar button'));
      userEvent.click(screen.getByLabelText(today.calendarDate));
      expect(screen.queryByText(today.calendarDate)).not.toBeInTheDocument();
      expect(screen.getByLabelText('Test label')).toHaveFocus();
      expect(screen.getByLabelText('Test label')).toHaveValue(today.editableValue);
    });

    it('closes on blur', () => {
      const today = getLocaleDate(new window.Date());

      render(<Date {...requiredProps} />);
      userEvent.click(screen.getByTitle('calendar button'));
      expect(screen.getByText(today.calendarHeading)).toBeInTheDocument();
      userEvent.click(document.body);
      expect(screen.queryByText(today.calendarHeading)).not.toBeInTheDocument();
      expect(document.activeElement).not.toBe(screen.getByLabelText('Test label'));
    });

    it('closes on escape', () => {
      const today = getLocaleDate(new window.Date());

      render(<Date {...requiredProps} />);
      userEvent.tab();
      userEvent.type(screen.getByLabelText('Test label'), '');
      expect(screen.getByText(today.calendarHeading)).toBeInTheDocument();
      userEvent.keyboard('{Escape}');
      expect(screen.queryByText(today.calendarHeading)).not.toBeInTheDocument();
    });

    it('does not open the native calendar picker', () => {
      const onClickSpy = jest.fn(event => event.persist());
      const onKeyDownSpy = jest.fn(event => event.persist());

      render((
        <div onClick={onClickSpy} onKeyDown={onKeyDownSpy}>
          <Date {...requiredProps} />
        </div>
      ));

      userEvent.click(screen.getByLabelText('Test label'));
      userEvent.type(screen.getByLabelText('Test label'), ' ');

      expect(onClickSpy).toBeCalledWith(expect.objectContaining({
        defaultPrevented: true,
        target: expect.anything(),
      }));
      expect(onKeyDownSpy).toBeCalledWith(expect.objectContaining({
        defaultPrevented: true,
        target: expect.anything(),
      }));
    });

    it('updates the value between input types', () => {
      const date1 = getLocaleDate(new window.Date('2020-01-01'));
      const date2 = getLocaleDate(new window.Date('2020-01-02'));
      render(<Date {...requiredProps} value="2020-01-03" />);
      userEvent.click(screen.getByLabelText('Test label'));
      userEvent.click(screen.getByLabelText(date1.calendarDate));
      expect(screen.getByLabelText('Test label')).toHaveAttribute('value', date1.displayValue);
      userEvent.click(screen.getByTitle('calendar button'));
      userEvent.click(screen.getByLabelText(date2.calendarDate));
      expect(screen.getByLabelText('Test label')).toHaveAttribute('value', date2.displayValue);
    });
  });

  describe('input behavior', () => {
    it('toggles between input types', () => {
      render(<Date {...requiredProps} />);
      expect(screen.getByLabelText('Test label')).toHaveAttribute('type', 'text');
      expect(document.activeElement).not.toBe(screen.getByLabelText('Test label'));
      userEvent.click(screen.getByLabelText('Test label'));
      expect(screen.getByLabelText('Test label')).toHaveAttribute('type', 'date');
      expect(document.activeElement).toBe(screen.getByLabelText('Test label'));
      userEvent.click(document.body);
      expect(document.activeElement).not.toBe(screen.getByLabelText('Test label'));
    });

    it('updates the value between input types', () => {
      const date1 = getLocaleDate(new window.Date('2020-01-01'));
      const date2 = getLocaleDate(new window.Date('2020-01-02'));
      render(<Date {...requiredProps} />);
      userEvent.type(screen.getByLabelText('Test label'), date1.editableValue);
      userEvent.click(screen.getByLabelText(date2.calendarDate));
      expect(screen.getByLabelText('Test label')).toHaveAttribute('value', date2.displayValue);
      expect(document.activeElement).toBe(screen.getByLabelText('Test label'));
    });

    it('starts editing on Space key', () => {
      render(<Date {...requiredProps} />);
      userEvent.type(screen.getByLabelText('Test label'), ' ');
      expect(screen.getByLabelText('Test label')).toHaveAttribute('type', 'date');
    });

    it('stays editing on invalid value', () => {
      render(<Date {...requiredProps} validationMessage="Do that again." required />);
      expect(screen.getByLabelText('Test label')).toHaveAttribute('type', 'date');
      userEvent.click(screen.getByLabelText('Test label'));
      userEvent.click(document.body);
      expect(screen.getByLabelText('Test label')).toBeInvalid();
      expect(screen.getByLabelText('Test label')).toHaveAttribute('type', 'date');
      userEvent.click(screen.getByLabelText('Test label'));
      userEvent.click(document.body);
      expect(screen.getByLabelText('Test label')).toBeInvalid();
      expect(screen.getByLabelText('Test label')).toHaveAttribute('type', 'date');
    });
  });

  describe('classNames API', () => {
    it('sets various class names', () => {
      render((<Date
        {...requiredProps}
        classNames={{
          container: 'unique-container',
          input: 'unique-input',
        }}
        value="2021-04-20"
      />));

      expect(document.body).toMatchSnapshot();
      userEvent.click(screen.getByLabelText('Test label'));
      expect(document.body).toMatchSnapshot();
    });
  });

  describe('dirty API', () => {
    it('is a boolean', () => {
      const ref = createRef();
      const { rerender } = render(<Date {...requiredProps} ref={ref} value="2020-01-01" />);
      expect(ref.current.dirty).toBe(false);
      userEvent.type(screen.getByLabelText('Test label'), '2021-01-01');
      expect(ref.current.dirty).toBe(true);
      rerender(<Date {...requiredProps} ref={ref} value="2021-01-01" />);
      expect(ref.current.dirty).toBe(false);
    });
  });

  describe('id API', () => {
    it('is a string', () => {
      const ref = createRef();
      render(<Date {...requiredProps} id="unique-id" ref={ref} />);
      expect(screen.getByLabelText('Test label')).toHaveAttribute('id', 'unique-id');
      expect(ref.current.id).toBe('unique-id');
    });
  });

  describe('label API', () => {
    it('is a string', () => {
      render(<Date {...requiredProps} label="Unique label" />);
      expect(screen.getByLabelText('Unique label')).toBeInTheDocument();
    });
  });

  describe('max API', () => {
    it('is date-only', () => {
      render(<Date {...requiredProps} max="2000-01-01" />);
      userEvent.type(screen.getByLabelText('Test label'), '2000-01-01');
      expect(screen.getByLabelText('Test label')).toBeValid();
      userEvent.clear(screen.getByLabelText('Test label'));
      userEvent.type(screen.getByLabelText('Test label'), '2000-01-02');
      expect(screen.getByLabelText('Test label')).toBeInvalid();
      expect(screen.getByLabelText('Test label')).toHaveAccessibleDescription('');
      userEvent.click(document.body);
      expect(screen.getByLabelText('Test label')).toBeInvalid();
      expect(screen.getByLabelText('Test label')).toHaveAccessibleDescription('Constraints not satisfied');
    });
  });

  describe('min API', () => {
    it('is date-only', () => {
      render(<Date {...requiredProps} min="2000-01-01" />);
      userEvent.type(screen.getByLabelText('Test label'), '2000-01-01');
      expect(screen.getByLabelText('Test label')).toBeValid();
      userEvent.clear(screen.getByLabelText('Test label'));
      userEvent.type(screen.getByLabelText('Test label'), '1999-12-31');
      expect(screen.getByLabelText('Test label')).toBeInvalid();
      expect(screen.getByLabelText('Test label')).toHaveAccessibleDescription('');
      userEvent.click(document.body);
      expect(screen.getByLabelText('Test label')).toBeInvalid();
      expect(screen.getByLabelText('Test label')).toHaveAccessibleDescription('Constraints not satisfied');
    });
  });

  describe('name API', () => {
    it('is a string', () => {
      const ref = createRef();
      render(<Date {...requiredProps} name="unique_name" ref={ref} />);
      expect(screen.getByLabelText('Test label')).toHaveAttribute('name', 'unique_name');
      expect(ref.current.name).toBe('unique_name');
    });
  });

  describe('onChange API', () => {
    it('is a function', () => {
      const date = getLocaleDate(new window.Date());
      const onChangeSpy = jest.fn();
      const ref = createRef();

      render(<Date {...requiredProps} onChange={onChangeSpy} ref={ref} />);
      userEvent.click(screen.getByLabelText('Test label'));
      userEvent.click(screen.getByLabelText(date.calendarDate));

      expect(screen.getByLabelText('Test label')).toHaveAttribute('value', date.editableValue);
      expect(onChangeSpy.mock.calls.length).toBe(1); // Do not call while inactive
      expect(onChangeSpy).toBeCalledWith(expect.objectContaining({
        target: expect.objectContaining({
          value: date.editableValue,
        }),
      }));
    });
  });

  describe('placeholder API', () => {
    it('is a string', () => {
      render(<Date {...requiredProps} placeholder="Unique placeholder" />);
      expect(screen.getByLabelText('Test label')).toHaveAttribute('placeholder', 'Unique placeholder');
    });
  });

  describe('readOnly API', () => {
    it('is true', () => {
      const today = getLocaleDate(new window.Date());

      render(<Date {...requiredProps} readOnly={true} />);
      expect(screen.getByLabelText('Test label')).toHaveAttribute('readonly');

      userEvent.click(screen.getByLabelText('Test label'));
      expect(screen.queryByText(today.calendarHeading)).not.toBeInTheDocument();

      userEvent.type(screen.getByLabelText('Test label'), '{space}');
      expect(screen.queryByText(today.calendarHeading)).not.toBeInTheDocument();
    });

    it('is false', () => {
      const today = getLocaleDate(new window.Date());

      render(<Date {...requiredProps} readOnly={false} />);
      expect(screen.getByLabelText('Test label')).not.toHaveAttribute('readonly');

      userEvent.tab();
      userEvent.type(screen.getByLabelText('Test label'), '{space}', { skipClick: true });
      expect(screen.getByText(today.calendarHeading)).toBeInTheDocument();
    });
  });

  describe('required API', () => {
    it('is true', () => {
      render(<Date {...requiredProps} required={true} />);
      expect(screen.getByLabelText('Test label')).toBeRequired();
      expect(screen.getByText('(Required)')).toBeInTheDocument();
      expect(screen.getByLabelText('Test label')).toBeInvalid();
      expect(screen.getByLabelText('Test label')).toHaveAccessibleDescription('');
      userEvent.click(screen.getByLabelText('Test label'));
      userEvent.click(document.body);
      expect(screen.getByLabelText('Test label')).toBeInvalid();
      expect(screen.getByLabelText('Test label')).toHaveAccessibleDescription('Constraints not satisfied');
    });

    it('is false', () => {
      render(<Date {...requiredProps} required={false} />);
      expect(screen.getByLabelText('Test label')).not.toBeRequired();
      expect(screen.queryByText('(Required)')).not.toBeInTheDocument();
    });
  });

  describe('tooltip API', () => {
    const tooltip = 'I am an input, short and stout.';

    it('applies a description to the input when the help icon is hovered', () => {
      render(<Date {...requiredProps} tooltip={tooltip} />);
      userEvent.hover(screen.getByRole('img', { name: 'More information' }));
      expect(screen.getByLabelText(requiredProps.label)).toHaveAccessibleDescription(tooltip);
    });

    it('removes the description to the input when the help icon is unhovered', () => {
      render(<Date {...requiredProps} tooltip={tooltip} />);
      userEvent.hover(screen.getByRole('img', { name: 'More information' }));
      userEvent.unhover(screen.getByRole('img', { name: 'More information' }));
      expect(screen.getByLabelText(requiredProps.label)).toHaveAccessibleDescription('');
    });
  });

  describe('validationMessage API', () => {
    it('is a string', () => {
      const { rerender } = render(<Date {...requiredProps} validationMessage="This is a provided error." />);
      expect(screen.getByLabelText('Test label')).toHaveAttribute('type', 'date');
      expect(screen.getByLabelText('Test label')).toBeInvalid();
      expect(screen.getByLabelText('Test label')).toHaveAccessibleDescription('This is a provided error.');
      expect(screen.getByTitle('This is a provided error.')).toBeInTheDocument();

      rerender(<Date {...requiredProps} validationMessage="This is a new provided error." />);
      expect(screen.getByLabelText('Test label')).toHaveAttribute('type', 'date');
      expect(screen.getByLabelText('Test label')).toBeInvalid();
      expect(screen.getByLabelText('Test label')).toHaveAccessibleDescription('This is a new provided error.');
      expect(screen.getByTitle('This is a new provided error.')).toBeInTheDocument();
    });

    it('is cleared', () => {
      const { rerender } = render(<Date {...requiredProps} validationMessage="This is a provided error." />);
      expect(screen.getByLabelText('Test label')).toHaveAttribute('type', 'date');
      expect(screen.getByLabelText('Test label')).toBeInvalid();
      expect(screen.getByLabelText('Test label')).toHaveAccessibleDescription('This is a provided error.');
      expect(screen.getByTitle('This is a provided error.')).toBeInTheDocument();

      rerender(<Date {...requiredProps} validationMessage="" />);
      expect(screen.getByLabelText('Test label')).toHaveAttribute('type', 'text');
      expect(screen.getByLabelText('Test label')).toBeValid();
      expect(screen.getByLabelText('Test label')).toHaveAccessibleDescription('');
    });
  });

  describe('value API', () => {
    it('is a full-date string', () => {
      const date1 = getLocaleDate(new window.Date('2020-04-20'));
      const date2 = getLocaleDate(new window.Date('2020-04-21'));
      const ref = createRef();

      const { rerender } = render(<Date {...requiredProps} value={date1.editableValue} ref={ref} />);
      expect(screen.getByLabelText('Test label')).toHaveAttribute('value', date1.displayValue);
      expect(ref.current.value).toBe(date1.editableValue);
      rerender(<Date {...requiredProps} value={date2.editableValue} ref={ref} />);
      expect(screen.getByLabelText('Test label')).toHaveAttribute('value', date2.displayValue);
      expect(ref.current.value).toBe(date2.editableValue);
    });
  });
});
