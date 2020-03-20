import React, { createRef } from 'react';
import renderer from 'react-test-renderer';
import { cleanup, fireEvent, render } from '@testing-library/react';
import Icon from '../icon/icon.jsx';
import calendarSvg from '../../svgs/icon-calendar-fill.svg';
import CustomField from './custom-field.jsx';

describe('src/components/helpers/custom-field', () => {
  const renderComponent = (props = {}) => render(<CustomField
    id="custom-field"
    label="Custom Field"
    {...props}
  />);

  afterEach(cleanup);

  it('has defaults', () => {
    expect(renderer.create(<CustomField id="custom-field" label="Custom Field" />).toJSON()).toMatchSnapshot();
  });

  describe('label API', () => {
    it('sets the label', () => {
      const { getByLabelText } = renderComponent();
      expect(getByLabelText('Custom Field')).toBeDefined();
    });
  });

  describe('required API', () => {
    it('can have a required indicator', () => {
      const { getByLabelText } = renderComponent({ required: true });
      expect(getByLabelText('Custom Field')).toBeRequired();
    });

    it('can have no required indicator', () => {
      const { getByLabelText } = renderComponent({ required: false });
      expect(getByLabelText('Custom Field')).not.toBeRequired();
    });
  });

  describe('inputRef API', () => {
    it('sets the ref on the input', () => {
      const inputRef = createRef();
      const { getByLabelText } = renderComponent({ inputRef });
      expect(getByLabelText('Custom Field')).toBe(inputRef.current);
    });
  });

  describe('id API', () => {
    it('sets the id attribute', () => {
      const { getByLabelText } = renderComponent({ id: 'test-id' });
      expect(getByLabelText('Custom Field')).toHaveAttribute('id', 'test-id');
    });
  });

  describe('error API', () => {
    it('can have no error state', () => {
      const { container, getByLabelText } = renderComponent();
      expect(container.firstChild).not.toHaveClass('error');
      expect(getByLabelText('Custom Field')).toBeValid();
      expect(container.querySelector('[role="img"]')).toBeFalsy();
    });

    it('can be semantically invalid', () => {
      const { container, getByRole } = renderComponent({ error: true, helpText: 'YOOOOO' });
      expect(container.firstChild).toHaveClass('error');
      expect(getByRole('img').firstChild).toHaveAttribute('xlink:href', '#icon-caution-fill.svg');
    });
  });

  describe('icon API', () => {
    it('shows an icon when provided', () => {
      const icon = <Icon name={calendarSvg.id} currentColor="action" />;
      const { getByRole } = renderComponent({ icon });
      expect(getByRole('img')).toBeDefined();
    });

    it('gives preference to the error icon', () => {
      const icon = <Icon name={calendarSvg.id} currentColor="action" title="Hello" />;
      const { queryByTitle, getByRole } = renderComponent({ icon, error: true });
      expect(queryByTitle('Hello')).toBeNull();
      expect(getByRole('img').firstChild).toHaveAttribute('xlink:href', '#icon-caution-fill.svg');
    });

    it('shows no icon by default', () => {
      const { queryByRole } = renderComponent();
      expect(queryByRole('img')).toBeNull();
    });
  });

  describe('disabled API', () => {
    it('can be disabled', () => {
      const { getByLabelText } = renderComponent({ disabled: true });
      expect(getByLabelText('Custom Field')).toBeDisabled();
    });

    it('can be enabled', () => {
      const { getByLabelText } = renderComponent({ disabled: false });
      expect(getByLabelText('Custom Field')).not.toBeDisabled();
    });
  });

  describe('interaction API', () => {
    describe('onChange', () => {
      it('accepts an onChange listener', () => {
        const onChange = jest.fn();
        const { getByLabelText } = renderComponent({ onChange });
        fireEvent.change(getByLabelText('Custom Field'), { target: { value: 'hey' } });
        expect(onChange.mock.calls.length).toBe(1);
      });
    });

    describe('onKeyUp', () => {
      it('handles the key up event', () => {
        const onKeyUp = jest.fn();
        const { getByLabelText } = renderComponent({ onKeyUp });
        fireEvent.keyUp(getByLabelText('Custom Field'));
        expect(onKeyUp.mock.calls.length).toBe(1);
      });
    });

    describe('onFocus', () => {
      it('accepts an onFocus event', () => {
        const onFocus = jest.fn();
        const { getByLabelText } = renderComponent({ onFocus });
        fireEvent.focus(getByLabelText('Custom Field'));
        expect(onFocus.mock.calls.length).toBe(1);
      });
    });

    describe('onBlur', () => {
      it('accepts an onBlur event', () => {
        const onBlur = jest.fn();
        const { getByLabelText } = renderComponent({ onBlur });
        fireEvent.focus(getByLabelText('Custom Field'));
        fireEvent.blur(getByLabelText('Custom Field'));
        expect(onBlur.mock.calls.length).toBe(1);
      });
    });
  });

  describe('placeholder API', () => {
    it('can have placeholder for input', () => {
      const placeholder = 'This is placeholder input';
      const { getByLabelText } = renderComponent({ placeholder });
      expect(getByLabelText('Custom Field')).toHaveAttribute('placeholder', placeholder);
    });
  });

  describe('name API', () => {
    it('accepts a name', () => {
      const name = 'YOOOOO';
      const { getByLabelText } = renderComponent({ name });
      expect(getByLabelText('Custom Field')).toHaveAttribute('name', name);
    });
  });

  describe('type API', () => {
    ['number', 'date', 'text'].forEach((type) => {
      it(`accepts the type \`${type}\``, () => {
        const { getByLabelText } = renderComponent({ type });
        expect(getByLabelText('Custom Field')).toHaveAttribute('type', type);
      });
    });
  });

  describe('value API', () => {
    it('shows the provided value on render', () => {
      const value = 'YOOOOOOOOO';
      const { getByLabelText } = renderComponent({ value });
      expect(getByLabelText('Custom Field')).toHaveValue(value);
    });

    it('accepts a number', () => {
      const value = 12;
      const { getByLabelText } = renderComponent({ type: 'number', value });
      expect(getByLabelText('Custom Field')).toHaveValue(value);
    });
  });

  describe('max API', () => {
    it('accepts a max number', () => {
      const { getByLabelText } = renderComponent({ type: 'number', max: 100 });
      expect(getByLabelText('Custom Field')).toHaveAttribute('max', '100');
    });

    it('accepts a max string', () => {
      const { getByLabelText } = renderComponent({ type: 'date', max: '2001-09-11' });
      expect(getByLabelText('Custom Field')).toHaveAttribute('max', '2001-09-11');
    });
  });

  describe('min API', () => {
    it('accepts a min number', () => {
      const { getByLabelText } = renderComponent({ type: 'number', min: 100 });
      expect(getByLabelText('Custom Field')).toHaveAttribute('min', '100');
    });

    it('accepts a min string', () => {
      const { getByLabelText } = renderComponent({ type: 'date', min: '2001-09-11' });
      expect(getByLabelText('Custom Field')).toHaveAttribute('min', '2001-09-11');
    });
  });
});
