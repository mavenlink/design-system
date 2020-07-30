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

  it('has defaults', () => {
    jest.spyOn(Date, 'now').mockImplementation(() => 1596062788778); // July 29, 2020
    render(<Calendar {...requiredProps} />);
    expect(document.body).toMatchSnapshot();
  });

  describe('previous month button', () => {
    it('displays the previous month', () => {
      jest.spyOn(Date, 'now').mockImplementation(() => 1596062788778); // July 29, 2020
      render(<Calendar {...requiredProps} />);
      userEvent.click(screen.getByText('Prev'));
      expect(screen.getByText('June 2020')).toBeInTheDocument();
    });
  });

  describe('next month button', () => {
    it('displays the next month', () => {
      jest.spyOn(Date, 'now').mockImplementation(() => 1596062788778); // July 29, 2020
      render(<Calendar {...requiredProps} />);
      userEvent.click(screen.getByText('Next'));
      expect(screen.getByText('August 2020')).toBeInTheDocument();
    });
  });

  describe('value props API', () => {
    it('can be set', () => {
      expect(render(<Calendar {...requiredProps} value="2012-02-28" />));
      expect(screen.getByText('February 2012')).toBeInTheDocument();
    });
  });
});
