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
        render(<Calendar {...requiredProps} />);
        userEvent.tab();
        userEvent.tab();
        userEvent.tab();
        userEvent.tab();
        expect(screen.getByRole('gridcell', { name: 'July 29' })).toHaveFocus();
        expect(screen.getByRole('gridcell', { name: 'July 29' })).toHaveAttribute('aria-selected', 'false');
        fireEvent.keyDown(screen.getByRole('gridcell', { name: 'July 29' }), { key: 'Enter' });
        expect(screen.getByRole('gridcell', { name: 'July 29' })).toHaveAttribute('aria-selected', 'true');
      });

      it('selects the active date on Space', () => {
        render(<Calendar {...requiredProps} />);
        userEvent.tab();
        userEvent.tab();
        userEvent.tab();
        userEvent.tab();
        expect(screen.getByRole('gridcell', { name: 'July 29' })).toHaveFocus();
        expect(screen.getByRole('gridcell', { name: 'July 29' })).toHaveAttribute('aria-selected', 'false');
        fireEvent.keyDown(screen.getByRole('gridcell', { name: 'July 29' }), { key: 'Space' });
        expect(screen.getByRole('gridcell', { name: 'July 29' })).toHaveAttribute('aria-selected', 'true');
      });

      it('moves the focus to the previous date on LeftArrow', () => {
        render(<Calendar {...requiredProps} />);
      });

      it('moves the focus to the next date on RightArrow', () => {
        render(<Calendar {...requiredProps} />);
      });

      it('moves the focus to the previous week on UpArrow', () => {
        render(<Calendar {...requiredProps} />);
      });

      it('moves the focus to the next week on DownArrow', () => {
        render(<Calendar {...requiredProps} />);
      });

      it('moves the focus to the beginning of the week on Home', () => {
        render(<Calendar {...requiredProps} />);
      });

      it('moves the focus to the end of the week on End', () => {
        render(<Calendar {...requiredProps} />);
      });

      it('changes the calendar to the previous month on PageUp', () => {
        render(<Calendar {...requiredProps} />);
      });

      it('changes the calendar to the next month on PageDown', () => {
        render(<Calendar {...requiredProps} />);
      });

      it('changes the calendar to the previous year on Shift+PageUp', () => {
        render(<Calendar {...requiredProps} />);
      });

      it('changes the calendar to the next year on Shift+PageDown', () => {
        render(<Calendar {...requiredProps} />);
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
