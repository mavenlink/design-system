import React from 'react';
import { render, screen } from '@testing-library/react';
import PageHeader from './page-header.jsx';

describe('PageHeader', () => {
  const requiredProps = {
    title: 'Title',
  };

  it('has defaults', () => {
    render(<PageHeader {...requiredProps} />);
    expect(document.body).toMatchSnapshot();
  });

  it('has a title', () => {
    render(<PageHeader {...requiredProps} title="Another title" />);
    expect(screen.getByText('Another title').tagName).toEqual('H1');
  });

  it('has a description', () => {
    render(<PageHeader {...requiredProps} description="I am a description" />);
    expect(screen.getByText('I am a description').tagName).toEqual('P');
  });

  it('has a className API', () => {
    render(<PageHeader {...requiredProps} className="test-class" />);
    expect(screen.getByText('Title').parentElement).toHaveClass('test-class');
  });
});
