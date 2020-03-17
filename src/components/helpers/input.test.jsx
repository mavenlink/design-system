import React, { createRef } from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import Input from './input.jsx';

describe('src/components/helpers/input', () => {
  const renderComponent = (props = {}) => render(<Input id="foo" {...props} />);
  const testId = 'private-input';

  afterEach(cleanup);

  describe('className API', () => {
    it('accepts a className prop', () => {
      const { getByTestId } = renderComponent({ className: 'bar' });
      expect(getByTestId(testId)).toHaveClass('bar');
    });
  });

  describe('disabled API', () => {
    it('can be enabled', () => {
      const { getByTestId } = renderComponent({ disabled: false });
      expect(getByTestId(testId)).not.toBeDisabled();
    });

    it('can be disabled', () => {
      const { getByTestId } = renderComponent({ disabled: true });
      expect(getByTestId(testId)).toBeDisabled();
    });
  });

  describe('id API', () => {
    it('sets the ID attribute', () => {
      const { getByTestId } = renderComponent();
      expect(getByTestId(testId)).toHaveAttribute('id', 'foo');
    });
  });

  describe('inputRef API', () => {
    it('sets the ref on itself', () => {
      const inputRef = createRef();
      const { getByTestId } = renderComponent({ inputRef });
      expect(getByTestId(testId)).toBe(inputRef.current);
    });
  });

  describe('type API', () => {
    const types = ['text', 'date', 'number'];

    types.forEach((type) => {
      it(`accepts '${type}' as a valid type`, () => {
        const { getByTestId } = renderComponent({ type });
        expect(getByTestId(testId)).toHaveAttribute('type', type);
      });
    });
  });

  describe('interaction API', () => {
    it('accepts onBlur', () => {
      const onBlur = jest.fn();
      const { getByTestId } = renderComponent({ onBlur });
      fireEvent.blur(getByTestId(testId));
      expect(onBlur.mock.calls.length).toBe(1);
    });

    it('accepts onChange', () => {
      const onChange = jest.fn();
      const { getByTestId } = renderComponent({ onChange });
      fireEvent.change(getByTestId(testId), { target: { value: 'hello' } });
      expect(onChange.mock.calls.length).toBe(1);
    });

    it('accepts onFocus', () => {
      const onFocus = jest.fn();
      const { getByTestId } = renderComponent({ onFocus });
      fireEvent.focus(getByTestId(testId));
      expect(onFocus.mock.calls.length).toBe(1);
    });
  });

  describe('placeholder API', () => {
    it('accepts a placeholder', () => {
      const { getByTestId } = renderComponent({ placeholder: 'bar' });
      expect(getByTestId(testId)).toHaveAttribute('placeholder', 'bar');
    });
  });

  describe('when controlled', () => {
    describe('value API', () => {
      it('accepts a starting value', () => {
        const { getByTestId } = renderComponent({ value: 'hello' });
        expect(getByTestId(testId)).toHaveValue('hello');
      });
    });
  });

  // describe('when uncontrolled', () => {});
});
