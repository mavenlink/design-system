import React, { createRef } from 'react';
import {
  render,
  screen,
  cleanup,
} from '@testing-library/react';
import Number from './number.jsx';
import userEvent from '@testing-library/user-event';

describe('Number', () => {
  const requiredProps = {
    id: 'test-component',
    label: 'Test Component',
  };

  afterEach(cleanup);

  it('has defaults', () => {
    const ref = createRef();
    render(<Number {...requiredProps} ref={ref} />);
    expect(document.body).toMatchSnapshot();
    expect(ref.current).toMatchSnapshot();
  });

  describe('label API', () => {
    it('presents a label', () => {
      render(<Number {...requiredProps} />);
      expect(screen.getByLabelText('Test Component')).toBeInTheDocument();
    });
  });

  describe('name API', () => {
    it('presents the name on the component', () => {
      render(<Number {...requiredProps} name="foo-bar" />);
      expect(screen.getByLabelText('Test Component')).toHaveAttribute('name', 'foo-bar');
    });

    it('exposes the name on the ref', () => {
      const ref = createRef();
      render(<Number {...requiredProps} name="foo-bar" ref={ref} />);
      expect(ref.current.name).toEqual('foo-bar');
    });
  });

  describe('placeholder API', () => {
    it('allows setting placeholder text', () => {
      render(<Number {...requiredProps} placeholder="Hello!" />);
      expect(screen.getByLabelText('Test Component')).toHaveAttribute('placeholder', 'Hello!');
    });
  });

  describe('required API', () => {
    it('can be set', () => {
      render(<Number {...requiredProps} placeholder="Hello!" required />);
      expect(screen.getByLabelText('Test Component')).toBeRequired();
      expect(screen.getByLabelText('Test Component')).toBeInvalid();
    });

    it('can be unset', () => {
      render(<Number {...requiredProps} required={false} />);
      expect(screen.getByLabelText('Test Component')).not.toBeRequired();
      expect(screen.getByLabelText('Test Component')).toBeValid();
    });

    it('is invalid on mount but does not have an error message', () => {
      render(<Number {...requiredProps} required />);
      expect(screen.getByLabelText('Test Component')).toBeInvalid();
      expect(screen.getByLabelText('Test Component')).toHaveDescription('');
    });

    it('is invalid after typing', async () => {
      render(<Number {...requiredProps} required={true} />);
      userEvent.type(screen.getByLabelText('Test Component'), '2');
      expect(screen.getByLabelText('Test Component')).toHaveValue(2);
      expect(screen.getByLabelText('Test Component')).toBeValid();
      expect(screen.getByLabelText('Test Component')).toHaveDescription('');
      userEvent.type(screen.getByLabelText('Test Component'), '{backspace}');
      expect(screen.getByLabelText('Test Component')).toHaveValue(null);
      expect(screen.getByLabelText('Test Component')).toBeInvalid();
      expect(screen.getByLabelText('Test Component')).toHaveDescription('Constraints not satisfied');
    });

    it('is invalid after tabbing through', async () => {
      render(<Number {...requiredProps} required={true} />);
      userEvent.tab();
      expect(document.activeElement).toBe(screen.getByLabelText('Test Component'));
      expect(screen.getByLabelText('Test Component')).toBeInvalid();
      expect(screen.getByLabelText('Test Component')).toHaveDescription('');
      userEvent.tab();
      expect(document.activeElement).not.toBe(screen.getByLabelText('Test Component'));
      expect(screen.getByLabelText('Test Component')).toBeInvalid();
      expect(screen.getByLabelText('Test Component')).toHaveDescription('Constraints not satisfied');
    });
  });
});
