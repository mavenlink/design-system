import React from 'react';
import { render, screen } from '@testing-library/react';
import Section from './section.jsx';

describe('Section', () => {
  it('renders a section component', () => {
    render(<Section />);
    expect(document.body).toMatchSnapshot();
  });

  it('can have a title', () => {
    render(<Section title="Test Title" />);
    expect(screen.getByText('Test Title').tagName).toEqual('H2');
  });

  it('can have a description', () => {
    render(<Section description="This is a test description." />);
    expect(screen.getByText('This is a test description.').tagName).toEqual('P');
  });

  it('can have child elements', () => {
    render(<Section><span>Test Label</span></Section>);
    expect(screen.getByText('Test Label').tagName).toEqual('SPAN');
  });
});
