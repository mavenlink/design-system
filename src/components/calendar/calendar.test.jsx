import React from 'react';
import {
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
    userEvent.click(screen.getByText('Prev'));
    expect(screen.getByText('31')).toHaveClass('not-current-date');
    expect(screen.getAllByText('1')[0]).toHaveClass('date');
    expect(screen.getAllByText('1')[1]).toHaveClass('not-current-date');
    expect(document.body).toMatchSnapshot();
  });

  it('renders the previous year', () => {
    render(<Calendar {...requiredProps} />);
    userEvent.click(screen.getByText('Prev'));
    userEvent.click(screen.getByText('Prev'));
    userEvent.click(screen.getByText('Prev'));
    userEvent.click(screen.getByText('Prev'));
    userEvent.click(screen.getByText('Prev'));
    userEvent.click(screen.getByText('Prev'));
    userEvent.click(screen.getByText('Prev'));
    userEvent.click(screen.getByText('Prev'));
    userEvent.click(screen.getByText('Prev'));
    userEvent.click(screen.getByText('Prev'));
    userEvent.click(screen.getByText('Prev'));
    userEvent.click(screen.getByText('Prev'));
    expect(screen.getAllByText('30')[0]).toHaveClass('not-current-date');
    expect(screen.getAllByText('30')[1]).toHaveClass('date');
    expect(screen.getAllByText('1')[0]).toHaveClass('date');
    expect(screen.getAllByText('1')[1]).toHaveClass('not-current-date');
    expect(document.body).toMatchSnapshot();
  });

  describe('previous month button', () => {
    it('displays the previous month', () => {
      render(<Calendar {...requiredProps} />);
      userEvent.click(screen.getByText('Prev'));
      expect(screen.getByText('June 2020')).toBeInTheDocument();
    });
  });

  describe('next month button', () => {
    it('displays the next month', () => {
      render(<Calendar {...requiredProps} />);
      userEvent.click(screen.getByText('Next'));
      expect(screen.getByText('August 2020')).toBeInTheDocument();
    });
  });

  describe('value props API', () => {
    it('can be set', () => {
      expect(render(<Calendar {...requiredProps} value="2012-02-28" />));
      expect(screen.getByText('February 2012')).toBeInTheDocument();
      expect(screen.getByText('28')).toHaveClass('highlighted-date');
    });
  });
});
