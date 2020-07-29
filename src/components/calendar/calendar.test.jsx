import React from 'react';
import {
  render,
} from '@testing-library/react';
import Calendar from './calendar.jsx';

describe('<Calendar />', () => {
  it('has defaults', () => {
    expect(render(<Calendar />)).toMatchSnapshot();
  });
});
