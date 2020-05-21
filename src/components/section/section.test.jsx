import React from 'react';
import renderer from 'react-test-renderer';
import { render, screen } from '@testing-library/react';
import Section from './section.jsx';

describe('Section', () => {
  it('renders a section component', () => {
    const tree = renderer
      .create((
        <Section title="Test Title" />
      )).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('uses a title', () => {
    render(<Section title="Test Title" />);
    expect(screen.getByText('Test Title').tagName).toEqual('H2');
  });

  it('can have a description', () => {
    render(<Section title="Test Title" description="This is a test description." />);
    expect(screen.getByText('This is a test description.').tagName).toEqual('P');
  });

  it('can have child elements', () => {
    render(<Section title="Test Title" ><span>Test Label</span></Section>);
    expect(screen.getByText('Test Label').tagName).toEqual('SPAN');
  });
});
