import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import AbstractCustomField from './abstract-custom-field.jsx';
import Icon from '../../icon/icon.jsx';
import calendarSvg from '../../../svgs/icon-calendar-fill.svg';

describe('AbstractCustomField', () => {
  const sharedProps = {
    label: 'Test label',
    id: 'test-id',
  };

  describe('aria props', () => {
    const ariaProps = { autocomplete: 'list', haspopup: 'listbox' };

    it('sets autocomplete to what is provided', () => {
      render(<AbstractCustomField {...sharedProps} ariaProps={ariaProps} />);
      expect(screen.getByLabelText('Test label')).toHaveAttribute('aria-autocomplete', 'list');
    });

    it('sets haspopup to what is provided', () => {
      render(<AbstractCustomField {...sharedProps} ariaProps={ariaProps} />);
      expect(screen.getByLabelText('Test label')).toHaveAttribute('aria-haspopup', 'listbox');
    });

    it('sets the aria-controls to the form control label ID', () => {
      render(<AbstractCustomField {...sharedProps} ariaProps={ariaProps} />);
      expect(screen.getByLabelText('Test label')).toHaveAttribute('aria-controls', 'test-id-label');
    });

    it('sets aria-describedby to link to a hint and aria-invalid when there are errors', () => {
      render(<AbstractCustomField {...sharedProps} errorText={'there are errors.'} />);
      expect(screen.getByLabelText('Test label')).toHaveAttribute('aria-describedby', 'test-idHint');
      expect(screen.getByLabelText('Test label')).toBeInvalid();
    });
  });

  describe('className API', () => {
    it('prioritizes className prop', () => {
      const { container } = render(<AbstractCustomField {...sharedProps} className="prioritize-me" />);
      expect(container.firstChild).toHaveClass('prioritize-me');
    });
  });

  describe('defaultValue API', () => {
    it('sets the value attribute', () => {
      render(<AbstractCustomField {...sharedProps} defaultValue="test-value" />);
      expect(screen.getByLabelText('Test label')).toHaveValue('test-value');
    });

    it('responds to changes in defaultValue', () => {
      const inputRef = React.createRef();
      const { rerender } = render(<AbstractCustomField {...sharedProps} defaultValue="test-value" inputRef={inputRef} />);
      expect(screen.getByLabelText('Test label')).toHaveValue('test-value');

      rerender(<AbstractCustomField {...sharedProps} defaultValue="new-test-value" inputRef={inputRef} />);
      expect(screen.getByLabelText('Test label')).toHaveValue('new-test-value');
    });
  });

  describe('disabled API', () => {
    it('can be disabled', () => {
      render(<AbstractCustomField {...sharedProps} disabled />);
      expect(screen.getByLabelText('Test label')).toBeDisabled();
    });

    it('can be enabled', () => {
      render(<AbstractCustomField {...sharedProps} />);
      expect(screen.getByLabelText('Test label')).not.toBeDisabled();
    });
  });

  describe('icon API', () => {
    it('shows an icon when provided', () => {
      const icon = <Icon name={calendarSvg.id} currentColor="action" />;
      const { getByRole } = render(<AbstractCustomField {...sharedProps} icon={icon} />);
      expect(getByRole('img')).toBeDefined();
    });

    it('renders the icon passed in', () => {
      const icon = <Icon name={calendarSvg.id} currentColor="action" title="Hello" ariaLabel={'Label'} />;
      render(<AbstractCustomField {...sharedProps} icon={icon} errorText="yo" />);
      expect(screen.getByRole('img', { name: 'Label' }).children[1]).toHaveAttribute('xlink:href', '#icon-calendar-fill.svg');
    });

    it('renders the error with aria-label for accessibility', () => {
      render(<AbstractCustomField {...sharedProps} errorText="yo" />);
      expect(screen.getByRole('img', { name: 'Error' }).firstChild).toHaveAttribute('xlink:href', '#icon-caution-fill.svg');
    });

    it('shows no icon by default', () => {
      const { queryByRole } = render(<AbstractCustomField {...sharedProps} />);
      expect(queryByRole('img')).toBeNull();
    });
  });

  describe('id API', () => {
    it('sets the id attribute', () => {
      render(<AbstractCustomField {...sharedProps} id="test-id" />);
      expect(screen.getByLabelText('Test label')).toHaveAttribute('id', 'test-id');
    });
  });

  describe('max API', () => {
    it('sets the max attribute', () => {
      render(<AbstractCustomField {...sharedProps} max={5} />);
      expect(screen.getByLabelText('Test label')).toHaveAttribute('max', '5');
    });

    it('allows a date string', () => {
      render(<AbstractCustomField {...sharedProps} max="2001-09-11" />);
      expect(screen.getByLabelText('Test label')).toHaveAttribute('max', '2001-09-11');
    });
  });

  describe('label API', () => {
    it('sets the label', () => {
      render(<AbstractCustomField {...sharedProps} label="Another label" />);
      expect(screen.getByLabelText('Another label')).toBeDefined();
    });
  });

  describe('min API', () => {
    it('sets the min attribute', () => {
      render(<AbstractCustomField {...sharedProps} min={-5} />);
      expect(screen.getByLabelText('Test label')).toHaveAttribute('min', '-5');
    });

    it('allows a date string', () => {
      render(<AbstractCustomField {...sharedProps} min="2001-09-11" />);
      expect(screen.getByLabelText('Test label')).toHaveAttribute('min', '2001-09-11');
    });
  });

  describe('name API', () => {
    it('sets the name attribute', () => {
      render(<AbstractCustomField {...sharedProps} name="test-name" />);
      expect(screen.getByLabelText('Test label')).toHaveAttribute('name', 'test-name');
    });
  });

  describe('placeholder API', () => {
    it('can have placeholder for input', () => {
      const placeholder = 'This is placeholder input';
      render(<AbstractCustomField {...sharedProps} placeholder={placeholder} />);
      expect(screen.getByLabelText('Test label')).toHaveAttribute('placeholder', placeholder);
    });
  });

  describe('readOnly API', () => {
    it('respects the readOnly prop', () => {
      const { getByLabelText } = render(<AbstractCustomField {...sharedProps} readOnly />);
      expect(getByLabelText('Test label')).toHaveAttribute('readOnly', '');
    });

    it('is false by default', () => {
      const { getByLabelText } = render(<AbstractCustomField {...sharedProps} />);
      expect(getByLabelText('Test label')).not.toHaveAttribute('readOnly', '');
    });
  });

  describe('required API', () => {
    it('can have a required indicator', () => {
      render(<AbstractCustomField {...sharedProps} required />);
      expect(screen.getByLabelText('Test label')).toBeRequired();
    });

    it('can have no required indicator', () => {
      render(<AbstractCustomField {...sharedProps} />);
      expect(screen.getByLabelText('Test label')).not.toBeRequired();
    });
  });

  describe('events API', () => {
    it('accepts an onBlur event', () => {
      const onBlur = jest.fn();
      const { getByLabelText } = render(<AbstractCustomField {...sharedProps} label="foo" onBlur={onBlur} />);
      fireEvent.blur(getByLabelText('foo'));
      expect(onBlur.mock.calls.length).toEqual(1);
    });

    it('accepts an onChange listener', () => {
      const onChange = jest.fn();
      const { getByLabelText } = render(<AbstractCustomField {...sharedProps} onChange={e => onChange(e)} />);
      fireEvent.change(getByLabelText('Test label'), { target: { value: 'hey' } });
      expect(onChange.mock.calls.length).toBe(1);
    });

    it('accepts an onClick event', () => {
      const onClick = jest.fn();
      render(<AbstractCustomField {...sharedProps} onClick={onClick} />);
      fireEvent.click(screen.getByLabelText('Test label'));
      expect(onClick.mock.calls.length).toBe(1);
    });

    it('accepts an onFocus event', () => {
      const onFocus = jest.fn();
      const { getByLabelText } = render(<AbstractCustomField {...sharedProps} label="foo" onFocus={onFocus} />);
      fireEvent.focus(getByLabelText('foo'));
      expect(onFocus.mock.calls.length).toEqual(1);
    });

    it('accepts an onKeyDown event', () => {
      const onKeyDownSpy = jest.fn();
      render(<AbstractCustomField {...sharedProps} onKeyDown={onKeyDownSpy} />);
      fireEvent.keyDown(screen.getByLabelText('Test label'));
      expect(onKeyDownSpy.mock.calls.length).toBe(1);
    });

    it('accepts an onKeyUp event', () => {
      const onKeyUpSpy = jest.fn();
      render(<AbstractCustomField {...sharedProps} onKeyUp={onKeyUpSpy} />);
      fireEvent.keyUp(screen.getByLabelText('Test label'));
      expect(onKeyUpSpy.mock.calls.length).toBe(1);
    });
  });

  describe('step API', () => {
    it('sets the step attribute', () => {
      render(<AbstractCustomField {...sharedProps} step={2} />);
      expect(screen.getByLabelText('Test label')).toHaveAttribute('step', '2');
    });
  });

  describe('type API', () => {
    it('can be set to `number`', () => {
      render(<AbstractCustomField {...sharedProps} type="number" />);
      expect(screen.getByLabelText('Test label')).toHaveAttribute('type', 'number');
    });

    it('can be set to `text`', () => {
      render(<AbstractCustomField {...sharedProps} type="text" />);
      expect(screen.getByLabelText('Test label')).toHaveAttribute('type', 'text');
    });

    it('can be set to `date`', () => {
      render(<AbstractCustomField {...sharedProps} type="date" />);
      expect(screen.getByLabelText('Test label')).toHaveAttribute('type', 'date');
    });
  });
});
