import React, { createRef } from 'react';
import renderer from 'react-test-renderer';
import { fireEvent, render, screen } from '@testing-library/react';
import Icon from '../icon/icon.jsx';
import calendarSvg from '../../svgs/icon-calendar-fill.svg';
import CustomFieldInputText from './custom-field-input-text.jsx';

describe('CustomFieldInputText', () => {
  function TestComponent(props = {}) {
    return <CustomFieldInputText id="test-input" label="Test label" {...props} />;
  }

  it('has defaults', () => {
    expect(renderer.create(<TestComponent />).toJSON()).toMatchSnapshot();
  });

  describe('aria props', () => {
    const ariaProps = { autocomplete: 'list', haspopup: 'listbox' };

    it('sets autocomplete to what is provided', () => {
      render(<TestComponent ariaProps={ariaProps} />);
      expect(screen.getByLabelText('Test label')).toHaveAttribute('aria-autocomplete', 'list');
    });

    it('sets haspopup to what is provided', () => {
      render(<TestComponent ariaProps={ariaProps} />);
      expect(screen.getByLabelText('Test label')).toHaveAttribute('aria-haspopup', 'listbox');
    });

    it('sets the aria-controls to the form control label ID', () => {
      render(<TestComponent ariaProps={ariaProps} />);
      expect(screen.getByLabelText('Test label')).toHaveAttribute('aria-controls', 'test-input-label');
    });
  });

  describe('className API', () => {
    it('prioritizes className prop', () => {
      const { container } = render(<TestComponent className="prioritize-me" />);
      expect(container.firstChild).toHaveClass('prioritize-me');
    });
  });

  describe('defaultValue API', () => {
    it('sets the value attribute', () => {
      render(<TestComponent defaultValue="test-value" />);
      expect(screen.getByLabelText('Test label')).toHaveValue('test-value');
    });
  });

  describe('disabled API', () => {
    it('can be disabled', () => {
      render(<TestComponent disabled />);
      expect(screen.getByLabelText('Test label')).toBeDisabled();
    });

    it('can be enabled', () => {
      render(<TestComponent />);
      expect(screen.getByLabelText('Test label')).not.toBeDisabled();
    });
  });

  describe('errorText API', () => {
    xit('can have an error state through a native validation', () => {
      // I am not sure what is the best way to represent this in a test.
      // However, at the moment, there are end-to-end tests in the Number component tests.
      const { container } = render(<TestComponent errorText="yo" />);
      expect(container.firstChild).toHaveClass('error');
      expect(screen.getByLabelText('Test label')).toBeInvalid();
      expect(screen.getByRole('img').firstChild).toHaveAttribute('xlink:href', '#icon-caution-fill.svg');
    });

    it('can have an error state through a custom validation', () => {
      render(<TestComponent errorText="Custom validation message" />);
      expect(screen.getByLabelText('Test label')).toBeInvalid();
      expect(screen.getByRole('img').firstChild).toHaveAttribute('xlink:href', '#icon-caution-fill.svg');
    });

    it('can have no error state', () => {
      render(<TestComponent />);
      expect(screen.getByLabelText('Test label')).toBeValid();
      expect(screen.queryByRole('[role="img"]')).toBeFalsy();
    });
  });

  describe('id API', () => {
    it('sets the id attribute', () => {
      render(<TestComponent id="test-id" />);
      expect(screen.getByLabelText('Test label')).toHaveAttribute('id', 'test-id');
    });
  });

  describe('inputRef API', () => {
    it('sets the ref on the input', () => {
      const inputRef = createRef();
      render(<TestComponent inputRef={inputRef} />);
      expect(screen.getByLabelText('Test label')).toBe(inputRef.current);
    });
  });

  describe('label API', () => {
    it('sets the label', () => {
      render(<TestComponent label="Another label" />);
      expect(screen.getByLabelText('Another label')).toBeDefined();
    });
  });

  describe('name API', () => {
    it('sets the name attribute', () => {
      render(<TestComponent name="test-name" />);
      expect(screen.getByLabelText('Test label')).toHaveAttribute('name', 'test-name');
    });
  });

  describe('onChange', () => {
    it('accepts an onChange listener', () => {
      const onChange = jest.fn();
      const { getByLabelText } = render(<TestComponent onChange={e => onChange(e)} />);
      fireEvent.change(getByLabelText('Test label'), { target: { value: 'hey' } });
      expect(onChange.mock.calls.length).toBe(1);
    });
  });

  describe('onClick', () => {
    it('accepts an onClick listener', () => {
      const onClick = jest.fn();
      render(<TestComponent onClick={onClick} />);
      fireEvent.click(screen.getByLabelText('Test label'));
      expect(onClick.mock.calls.length).toBe(1);
    });
  });

  describe('onKeyDown', () => {
    it('handles the key down event', () => {
      const onKeyDownSpy = jest.fn();
      render(<TestComponent onKeyDown={onKeyDownSpy} />);
      fireEvent.keyDown(screen.getByLabelText('Test label'));
      expect(onKeyDownSpy.mock.calls.length).toBe(1);
    });
  });

  describe('onKeyUp', () => {
    it('handles the key up event', () => {
      const onKeyUpSpy = jest.fn();
      render(<TestComponent onKeyUp={onKeyUpSpy} />);
      fireEvent.keyUp(screen.getByLabelText('Test label'));
      expect(onKeyUpSpy.mock.calls.length).toBe(1);
    });
  });

  describe('onFocus', () => {
    it('accepts an onFocus event', () => {
      const onFocus = jest.fn();
      const { getByLabelText } = render(<TestComponent onFocus={onFocus} />);
      fireEvent.focus(getByLabelText('Test label'));
      expect(onFocus.mock.calls.length).toBe(1);
    });
  });

  describe('onBlur', () => {
    it('accepts an onBlur event', () => {
      const onBlur = jest.fn();
      const { getByLabelText } = render(<TestComponent onBlur={onBlur} />);
      fireEvent.focus(getByLabelText('Test label'));
      fireEvent.blur(getByLabelText('Test label'));
      expect(onBlur.mock.calls.length).toBe(1);
    });
  });

  describe('placeholder API', () => {
    it('can have placeholder for input', () => {
      const placeholder = 'This is placeholder input';
      render(<TestComponent placeholder={placeholder} />);
      expect(screen.getByLabelText('Test label')).toHaveAttribute('placeholder', placeholder);
    });
  });

  describe('readOnly API', () => {
    it('respects the readOnly prop', () => {
      const { getByLabelText } = render(<TestComponent readOnly />);
      expect(getByLabelText('Test label')).toHaveAttribute('readOnly', '');
    });

    it('is false by default', () => {
      const { getByLabelText } = render(<TestComponent />);
      expect(getByLabelText('Test label')).not.toHaveAttribute('readOnly', '');
    });
  });

  describe('required API', () => {
    it('can have a required indicator', () => {
      render(<TestComponent required />);
      expect(screen.getByLabelText('Test label')).toBeRequired();
    });

    it('can have no required indicator', () => {
      render(<TestComponent />);
      expect(screen.getByLabelText('Test label')).not.toBeRequired();
    });
  });

  describe('type API', () => {
    it('can be set to `number`', () => {
      render(<TestComponent type="number" />);
      expect(screen.getByLabelText('Test label')).toHaveAttribute('type', 'number');
    });

    it('can be set to `text`', () => {
      render(<TestComponent type="text" />);
      expect(screen.getByLabelText('Test label')).toHaveAttribute('type', 'text');
    });

    it('can be set to `date`', () => {
      render(<TestComponent type="date" />);
      expect(screen.getByLabelText('Test label')).toHaveAttribute('type', 'date');
    });
  });

  describe('icon API', () => {
    it('shows an icon when provided', () => {
      const icon = <Icon name={calendarSvg.id} currentColor="action" />;
      const { getByRole } = render(<TestComponent icon={icon} />);
      expect(getByRole('img')).toBeDefined();
    });

    it('gives preference to the error icon', () => {
      const icon = <Icon name={calendarSvg.id} currentColor="action" title="Hello" />;
      const { queryByTitle, getByRole } = render(<TestComponent icon={icon} errorText="yo" />);
      expect(queryByTitle('Hello')).toBeNull();
      expect(getByRole('img').firstChild).toHaveAttribute('xlink:href', '#icon-caution-fill.svg');
    });

    it('shows no icon by default', () => {
      const { queryByRole } = render(<TestComponent />);
      expect(queryByRole('img')).toBeNull();
    });
  });

  describe('events API', () => {
    it('accepts an onBlur event', () => {
      const onBlur = jest.fn();
      const { getByLabelText } = render(<TestComponent label="foo" onBlur={onBlur} />);
      fireEvent.blur(getByLabelText('foo'));
      expect(onBlur.mock.calls.length).toEqual(1);
    });

    it('accepts an onFocus event', () => {
      const onFocus = jest.fn();
      const { getByLabelText } = render(<TestComponent label="foo" onFocus={onFocus} />);
      fireEvent.focus(getByLabelText('foo'));
      expect(onFocus.mock.calls.length).toEqual(1);
    });

    it('handles the key up event', () => {
      const onKeyUpSpy = jest.fn();
      render(<TestComponent onKeyUp={onKeyUpSpy} />);
      fireEvent.keyUp(screen.getByLabelText('Test label'));
      expect(onKeyUpSpy.mock.calls.length).toBe(1);
    });
  });

  describe('readonly API', () => {
    it('can be set to readonly', () => {
      const { getByLabelText } = render(<TestComponent readOnly />);
      expect(getByLabelText('Test label')).toHaveAttribute('readOnly');
    });
  });

  describe('value API', () => {
    it('sets the value attribute', () => {
      render(<TestComponent value="test-value" />);
      expect(screen.getByLabelText('Test label')).toHaveValue('test-value');
    });
  });
});
