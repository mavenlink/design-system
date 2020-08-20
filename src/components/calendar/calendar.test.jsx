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
  });

  function renderAndExpectFocusedCalendar() {
    render(<Calendar {...requiredProps} />);
    userEvent.tab();
    userEvent.tab();
    userEvent.tab();
    userEvent.tab();
    expect(screen.getByLabelText('July 29')).toHaveFocus();
  }

  it('has defaults', () => {
    render(<Calendar {...requiredProps} />);
    expect(document.body).toMatchSnapshot();
  });

  it('renders the previous month', () => {
    render(<Calendar {...requiredProps} />);
    userEvent.click(screen.getByTitle('Change calendar to June 2020'));
    expect(screen.getByLabelText('May 31')).toHaveClass('not-current-date');
    expect(screen.getByLabelText('June 1')).toHaveClass('date');
    expect(screen.getByLabelText('July 1')).toHaveClass('not-current-date');
    expect(screen.getByLabelText('July 11')).toHaveClass('not-current-date');
    expect(document.body).toMatchSnapshot();
  });

  it('renders the previous year', () => {
    render(<Calendar {...requiredProps} />);
    userEvent.click(screen.getByTitle('Change calendar to June 2020'));
    userEvent.click(screen.getByTitle('Change calendar to May 2020'));
    userEvent.click(screen.getByTitle('Change calendar to April 2020'));
    userEvent.click(screen.getByTitle('Change calendar to March 2020'));
    userEvent.click(screen.getByTitle('Change calendar to February 2020'));
    userEvent.click(screen.getByTitle('Change calendar to January 2020'));
    userEvent.click(screen.getByTitle('Change calendar to December 2019'));
    userEvent.click(screen.getByTitle('Change calendar to November 2019'));
    userEvent.click(screen.getByTitle('Change calendar to October 2019'));
    userEvent.click(screen.getByTitle('Change calendar to September 2019'));
    userEvent.click(screen.getByTitle('Change calendar to August 2019'));
    userEvent.click(screen.getByTitle('Change calendar to July 2019'));
    expect(screen.getByLabelText('June 30')).toHaveClass('not-current-date');
    expect(screen.getByLabelText('July 30')).toHaveClass('date');
    expect(screen.getByLabelText('July 1')).toHaveClass('date');
    expect(screen.getByLabelText('August 1')).toHaveClass('not-current-date');
    expect(document.body).toMatchSnapshot();
  });

  describe('year view', () => {
    it('renders 5 years back and 20 years forward and opens/closes on click, space, and enter', async () => {
      render(<Calendar {...requiredProps} />);

      // click
      userEvent.click(screen.getByText('July 2020'));
      expect(screen.getByText('2015')).toBeInTheDocument();
      expect(screen.getByText('2040')).toBeInTheDocument();
      userEvent.click(screen.getByText('July 2020'));
      expect(screen.queryByText('2015')).not.toBeInTheDocument();
      expect(screen.queryByText('2040')).not.toBeInTheDocument();

      // pressing enter fires click event on a button element

      // space
      fireEvent.keyDown(screen.getByText('July 2020'), { key: 'Space', code: 'Space' });
      expect(screen.getByText('2015')).toBeInTheDocument();
      expect(screen.getByText('2040')).toBeInTheDocument();
      fireEvent.keyDown(screen.getByText('July 2020'), { key: 'Space', code: 'Space' });
      expect(screen.queryByText('2015')).not.toBeInTheDocument();
      expect(screen.queryByText('2040')).not.toBeInTheDocument();
    });

    it('changes the date the year selected', () => {
      render(<Calendar {...requiredProps} />);
      userEvent.click(screen.getByText('July 2020'));
      userEvent.click(screen.getByText('2022'));
      expect(screen.getByText('July 2022')).toBeInTheDocument();
    });
  });

  describe('accessibility', () => {
    it('does not steal focus on mount', () => {
      render(<Calendar {...requiredProps} />);
      expect(document.body).toHaveFocus();
    });

    describe('when a date is focused', () => {
      it('selects the active date on Enter', () => {
        renderAndExpectFocusedCalendar();
        expect(screen.getByLabelText('July 29')).toHaveAttribute('aria-selected', 'false');
        fireEvent.keyDown(screen.getByLabelText('July 29'), { key: 'Enter' });
        expect(screen.getByLabelText('July 29')).toHaveAttribute('aria-selected', 'true');
      });

      it('selects the active date on Space', () => {
        renderAndExpectFocusedCalendar();
        expect(screen.getByLabelText('July 29')).toHaveAttribute('aria-selected', 'false');
        fireEvent.keyDown(screen.getByLabelText('July 29'), { key: 'Space' });
        expect(screen.getByLabelText('July 29')).toHaveAttribute('aria-selected', 'true');
      });

      it('moves the focus to the previous date on LeftArrow', () => {
        renderAndExpectFocusedCalendar();
        fireEvent.keyDown(screen.getByRole('grid'), { key: 'ArrowLeft', code: 'ArrowLeft' });
        expect(screen.getByLabelText('July 28')).toHaveFocus();
      });

      it('moves the focus to the next date on RightArrow', () => {
        renderAndExpectFocusedCalendar();
        fireEvent.keyDown(screen.getByRole('grid'), { key: 'ArrowRight', code: 'ArrowRight' });
        expect(screen.getByLabelText('July 30')).toHaveFocus();
      });

      it('moves the focus to the previous week on UpArrow', () => {
        renderAndExpectFocusedCalendar();
        fireEvent.keyDown(screen.getByRole('grid'), { key: 'ArrowUp', code: 'ArrowUp' });
        expect(screen.getByLabelText('July 22')).toHaveFocus();
      });

      it('moves the focus to the next week on DownArrow', () => {
        renderAndExpectFocusedCalendar();
        fireEvent.keyDown(screen.getByRole('grid'), { key: 'ArrowDown', code: 'ArrowDown' });
        expect(screen.getByLabelText('August 5')).toHaveFocus();
      });

      it('moves the focus to the beginning of the week on Home', () => {
        renderAndExpectFocusedCalendar();
        fireEvent.keyDown(screen.getByRole('grid'), { key: 'Home', code: 'Home' });
        expect(screen.getByLabelText('July 26')).toHaveFocus();
      });

      it('moves the focus to the end of the week on End', () => {
        renderAndExpectFocusedCalendar();
        fireEvent.keyDown(screen.getByRole('grid'), { key: 'End', code: 'End' });
        expect(screen.getByLabelText('August 1')).toHaveFocus();
      });

      it('changes the calendar to the previous month on PageUp', () => {
        renderAndExpectFocusedCalendar();
        fireEvent.keyDown(screen.getByRole('grid'), { key: 'PageUp', code: 'PageUp' });
        expect(screen.getByLabelText('June 29')).toHaveFocus();
      });

      it('changes the calendar to the next month on PageDown', () => {
        renderAndExpectFocusedCalendar();
        fireEvent.keyDown(screen.getByRole('grid'), { key: 'PageDown', code: 'PageDown' });
        expect(screen.getByLabelText('August 29')).toHaveFocus();
      });

      xit('changes the calendar to the previous year on Shift+PageUp', () => {
        // We need a way to trigger page up and shift at the same time
        // renderAndExpectFocusedCalendar();
        // fireEvent.keyDown(screen.getByRole('grid'), { key: 'PageUp', code: 'PageUp', meta: '{shift}' });
        // expect(screen.getByRole('gridcell', { name: 'July 29' })).toHaveFocus();
        // check the year
      });

      xit('changes the calendar to the next year on Shift+PageDown', () => {
        // We need a way to trigger page down and shift at the same time
        // renderAndExpectFocusedCalendar();
        // fireEvent.keyDown(screen.getByRole('grid'), { key: 'PageDown', code: 'PageDown', meta: '{shift}' });
        // expect(screen.getByRole('gridcell', { name: 'July 29' })).toHaveFocus();
        // check the year
      });
    });

    it('selects a date on click', () => {
      render(<Calendar {...requiredProps} />);
      expect(screen.getByLabelText('July 28')).toHaveAttribute('aria-selected', 'false');
      userEvent.click(screen.getByLabelText('July 28'));
      expect(screen.getByLabelText('July 28')).toHaveAttribute('aria-selected', 'true');
    });
  });

  describe('previous month button', () => {
    it('displays the previous month when clicked and when enter is pressed', () => {
      render(<Calendar {...requiredProps} />);
      userEvent.click(screen.getByTitle('Change calendar to June 2020'));
      expect(screen.getByText('June 2020')).toBeInTheDocument();

      fireEvent.keyDown(screen.getByTitle('Change calendar to May 2020'), { key: 'Enter' });
      expect(screen.getByText('May 2020')).toBeInTheDocument();
    });
  });

  describe('next month button', () => {
    it('displays the next month when clicked and when enter is pressed', () => {
      render(<Calendar {...requiredProps} />);
      userEvent.click(screen.getByTitle('Change calendar to August 2020'));
      expect(screen.getByText('August 2020')).toBeInTheDocument();

      fireEvent.keyDown(screen.getByTitle('Change calendar to September 2020'), { key: 'Enter' });
      expect(screen.getByText('September 2020')).toBeInTheDocument();
    });
  });

  describe('value props API', () => {
    it('can be set', () => {
      expect(render(<Calendar {...requiredProps} value="2012-02-28" />));
      expect(screen.getByText('February 2012')).toBeInTheDocument();
      expect(screen.getByLabelText('February 28')).toHaveAttribute('aria-selected', 'true');
    });
  });
});
