import React from 'react';
import {
  fireEvent,
  render,
  screen,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Calendar from './calendar.jsx';

describe('<Calendar />', () => {
  const requiredProps = {
  };

  beforeEach(() => {
    jest.spyOn(Date, 'now').mockImplementation(() => 1596062788778); // July 29, 2020
    jest.spyOn(Date.prototype, 'getTimezoneOffset').mockImplementation(() => 360); // Force timezone to MDT
  });

  function renderAndExpectFocusedCalendar() {
    render(<Calendar {...requiredProps} />);
    userEvent.tab();
    userEvent.tab();
    userEvent.tab();
    userEvent.tab();
    expect(screen.getByRole('gridcell', { name: 'July 29' })).toHaveFocus();
  }

  it('has defaults', () => {
    render(<Calendar {...requiredProps} />);
    expect(document.body).toMatchSnapshot();
  });

  it('renders the previous month', () => {
    render(<Calendar {...requiredProps} />);
    userEvent.click(screen.getByRole('button', { name: 'Change calendar to June 2020' }));
    expect(screen.getByRole('gridcell', { name: 'May 31' })).toHaveClass('not-current-date');
    expect(screen.getByRole('gridcell', { name: 'June 1' })).toHaveClass('date');
    expect(screen.getByRole('gridcell', { name: 'July 1' })).toHaveClass('not-current-date');
    expect(screen.getByRole('gridcell', { name: 'July 11' })).toHaveClass('not-current-date');
    expect(document.body).toMatchSnapshot();
  });

  it('renders the previous year', () => {
    render(<Calendar {...requiredProps} />);
    userEvent.click(screen.getByRole('button', { name: 'Change calendar to June 2020' }));
    userEvent.click(screen.getByRole('button', { name: 'Change calendar to May 2020' }));
    userEvent.click(screen.getByRole('button', { name: 'Change calendar to April 2020' }));
    userEvent.click(screen.getByRole('button', { name: 'Change calendar to March 2020' }));
    userEvent.click(screen.getByRole('button', { name: 'Change calendar to February 2020' }));
    userEvent.click(screen.getByRole('button', { name: 'Change calendar to January 2020' }));
    userEvent.click(screen.getByRole('button', { name: 'Change calendar to December 2019' }));
    userEvent.click(screen.getByRole('button', { name: 'Change calendar to November 2019' }));
    userEvent.click(screen.getByRole('button', { name: 'Change calendar to October 2019' }));
    userEvent.click(screen.getByRole('button', { name: 'Change calendar to September 2019' }));
    userEvent.click(screen.getByRole('button', { name: 'Change calendar to August 2019' }));
    userEvent.click(screen.getByRole('button', { name: 'Change calendar to July 2019' }));
    expect(screen.getByRole('gridcell', { name: 'June 30' })).toHaveClass('not-current-date');
    expect(screen.getByRole('gridcell', { name: 'July 30' })).toHaveClass('date');
    expect(screen.getByRole('gridcell', { name: 'July 1' })).toHaveClass('date');
    expect(screen.getByRole('gridcell', { name: 'August 1' })).toHaveClass('not-current-date');
    expect(document.body).toMatchSnapshot();
  });

  describe('accessibility', () => {
    it('does not steal focus on mount', () => {
      render(<Calendar {...requiredProps} />);
      expect(document.body).toHaveFocus();
    });

    describe('when a date is focused', () => {
      it('selects the active date on Enter', () => {
        renderAndExpectFocusedCalendar();
        expect(screen.getByRole('gridcell', { name: 'July 29' })).toHaveAttribute('aria-selected', 'false');
        fireEvent.keyDown(screen.getByRole('gridcell', { name: 'July 29' }), { key: 'Enter' });
        expect(screen.getByRole('gridcell', { name: 'July 29' })).toHaveAttribute('aria-selected', 'true');
      });

      it('selects the active date on Space', () => {
        renderAndExpectFocusedCalendar();
        expect(screen.getByRole('gridcell', { name: 'July 29' })).toHaveAttribute('aria-selected', 'false');
        fireEvent.keyDown(screen.getByRole('gridcell', { name: 'July 29' }), { key: 'Space' });
        expect(screen.getByRole('gridcell', { name: 'July 29' })).toHaveAttribute('aria-selected', 'true');
      });

      it('moves the focus to the previous date on LeftArrow', () => {
        renderAndExpectFocusedCalendar();
        fireEvent.keyDown(screen.getByRole('grid'), { key: 'ArrowLeft', code: 'ArrowLeft' });
        expect(screen.getByRole('gridcell', { name: 'July 28' })).toHaveFocus();
      });

      it('moves the focus to the next date on RightArrow', () => {
        renderAndExpectFocusedCalendar();
        fireEvent.keyDown(screen.getByRole('grid'), { key: 'ArrowRight', code: 'ArrowRight' });
        expect(screen.getByRole('gridcell', { name: 'July 30' })).toHaveFocus();
      });

      it('moves the focus to the previous week on UpArrow', () => {
        renderAndExpectFocusedCalendar();
        fireEvent.keyDown(screen.getByRole('grid'), { key: 'ArrowUp', code: 'ArrowUp' });
        expect(screen.getByRole('gridcell', { name: 'July 22' })).toHaveFocus();
      });

      it('moves the focus to the next week on DownArrow', () => {
        renderAndExpectFocusedCalendar();
        fireEvent.keyDown(screen.getByRole('grid'), { key: 'ArrowDown', code: 'ArrowDown' });
        expect(screen.getByRole('gridcell', { name: 'August 5' })).toHaveFocus();
      });

      it('moves the focus to the beginning of the week on Home', () => {
        renderAndExpectFocusedCalendar();
        fireEvent.keyDown(screen.getByRole('grid'), { key: 'Home', code: 'Home' });
        expect(screen.getByRole('gridcell', { name: 'July 26' })).toHaveFocus();
      });

      it('moves the focus to the end of the week on End', () => {
        renderAndExpectFocusedCalendar();
        fireEvent.keyDown(screen.getByRole('grid'), { key: 'End', code: 'End' });
        expect(screen.getByRole('gridcell', { name: 'August 1' })).toHaveFocus();
      });

      it('changes the calendar to the previous month on PageUp', () => {
        renderAndExpectFocusedCalendar();
        fireEvent.keyDown(screen.getByRole('grid'), { key: 'PageUp', code: 'PageUp' });
        expect(screen.getByRole('gridcell', { name: 'June 29' })).toHaveFocus();
      });

      it('changes the calendar to the next month on PageDown', () => {
        renderAndExpectFocusedCalendar();
        fireEvent.keyDown(screen.getByRole('grid'), { key: 'PageDown', code: 'PageDown' });
        expect(screen.getByRole('gridcell', { name: 'August 29' })).toHaveFocus();
      });

      it('changes the calendar to the previous year on Shift+PageUp', () => {
        // renderAndExpectFocusedCalendar();
        // fireEvent.keyDown(screen.getByRole('grid'), { key: 'PageDown', code: 'PageDown', meta: '{shift}' });
        // expect(screen.getByRole('gridcell', { name: 'July 29' })).toHaveFocus();
      });

      it('changes the calendar to the next year on Shift+PageDown', () => {
        // render(<Calendar {...requiredProps} />);
      });
    });

    it('selects a date on click', () => {
      render(<Calendar {...requiredProps} />);
      expect(screen.getByRole('gridcell', { name: 'July 28' })).toHaveAttribute('aria-selected', 'false');
      userEvent.click(screen.getByRole('gridcell', { name: 'July 28' }));
      expect(screen.getByRole('gridcell', { name: 'July 28' })).toHaveAttribute('aria-selected', 'true');
    });
  });

  describe('previous month button', () => {
    it('displays the previous month', () => {
      render(<Calendar {...requiredProps} />);
      userEvent.click(screen.getByRole('button', { name: 'Change calendar to June 2020' }));
      expect(screen.getByText('June 2020')).toBeInTheDocument();
    });
  });

  describe('next month button', () => {
    it('displays the next month', () => {
      render(<Calendar {...requiredProps} />);
      userEvent.click(screen.getByRole('button', { name: 'Change calendar to August 2020' }));
      expect(screen.getByText('August 2020')).toBeInTheDocument();
    });
  });

  describe('value props API', () => {
    it('can be set', () => {
      expect(render(<Calendar {...requiredProps} value="2012-02-28" />));
      expect(screen.getByText('February 2012')).toBeInTheDocument();
      expect(screen.getByRole('gridcell', { name: 'February 28' })).toHaveAttribute('aria-selected', 'true');
    });
  });
});
