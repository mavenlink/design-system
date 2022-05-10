import React, { createRef } from 'react';
import { render, screen } from '@testing-library/react';
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

  describe('label API', () => {
    it('presents a label', () => {
      render(<Number {...requiredProps} label="Hey a label" />);
      expect(screen.getByLabelText('Hey a label')).toBeInTheDocument();
    });
  });

  describe('id API', () => {
    it('sets the ID', () => {
      render(<Number {...requiredProps} id="what-up-son" />);
      expect(screen.getByLabelText('Test Component')).toHaveAttribute('id', 'what-up-son');
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

    it('is not dirty on render', () => {
      const ref = createRef();
      render(<Number {...requiredProps} ref={ref} />);
      expect(ref.current.dirty).toEqual(false);
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

    it('responds with the undefined as value when not defined', () => {
      const ref = createRef();
      render(<Number {...requiredProps} ref={ref} />);
      expect(ref.current.value).toEqual(undefined);
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

    it('parses the value API with decimals', () => {
      const ref = createRef();
      render(<Number {...requiredProps} ref={ref} step={0.01} value={10.12} />);
      expect(ref.current.value).toEqual(10.12);
    });
  });

  describe('onBlur API', () => {
    it('can set an onBlur event', () => {
      const onBlur = jest.fn();
      render(<Number {...requiredProps} onBlur={onBlur} />);
      userEvent.click(screen.getByLabelText('Test Component'));
      userEvent.tab();
      expect(onBlur.mock.calls.length).toEqual(1);
    });
  });

  describe('onChange API', () => {
    it('can set an onChange event, that is called with value as a number, name, and id', () => {
      const onChange = jest.fn();
      render(<Number {...requiredProps} onChange={onChange} />);
      userEvent.type(screen.getByLabelText('Test Component'), '1');
      expect(onChange.mock.calls.length).toEqual(1);
      expect(onChange).toBeCalledWith(expect.objectContaining({
        target: expect.objectContaining({
          value: 1,
          name: requiredProps.name,
          id: requiredProps.id,
        }),
      }));
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
      render(<Number {...requiredProps} required />);
      expect(screen.getByLabelText('Test Component')).toBeRequired();
      expect(screen.getByLabelText('Test Component')).toBeInvalid();
      userEvent.click(screen.getByLabelText('Test Component'));
      userEvent.tab();
      expect(screen.getByLabelText('Test Component')).toHaveAccessibleDescription('Constraints not satisfied');
    });

    it('can be unset', () => {
      render(<Number {...requiredProps} required={false} />);
      expect(screen.getByLabelText('Test Component')).not.toBeRequired();
      expect(screen.getByLabelText('Test Component')).toBeValid();
      userEvent.click(screen.getByLabelText('Test Component'));
      userEvent.tab();
      expect(screen.getByLabelText('Test Component')).not.toHaveAccessibleDescription('Constraints not satisfied');
    });

    it('is invalid on mount but does not have an error message', () => {
      render(<Number {...requiredProps} required />);
      expect(screen.getByLabelText('Test Component')).toBeInvalid();
      expect(screen.getByLabelText('Test Component')).toHaveAccessibleDescription('');
    });

    it('is invalid after tabbing through', async () => {
      render(<Number {...requiredProps} required={true} />);
      userEvent.tab();
      expect(document.activeElement).toBe(screen.getByLabelText('Test Component'));
      expect(screen.getByLabelText('Test Component')).toBeInvalid();
      expect(screen.getByLabelText('Test Component')).toHaveAccessibleDescription('');
      userEvent.tab();
      expect(document.activeElement).not.toBe(screen.getByLabelText('Test Component'));
      expect(screen.getByLabelText('Test Component')).toBeInvalid();
      expect(screen.getByLabelText('Test Component')).toHaveAccessibleDescription('Constraints not satisfied');
    });
  });

  describe('tooltip API', () => {
    const tooltip = 'I am an input, short and stout.';

    it('applies a description to the input when the help icon is hovered', () => {
      render(<Number {...requiredProps} tooltip={tooltip} />);
      userEvent.hover(screen.getByRole('img', { name: 'More information' }));
      expect(screen.getByLabelText(requiredProps.label)).toHaveAccessibleDescription(tooltip);
    });

    it('removes the description to the input when the help icon is unhovered', () => {
      render(<Number {...requiredProps} tooltip={tooltip} />);
      userEvent.hover(screen.getByRole('img', { name: 'More information' }));
      userEvent.unhover(screen.getByRole('img', { name: 'More information' }));
      expect(screen.getByLabelText(requiredProps.label)).toHaveAccessibleDescription('');
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

    it('it is invalid on mount (but without an validation message)', () => {
      render(<Number {...requiredProps} value={1.01} />);
      expect(screen.getByLabelText('Test Component')).toBeInvalid();
      expect(screen.getByLabelText('Test Component')).toHaveAccessibleDescription('');
    });
  });

  describe('validationMessage API', () => {
    it('can be set', () => {
      render(<Number {...requiredProps} validationMessage="unique error" />);
      expect(screen.getByLabelText('Test Component')).toBeInvalid();
      expect(screen.getByLabelText('Test Component')).toHaveAccessibleDescription('unique error');
      expect(screen.getByRole('img', { name: 'unique error' })).toBeInTheDocument();
    });

    it('can be unset', () => {
      render(<Number {...requiredProps} validationMessage="" />);
      expect(screen.getByLabelText('Test Component')).toBeValid();
      expect(screen.getByLabelText('Test Component')).toHaveAccessibleDescription('');
    });
  });

  describe('readOnly API', () => {
    it('sets the readOnly attribute', () => {
      render(<Number {...requiredProps} readOnly />);
      expect(screen.getByLabelText('Test Component')).toHaveAttribute('readonly');
    });

    it('can be unset', () => {
      render(<Number {...requiredProps} readOnly={false} />);
      expect(screen.getByLabelText('Test Component')).not.toHaveAttribute('readonly');
    });
  });

  describe('className API', () => {
    it('sets <input> className', () => {
      render(<Number {...requiredProps} className="test-class" />);
      expect(screen.getByLabelText('Test Component')).toHaveClass('test-class');
    });
  });
});
