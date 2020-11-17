import React from 'react';
import { render, screen } from '@testing-library/react';
import Section from './section.jsx';

describe('Section', () => {
  const requiredProps = {
    title: 'Test Title',
  };

  it('renders a section component', () => {
    render(<Section title="Test Title" />);
    expect(document.body).toMatchSnapshot();
  });

  it('uses a title', () => {
    render(<Section {...requiredProps} />);
    expect(screen.getByText('Test Title').tagName).toEqual('H2');
  });

  it('can have a description', () => {
    render(<Section {...requiredProps} description="This is a test description." />);
    expect(screen.getByText('This is a test description.').tagName).toEqual('P');
  });

  it('can have child elements', () => {
    render(<Section {...requiredProps} ><span>Test Label</span></Section>);
    expect(screen.getByText('Test Label').tagName).toEqual('SPAN');
  });
});
