import React from 'react';
import {
  render,
  screen,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Date from './date.jsx';

function getLocaleDate(date) {
  return {
    calendarDate: date.toLocaleDateString(undefined, { month: 'long', day: 'numeric' }),
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
    render(<Date {...requiredProps} />);
    expect(document.body).toMatchSnapshot();
  });

  it('validates when the component loses focus', () => {
    render(<Date {...requiredProps} required={true} />);
    expect(screen.getByLabelText('Test label')).toBeRequired();
    expect(screen.getByText('(Required)')).toBeInTheDocument();
    expect(screen.getByLabelText('Test label')).toBeInvalid();
    expect(screen.getByLabelText('Test label')).toHaveDescription('');
    userEvent.click(screen.getByLabelText('Test label'));
    userEvent.tab({ shift: true });
    expect(screen.getByLabelText('Test label')).toBeInvalid();
    expect(screen.getByLabelText('Test label')).toHaveDescription('Constraints not satisfied');
  });

  it('updates the calendar when the user types', async () => {
    const localizedDate = (new window.Date('1999-01-01')).toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'long',
    });

    render(<Date {...requiredProps} />);
    userEvent.type(screen.getByLabelText('Test label'), '1999-01-01');
    expect(await screen.findByText(localizedDate)).toBeInTheDocument();
  });

  describe('calendar behavior', () => {
    it('toggles open/close', () => {
      const today = (new window.Date()).toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'long',
      });

      render(<Date {...requiredProps} />);
      userEvent.click(screen.getByTitle('Test label calendar button'));
      expect(screen.getByText(today)).toBeInTheDocument();
      userEvent.click(screen.getByTitle('Test label calendar button'));
      expect(screen.queryByText(today)).not.toBeInTheDocument();
    });

    it('closes on selection', () => {
      const today = (new window.Date()).toLocaleDateString(undefined, { month: 'long', day: 'numeric' });
      const todayText = (new window.Date()).toLocaleDateString(undefined, { month: 'short', year: 'numeric', day: 'numeric' });

      render(<Date {...requiredProps} />);
      userEvent.click(screen.getByTitle('Test label calendar button'));
      userEvent.click(screen.getByLabelText(today));
      expect(screen.queryByText(today)).not.toBeInTheDocument();
      expect(screen.getByLabelText('Test label')).toHaveValue(todayText);
    });

    it('closes on blur', () => {
      const today = (new window.Date()).toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'long',
      });

      render(<Date {...requiredProps} />);
      userEvent.click(screen.getByTitle('Test label calendar button'));
      expect(screen.getByText(today)).toBeInTheDocument();
      userEvent.click(document.body);
      expect(screen.queryByText(today)).not.toBeInTheDocument();
      expect(document.activeElement).not.toBe(screen.getByLabelText('Test label'));
    });

    it('closes on escape', () => {
      const today = (new window.Date()).toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'long',
      });

      render(<Date {...requiredProps} />);
      userEvent.type(screen.getByLabelText('Test label'), '');
      expect(screen.getByText(today)).toBeInTheDocument();
      userEvent.type(screen.getByLabelText('Test label'), '{esc}', { skipClick: true });
      expect(screen.queryByText(today)).not.toBeInTheDocument();
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
      userEvent.click(screen.getByTitle('Test label calendar button'));
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
  });

  describe('id API', () => {
    it('is a string', () => {
      render(<Date {...requiredProps} id="unique-id" />);
      expect(screen.getByLabelText('Test label')).toHaveAttribute('id', 'unique-id');
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
      expect(screen.getByLabelText('Test label')).toHaveDescription('');
      userEvent.click(document.body);
      expect(screen.getByLabelText('Test label')).toBeInvalid();
      expect(screen.getByLabelText('Test label')).toHaveDescription('Constraints not satisfied');
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
      expect(screen.getByLabelText('Test label')).toHaveDescription('');
      userEvent.click(document.body);
      expect(screen.getByLabelText('Test label')).toBeInvalid();
      expect(screen.getByLabelText('Test label')).toHaveDescription('Constraints not satisfied');
    });
  });

  describe('name API', () => {
    it('is a string', () => {
      render(<Date {...requiredProps} name="unique_name" />);
      expect(screen.getByLabelText('Test label')).toHaveAttribute('name', 'unique_name');
    });
  });

  describe('readOnly API', () => {
    it('is true', () => {
      const today = (new window.Date()).toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'long',
      });

      render(<Date {...requiredProps} readOnly={true} />);
      expect(screen.getByLabelText('Test label')).toHaveAttribute('readonly');

      userEvent.click(screen.getByLabelText('Test label'));
      expect(screen.queryByText(today)).not.toBeInTheDocument();

      userEvent.type(screen.getByLabelText('Test label'), '{space}');
      expect(screen.queryByText(today)).not.toBeInTheDocument();
    });

    it('is false', () => {
      const today = (new window.Date()).toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'long',
      });

      render(<Date {...requiredProps} readOnly={false} />);
      expect(screen.getByLabelText('Test label')).not.toHaveAttribute('readonly');

      userEvent.tab();
      userEvent.type(screen.getByLabelText('Test label'), '{space}', { skipClick: true });
      expect(screen.getByText(today)).toBeInTheDocument();
    });
  });

  describe('required API', () => {
    it('is true', () => {
      render(<Date {...requiredProps} required={true} />);
      expect(screen.getByLabelText('Test label')).toBeRequired();
      expect(screen.getByText('(Required)')).toBeInTheDocument();
      expect(screen.getByLabelText('Test label')).toBeInvalid();
      expect(screen.getByLabelText('Test label')).toHaveDescription('');
      userEvent.click(screen.getByLabelText('Test label'));
      userEvent.click(document.body);
      expect(screen.getByLabelText('Test label')).toBeInvalid();
      expect(screen.getByLabelText('Test label')).toHaveDescription('Constraints not satisfied');
    });

    it('is false', () => {
      render(<Date {...requiredProps} required={false} />);
      expect(screen.getByLabelText('Test label')).not.toBeRequired();
      expect(screen.queryByText('(Required)')).not.toBeInTheDocument();
    });
  });

  describe('validationMessage API', () => {
    it('is a string', () => {
      const { rerender } = render(<Date {...requiredProps} validationMessage="This is a provided error." />);
      expect(screen.getByLabelText('Test label')).toBeInvalid();
      expect(screen.getByLabelText('Test label')).toHaveDescription('This is a provided error.');
      expect(screen.getByTitle('This is a provided error.')).toBeInTheDocument();

      rerender(<Date {...requiredProps} validationMessage="This is a new provided error." />);
      expect(screen.getByLabelText('Test label')).toBeInvalid();
      expect(screen.getByLabelText('Test label')).toHaveDescription('This is a new provided error.');
      expect(screen.getByTitle('This is a new provided error.')).toBeInTheDocument();
    });

    it('is cleared', () => {
      const { rerender } = render(<Date {...requiredProps} validationMessage="This is a provided error." />);
      expect(screen.getByLabelText('Test label')).toBeInvalid();
      expect(screen.getByLabelText('Test label')).toHaveDescription('This is a provided error.');
      expect(screen.getByTitle('This is a provided error.')).toBeInTheDocument();

      rerender(<Date {...requiredProps} validationMessage="" />);
      expect(screen.getByLabelText('Test label')).toBeValid();
      expect(screen.getByLabelText('Test label')).toHaveDescription('');
    });
  });

  describe('value API', () => {
    it('is a full-date string', () => {
      const date1 = getLocaleDate(new window.Date('2020-04-20'));
      const date2 = getLocaleDate(new window.Date('2020-04-21'));

      const { rerender } = render(<Date {...requiredProps} value={date1.editableValue} />);
      expect(screen.getByLabelText('Test label')).toHaveAttribute('value', date1.displayValue);
      rerender(<Date {...requiredProps} value={date2.editableValue} />);
      expect(screen.getByLabelText('Test label')).toHaveAttribute('value', date2.displayValue);
    });
  });
});
