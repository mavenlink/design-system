import React from 'react';
import {
  render,
  screen,
} from '@testing-library/react';
import Calendar from './calendar.jsx';

describe('<Calendar />', () => {
  const requiredProps = {
  };

  it('has defaults', () => {
    jest.spyOn(Date, 'now').mockImplementation(() => 1596062788778) // July 29, 2020
    expect(render(<Calendar {...requiredProps} />)).toMatchSnapshot();
  });

  describe('value props API', () => {
    it('can be set', () => {
      expect(render(<Calendar {...requiredProps} value="2012-02-28" />));
      expect(screen.getByText('February 2012')).toBeInTheDocument();
    });
  });
});
