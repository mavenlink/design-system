import React, {
  createRef,
} from 'react';
import {
  fireEvent,
  render,
  screen,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Input from './input.jsx';

describe('Input', () => {
  const requiredProps = {
    id: 'foo',
    label: 'the label',
  };

  it('has defaults', () => {
    const ref = createRef();
    render(<Input {...requiredProps} ref={ref} />);
    expect(document.body).toMatchSnapshot();
    expect(ref.current).toMatchSnapshot();
  });

  describe('className API', () => {
    it('sets <input> className', () => {
      render(<Input {...requiredProps} className="test-class" />);
      expect(screen.getByLabelText('the label')).toHaveClass('test-class');
    });
  });

  describe('cssContainer API', () => {
    it('sets input container className', () => {
      render(<Input {...requiredProps} cssContainer="test-class" />);
      expect(screen.getByLabelText('the label').parentElement.parentElement).toHaveClass('test-class');
    });
  });

  describe('dirty API', () => {
    it('is unset without any changes', () => {
      const ref = createRef();
      render(<Input {...requiredProps} ref={ref} />);
      expect(ref.current.dirty).toBe(false);
    });

    it('is set with any changes', () => {
      const ref = createRef();
      render(<Input {...requiredProps} ref={ref} />);
      userEvent.type(screen.getByLabelText('the label'), 'a');
      expect(ref.current.dirty).toBe(true);
    });

    it('is unset with changes back to initial state', () => {
      const ref = createRef();
      render(<Input {...requiredProps} ref={ref} />);
      userEvent.type(screen.getByLabelText('the label'), 'a');
      userEvent.type(screen.getByLabelText('the label'), '{backspace}');
      expect(ref.current.dirty).toBe(false);
    });

    it('is unset with changes and new value prop', () => {
      const ref = createRef();
      const { rerender } = render(<Input {...requiredProps} ref={ref} />);
      userEvent.type(screen.getByLabelText('the label'), 'a');
      rerender(<Input {...requiredProps} ref={ref} value="a" />);
      expect(ref.current.dirty).toBe(false);
    });
  });

  describe('id API', () => {
    it('sets the ID', () => {
      render(<Input {...requiredProps} id="test-id" />);
      expect(screen.getByLabelText('the label')).toHaveAttribute('id', 'test-id');
    });

    it('is set on the ref', () => {
      const ref = createRef();
      render(<Input {...requiredProps} id="unique-id" ref={ref} />);
      expect(ref.current.id).toBe('unique-id');
    });
  });

  describe('maxLength API', () => {
    it('sets the maxLength attribute', () => {
      render(<Input {...requiredProps} maxLength={100} />);
      expect(screen.getByLabelText('the label')).toHaveAttribute('maxlength', '100');
    });
  });

  describe('name API', () => {
    it('sets the name attribute', () => {
      render(<Input {...requiredProps} name="test-name" />);
      expect(screen.getByLabelText('the label')).toHaveAttribute('name', 'test-name');
    });

    it('is set on the ref', () => {
      const ref = createRef();
      render(<Input {...requiredProps} name="unique-name" ref={ref} />);
      expect(ref.current.name).toBe('unique-name');
    });
  });

  describe('onBlur API', () => {
    it('sets the onblur handler', () => {
      const onBlurSpy = jest.fn();
      render(<Input {...requiredProps} onBlur={onBlurSpy} />);
      fireEvent.blur(screen.getByLabelText('the label'));
      expect(onBlurSpy.mock.calls.length).toEqual(1);
    });
  });

  describe('onChange API', () => {
    it('sets the onchange handler', () => {
      const onChangeSpy = jest.fn();
      render(<Input {...requiredProps} onChange={onChangeSpy} />);
      fireEvent.change(screen.getByLabelText('the label'), { target: { value: 'new value' } });
      expect(onChangeSpy.mock.calls.length).toEqual(1);
    });
  });

  describe('onFocus API', () => {
    it('sets the onFocus handler', () => {
      const onFocusSpy = jest.fn();
      render(<Input {...requiredProps} onFocus={onFocusSpy} />);
      fireEvent.focus(screen.getByLabelText('the label'));
      expect(onFocusSpy.mock.calls.length).toEqual(1);
    });
  });

  describe('onInput API', () => {
    it('sets the onInput handler', () => {
      const onInputSpy = jest.fn();
      render(<Input {...requiredProps} onInput={onInputSpy} />);
      fireEvent.input(screen.getByLabelText('the label'));
      expect(onInputSpy.mock.calls.length).toEqual(1);
    });
  });

  describe('onKeyDown API', () => {
    it('sets the onKeyDown handler', () => {
      const onKeyDownSpy = jest.fn();
      render(<Input {...requiredProps} onKeyDown={onKeyDownSpy} />);
      fireEvent.keyDown(screen.getByLabelText('the label'));
      expect(onKeyDownSpy.mock.calls.length).toEqual(1);
    });
  });

  describe('placeholder API', () => {
    it('sets the placeholder attribute', () => {
      render(<Input {...requiredProps} placeholder="test-placeholder" />);
      expect(screen.getByLabelText('the label')).toHaveAttribute('placeholder', 'test-placeholder');
    });
  });

  describe('readOnly API', () => {
    it('sets the readOnly attribute', () => {
      render(<Input {...requiredProps} readOnly />);
      expect(screen.getByLabelText('the label')).toHaveAttribute('readonly');
    });
  });

  describe('required API', () => {
    it('can be set', () => {
      render(<Input {...requiredProps} required={true} />);
      expect(screen.getByLabelText('the label')).toBeRequired();
      expect(screen.getByLabelText('the label')).toBeInvalid();
    });

    it('can be unset', () => {
      render(<Input {...requiredProps} required={false} />);
      expect(screen.getByLabelText('the label')).not.toBeRequired();
      expect(screen.getByLabelText('the label')).toBeValid();
    });

    it('is invalid on mount but does not have an error message', () => {
      render(<Input {...requiredProps} required={true} />);
      expect(screen.getByLabelText('the label')).toBeInvalid();
      expect(screen.getByLabelText('the label')).toHaveDescription('');
    });

    it('is invalid after typing', async () => {
      render(<Input {...requiredProps} required={true} />);
      userEvent.type(screen.getByLabelText('the label'), 'a');
      expect(screen.getByLabelText('the label')).toHaveValue('a');
      expect(screen.getByLabelText('the label')).toBeValid();
      expect(screen.getByLabelText('the label')).toHaveDescription('');
      userEvent.type(screen.getByLabelText('the label'), '{backspace}');
      expect(screen.getByLabelText('the label')).toHaveValue('');
      expect(screen.getByLabelText('the label')).toBeInvalid();
      expect(screen.getByLabelText('the label')).toHaveDescription('Constraints not satisfied');
    });

    it('is invalid after tabbing through', async () => {
      render(<Input {...requiredProps} required={true} />);
      userEvent.tab();
      expect(document.activeElement).toBe(screen.getByLabelText('the label'));
      expect(screen.getByLabelText('the label')).toBeInvalid();
      expect(screen.getByLabelText('the label')).toHaveDescription('');
      userEvent.tab();
      expect(document.activeElement).not.toBe(screen.getByLabelText('the label'));
      expect(screen.getByLabelText('the label')).toBeInvalid();
      expect(screen.getByLabelText('the label')).toHaveDescription('Constraints not satisfied');
    });
  });

  describe('type API', () => {
    it('is set to "email"', () => {
      render(<Input {...requiredProps} type="email" />);
      expect(screen.getByLabelText('the label')).toHaveAttribute('type', 'email');
    });

    it('is set to "password"', () => {
      render(<Input {...requiredProps} type="password" />);
      expect(screen.getByLabelText('the label')).toHaveAttribute('type', 'password');
    });

    it('is be set to "text"', () => {
      render(<Input {...requiredProps} type="text" />);
      expect(screen.getByLabelText('the label')).toHaveAttribute('type', 'text');
    });
  });

  describe('validationMessage API', () => {
    it('can be set', () => {
      render(<Input {...requiredProps} validationMessage="unique error" />);
      expect(screen.getByLabelText('the label')).toBeInvalid();
      expect(screen.getByLabelText('the label')).toHaveDescription('unique error');
      expect(screen.getByRole('img', { name: 'unique error' })).toBeInTheDocument();
    });

    it('can be unset', () => {
      render(<Input {...requiredProps} validationMessage="" />);
      expect(screen.getByLabelText('the label')).toBeValid();
      expect(screen.getByLabelText('the label')).toHaveDescription('');
    });
  });

  describe('value API', () => {
    it('sets the value', () => {
      render(<Input {...requiredProps} value="test-value" />);
      expect(screen.getByLabelText('the label')).toHaveValue('test-value');
    });

    it('updates the value', () => {
      const { rerender } = render(<Input {...requiredProps} value="test value" />);
      rerender(<Input {...requiredProps} value="another value" />);
      expect(screen.getByLabelText('the label')).toHaveValue('another value');
    });

    it('set on the ref', () => {
      const ref = createRef();
      render(<Input {...requiredProps} ref={ref} value="unique value" />);
      expect(ref.current.value).toBe('unique value');
      userEvent.type(screen.getByLabelText('the label'), '!');
      expect(ref.current.value).toBe('unique value!');
    });
  });

  describe('ref API', () => {
    it('can be set', () => {
      const ref = React.createRef();
      render(<Input {...requiredProps} ref={ref} value="test value" />);
      expect(ref.current.value).toEqual('test value');
    });
  });

  describe('autoFocus API', () => {
    it('sets the autoFocus attribute', () => {
      render(<Input {...requiredProps} autoFocus />);
      expect(screen.getByLabelText('the label')).toHaveFocus();
    });
  });
});
