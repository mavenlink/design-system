import React from 'react';
import renderer from 'react-test-renderer';
import { render, screen } from '@testing-library/react';
import SectionRow from './section-row.jsx';

describe('Section Row', () => {
  it('renders a section-row component', () => {
    const tree = renderer
      .create((
        <SectionRow />
      )).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('can have child elements', () => {
    render(<SectionRow><span>Test Label</span></SectionRow>);
    expect(screen.getByText('Test Label').tagName).toEqual('SPAN');
  });
});
