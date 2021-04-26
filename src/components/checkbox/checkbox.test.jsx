import React, { createRef } from 'react';
import { render, screen } from '@testing-library/react';
import Checkbox from './checkbox.jsx';

describe('Checkbox', () => {
  const name = 'You good?';
  const requiredProps = {
    id: 'fart',
    label: name,
  };

  it('has defaults', () => {
    const ref = createRef();
    render(<Checkbox {...requiredProps} ref={ref} />);
    expect(document.body).toMatchSnapshot();
    expect(ref.current).toMatchSnapshot();
  });

  describe('className API', () => {
    it('sets <input> classname', () => {
      const className = 'kerfuffle';
      render(<Checkbox {...requiredProps} className={className} />);
      expect(screen.getByRole('checkbox', { name })).toHaveClass(className);
    });
  });

  describe('id API', () => {
    it('sets the id', () => {
      render(<Checkbox {...requiredProps} id="hello-mario" />);
      expect(screen.getByRole('checkbox', { name })).toHaveAttribute('id', 'hello-mario');
    });

    it('is set on the ref', () => {
      const ref = createRef();
      render(<Checkbox {...requiredProps} ref={ref} id="hello-mario" />);
      expect(ref.current.id).toBe('hello-mario');
    });
  });

  describe('label API', () => {
    it('can be set', () => {
      render(<Checkbox {...requiredProps} label="Unique label" />);
      expect(screen.getByRole('checkbox', { name: 'Unique label' })).toBeInTheDocument();
    });
  });

  describe('name API', () => {
    it('sets the name attribute', () => {
      render(<Checkbox {...requiredProps} name="test-name" />);
      expect(screen.getByRole('checkbox', { name })).toHaveAttribute('name', 'test-name');
    });

    it('is set on the ref', () => {
      const ref = createRef();
      render(<Checkbox {...requiredProps} name="unique-name" ref={ref} />);
      expect(ref.current.name).toBe('unique-name');
    });
  });
});
