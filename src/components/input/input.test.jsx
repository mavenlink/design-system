import React from 'react';
import {
  fireEvent,
  render,
  screen,
} from '@testing-library/react';
import Input from './input.jsx';

describe('Input', () => {
  const requiredProps = {
    id: 'foo',
    label: 'the label',
  };

  it('has defaults', () => {
    render(<Input {...requiredProps} />);
    expect(document.body).toMatchSnapshot();
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

  describe('disabled API', () => {
    it('sets the disabled attribute', () => {
      render(<Input {...requiredProps} disabled />);
      expect(screen.getByLabelText('the label')).toBeDisabled();
    });
  });

  describe('id API', () => {
    it('sets the ID', () => {
      render(<Input {...requiredProps} id="test-id" />);
      expect(screen.getByLabelText('the label')).toHaveAttribute('id', 'test-id');
    });
  });

  describe('invalid API', () => {
    it('sets an invalid class', () => {
      render(<Input {...requiredProps} invalid />);
      expect(screen.getByLabelText('the label')).toHaveClass('invalid-input');
    });

    it('inserts an invalid icon', () => {
      render(<Input {...requiredProps} invalid />);
      expect(screen.getByRole('img')).toHaveClass('invalid-icon');
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
    it('sets the required attribute', () => {
      render(<Input {...requiredProps} required />);
      expect(screen.getByLabelText('the label')).toBeRequired();
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
