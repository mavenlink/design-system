import React from 'react';
import {
  render,
  screen,
} from '@testing-library/react';
import calendarSvg from '../../svgs/calendar.svg';
import Icon from '../icon/icon.jsx';
import FormControlIcons from './form-control-icons.jsx';

describe('<FormControlIcons>', () => {
  it('has defaults', () => {
    render(<FormControlIcons />);
    expect(document.body).toMatchSnapshot();
  });

  it('renders children', () => {
    render(<FormControlIcons><Icon icon={calendarSvg} label="kerfuffle" /></FormControlIcons>);
    expect(screen.getByTitle('kerfuffle')).toBeInTheDocument();
  });

  it('sets className', () => {
    const { container } = render(<FormControlIcons className="test-class" />);
    expect(container.querySelector('.test-class')).toBeInTheDocument();
  });

  it('shows caution icon if we have a validationMessage', () => {
    render(<FormControlIcons validationMessage="This is an error" />);
    expect(screen.getByTitle('This is an error')).toBeInTheDocument();
  });
});
