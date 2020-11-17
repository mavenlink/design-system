import React from 'react';
import { render, screen } from '@testing-library/react';
import SectionRow from './section-row.jsx';

describe('Section Row', () => {
  it('renders a section-row component', () => {
    render(<SectionRow />);
    expect(document.body).toMatchSnapshot();
  });

  it('can have child elements', () => {
    render(<SectionRow><span>Test Label</span></SectionRow>);
    expect(screen.getByText('Test Label').tagName).toEqual('SPAN');
  });
});
