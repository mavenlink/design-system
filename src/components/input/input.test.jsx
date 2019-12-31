import React from 'react';
import renderer from 'react-test-renderer';
import { fireEvent, render, screen } from '@testing-library/react';
import Input from './input.jsx';

describe('Input', () => {
  it('has defaults', () => {
    const tree = renderer
      .create((
        <Input
          id="foo"
          label="I am a label for accessibility"
        />
      )).toJSON();
    expect(tree).toMatchSnapshot();
  });

  describe('className API', () => {
    it('sets <input> className', () => {
      render((
        <Input
          id="foo"
          className="test-class"
          label="the label"
          invalid
        />
      ));
      expect(screen.getByLabelText('the label')).toHaveClass('test-class');
    });
  });

  describe('cssContainer API', () => {
    it('sets input container className', () => {
      render((
        <Input
          id="foo"
          cssContainer="test-class"
          label="the label"
          invalid
        />
      ));
      expect(screen.getByLabelText('the label').parentElement).toHaveClass('test-class');
    });
  });

  describe('cssLabel API', () => {
    it('sets <label> className', () => {
      render((
        <Input
          id="foo"
          cssLabel="test-class"
          label="the label"
          invalid
        />
      ));
      expect(screen.getByText('the label')).toHaveClass('test-class');
    });
  });

  describe('disabled API', () => {
    it('sets the disabled attribute', () => {
      render((
        <Input
          id="foo"
          disabled
          label="the label"
        />
      ));
      expect(screen.getByLabelText('the label')).toBeDisabled();
    });
  });

  describe('id API', () => {
    it('sets the ID', () => {
      render((
        <Input
          id="test-id"
          label="the label"
        />
      ));
      expect(screen.getByLabelText('the label')).toHaveAttribute('id', 'test-id');
    });
  });

  describe('invalid API', () => {
    it('sets an invalid class', () => {
      render((
        <Input
          id="foo"
          label="the label"
          invalid
        />
      ));
      expect(screen.getByLabelText('the label')).toHaveClass('invalid-input');
    });

    it('inserts an invalid icon', () => {
      render((
        <Input
          id="foo"
          label="the label"
          invalid
        />
      ));
      expect(screen.getByRole('img')).toHaveClass('invalid-icon');
    });
  });

  describe('maxLength API', () => {
    it('sets the maxLength attribute', () => {
      render((
        <Input
          id="foo"
          label="the label"
          maxLength={100}
        />
      ));
      expect(screen.getByLabelText('the label')).toHaveAttribute('maxlength', '100');
    });
  });

  describe('name API', () => {
    it('sets the name attribute', () => {
      render((
        <Input
          id="foo"
          label="the label"
          name="test-name"
        />
      ));
      expect(screen.getByLabelText('the label')).toHaveAttribute('name', 'test-name');
    });
  });

  describe('onBlur API', () => {
    it('sets the onblur handler', () => {
      const onBlurSpy = jest.fn();
      render((
        <Input
          id="foo"
          label="the label"
          onBlur={onBlurSpy}
        />
      ));
      fireEvent.blur(screen.getByLabelText('the label'));
      expect(onBlurSpy.mock.calls.length).toEqual(1);
    });
  });

  describe('onChange API', () => {
    it('sets the onchange handler', () => {
      const onChangeSpy = jest.fn();
      render((
        <Input
          id="foo"
          label="the label"
          onChange={onChangeSpy}
        />
      ));
      fireEvent.change(screen.getByLabelText('the label'), { target: { value: 'new value' } });
      expect(onChangeSpy.mock.calls.length).toEqual(1);
    });
  });

  describe('onFocus API', () => {
    it('sets the onFocus handler', () => {
      const onFocusSpy = jest.fn();
      render((
        <Input
          id="foo"
          label="the label"
          onFocus={onFocusSpy}
        />
      ));
      fireEvent.focus(screen.getByLabelText('the label'));
      expect(onFocusSpy.mock.calls.length).toEqual(1);
    });
  });

  describe('onInput API', () => {
    it('sets the onInput handler', () => {
      const onInputSpy = jest.fn();
      render((
        <Input
          id="foo"
          label="the label"
          onInput={onInputSpy}
        />
      ));
      fireEvent.input(screen.getByLabelText('the label'));
      expect(onInputSpy.mock.calls.length).toEqual(1);
    });
  });

  describe('onKeyDown API', () => {
    it('sets the onKeyDown handler', () => {
      const onKeyDownSpy = jest.fn();
      render((
        <Input
          id="foo"
          label="the label"
          onKeyDown={onKeyDownSpy}
        />
      ));
      fireEvent.keyDown(screen.getByLabelText('the label'));
      expect(onKeyDownSpy.mock.calls.length).toEqual(1);
    });
  });

  describe('placeholder API', () => {
    it('sets the placeholder attribute', () => {
      render((
        <Input
          id="foo"
          label="the label"
          placeholder="test-placeholder"
        />
      ));
      expect(screen.getByLabelText('the label')).toHaveAttribute('placeholder', 'test-placeholder');
    });
  });

  describe('readOnly API', () => {
    it('sets the readOnly attribute', () => {
      render((
        <Input
          id="foo"
          label="the label"
          readOnly
        />
      ));
      expect(screen.getByLabelText('the label')).toHaveAttribute('readonly');
    });
  });

  describe('required API', () => {
    it('sets the required attribute', () => {
      render((
        <Input
          id="foo"
          label="the label"
          required
        />
      ));
      expect(screen.getByLabelText('the label')).toBeRequired();
    });
  });

  describe('type API', () => {
    it('is set to "email"', () => {
      render((
        <Input
          id="foo"
          label="the label"
          type="email"
        />
      ));
      expect(screen.getByLabelText('the label')).toHaveAttribute('type', 'email');
    });

    it('is set to "password"', () => {
      render((
        <Input
          id="foo"
          label="the label"
          type="password"
        />
      ));
      expect(screen.getByLabelText('the label')).toHaveAttribute('type', 'password');
    });

    it('is be set to "text"', () => {
      render((
        <Input
          id="foo"
          label="the label"
          type="text"
        />
      ));
      expect(screen.getByLabelText('the label')).toHaveAttribute('type', 'text');
    });
  });

  describe('value API', () => {
    it('sets the value', () => {
      render((
        <Input
          id="foo"
          label="the label"
          onChange={() => {}}
          value="test-value"
        />
      ));
      expect(screen.getByLabelText('the label')).toHaveValue('test-value');
    });
  });

  describe('ref API', () => {
    it('is set to the inputRef property', () => {
      const inputRef = React.createRef();
      render(
        <Input
          id="foo"
          label="the label"
          inputRef={inputRef}
          onChange={() => {}}
          value="test-value"
        />,
      );
      expect(inputRef.current.value).toEqual('test-value');
    });
  });

  describe('autoFocus API', () => {
    it('sets the autoFocus attribute', () => {
      render((
        <Input
          id="foo"
          label="the label"
          autoFocus
        />
      ));
      expect(screen.getByLabelText('the label')).toHaveFocus();
    });
  });
});
