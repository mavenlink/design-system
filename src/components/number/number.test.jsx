import React, { createRef } from 'react';
import {
  render,
  screen,
  fireEvent,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Number from './number.jsx';

describe('Number', () => {
  const requiredProps = {
    id: 'test-component',
    label: 'Test Component',
  };

  it('has defaults', () => {
    const ref = createRef();
    render(<Number {...requiredProps} ref={ref} />);
    expect(document.body).toMatchSnapshot();
    expect(ref.current).toMatchSnapshot();
  });

  describe('disabled API', () => {
    it('permits disabling', () => {
      render(<Number {...requiredProps} disabled />);
      expect(screen.getByLabelText('Test Component')).toBeDisabled();
    });
  });

  describe('label API', () => {
    it('presents a label', () => {
      render(<Number {...requiredProps} label="Hey a label" />);
      expect(screen.getByLabelText('Hey a label')).toBeInTheDocument();
    });
  });

  describe('ref API', () => {
    it('responds with validity from the DOM', () => {
      const ref = createRef();
      render(<Number {...requiredProps} value={1.01} ref={ref} />);
      expect(ref.current.validity).toBe(screen.getByLabelText('Test Component').validity);
    });

    it('indicates if it is dirty or not', () => {
      const ref = createRef();
      render(<Number {...requiredProps} value={1} ref={ref} />);
      expect(ref.current.dirty).toBe(false);
      userEvent.type(screen.getByLabelText('Test Component'), '1');
      expect(ref.current.dirty).toBe(true);
    });

    it('permits focusing', () => {
      const ref = createRef();
      render(<Number {...requiredProps} ref={ref} />);
      expect(document.activeElement).not.toBe(screen.getByLabelText('Test Component'));
      ref.current.focus();
      expect(document.activeElement).toBe(screen.getByLabelText('Test Component'));
    });

    it('responds with the name', () => {
      const ref = createRef();
      render(<Number {...requiredProps} name="foobar" ref={ref} />);
      expect(ref.current.name).toEqual('foobar');
    });

    it('responds with the value', () => {
      const ref = createRef();
      render(<Number {...requiredProps} value={101} ref={ref} />);
      expect(ref.current.value).toEqual(101);
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

  describe('step API', () => {
    it('sets the step', () => {
      render(<Number {...requiredProps} step={0.1} />);
      expect(screen.getByLabelText('Test Component')).toHaveAttribute('step', '0.1');
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
      fireEvent.focus(screen.getByLabelText('Test Component'));
      fireEvent.blur(screen.getByLabelText('Test Component'));
      expect(screen.getByLabelText('Test Component')).toHaveDescription('Constraints not satisfied');
    });

    it('can be unset', () => {
      render(<Number {...requiredProps} required={false} />);
      expect(screen.getByLabelText('Test Component')).not.toBeRequired();
      expect(screen.getByLabelText('Test Component')).toBeValid();
      fireEvent.focus(screen.getByLabelText('Test Component'));
      fireEvent.blur(screen.getByLabelText('Test Component'));
      expect(screen.getByLabelText('Test Component')).not.toHaveDescription('Constraints not satisfied');
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

  describe('value API', () => {
    it('sets the value', () => {
      render(<Number {...requiredProps} value={12} />);
      expect(screen.getByLabelText('Test Component')).toHaveValue(12);
    });

    it('updates the value', () => {
      const { rerender } = render(<Number {...requiredProps} value={12} />);
      rerender(<Number {...requiredProps} value={21} />);
      expect(screen.getByLabelText('Test Component')).toHaveValue(21);
    });

    it('set on the ref', () => {
      const ref = createRef();
      render(<Number {...requiredProps} ref={ref} value={10101} />);
      expect(ref.current.value).toBe(10101);
      userEvent.type(screen.getByLabelText('Test Component'), '2');
      expect(ref.current.value).toBe(101012);
    });

    it('indicates if it is invalid on mount', () => {
      render(<Number {...requiredProps} value={1.01} />);
      expect(screen.getByLabelText('Test Component')).toBeInvalid();
      expect(screen.getByLabelText('Test Component')).toHaveDescription('Constraints not satisfied');
    });
  });

  describe('validationMessage API', () => {
    it('can be set', () => {
      render(<Number {...requiredProps} validationMessage="unique error" />);
      expect(screen.getByLabelText('Test Component')).toBeInvalid();
      expect(screen.getByLabelText('Test Component')).toHaveDescription('unique error');
      expect(screen.getByRole('img', { name: 'unique error' })).toBeInTheDocument();
    });

    it('can be unset', () => {
      render(<Number {...requiredProps} validationMessage="" />);
      expect(screen.getByLabelText('Test Component')).toBeValid();
      expect(screen.getByLabelText('Test Component')).toHaveDescription('');
    });
  });

  describe('readOnly API', () => {
    it('sets the readOnly attribute', () => {
      render(<Number {...requiredProps} readOnly />);
      expect(screen.getByLabelText('Test Component')).toHaveAttribute('readonly');
    });
  });

  describe('className API', () => {
    it('sets <input> className', () => {
      render(<Number {...requiredProps} className="test-class" />);
      expect(screen.getByLabelText('Test Component')).toHaveClass('test-class');
    });
  });
});
