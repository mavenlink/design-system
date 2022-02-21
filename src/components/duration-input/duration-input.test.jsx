import React, { createRef } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import DurationInput from './duration-input.jsx';

describe('DurationInput', () => {
  const requiredProps = {
    id: 'foo',
    label: 'the label',
  };

  it('has defaults', () => {
    const ref = createRef();
    render(<DurationInput {...requiredProps} ref={ref} />);
    expect(document.body).toMatchSnapshot();
    expect(ref.current).toMatchSnapshot();
  });

  describe('autoFocus API', () => {
    it('sets the autoFocus attribute', () => {
      render(<DurationInput {...requiredProps} autoFocus />);
      expect(screen.getByLabelText('the label')).toHaveFocus();
    });
  });

  describe('className API', () => {
    it('sets <input> className', () => {
      render(<DurationInput {...requiredProps} className="test-class" />);
      expect(screen.getByLabelText('the label')).toHaveClass('test-class');
    });
  });

  describe('cssContainer API', () => {
    it('sets input container className', () => {
      render(<DurationInput {...requiredProps} cssContainer="test-class" />);
      expect(document.body).toMatchSnapshot();
    });
  });

  describe('dirty API', () => {
    it('is unset without any changes', () => {
      const ref = createRef();
      render(<DurationInput {...requiredProps} ref={ref} />);
      expect(ref.current.dirty).toBe(false);
    });

    it('is set with any changes', async () => {
      const ref = createRef();
      render(<DurationInput {...requiredProps} ref={ref} />);
      userEvent.type(screen.getByLabelText('the label'), '2');
      userEvent.tab(); // blur
      expect(ref.current.dirty).toBe(true);
    });

    it('is unset with changes back to initial state', () => {
      const ref = createRef();
      render(<DurationInput {...requiredProps} ref={ref} />);
      userEvent.type(screen.getByLabelText('the label'), '2');
      userEvent.type(screen.getByLabelText('the label'), '{backspace}');
      expect(ref.current.dirty).toBe(false);
    });

    it('is unset with changes and new value prop', () => {
      const ref = createRef();
      const { rerender } = render(<DurationInput {...requiredProps} ref={ref} />);
      userEvent.type(screen.getByLabelText('the label'), '2');
      rerender(<DurationInput {...requiredProps} ref={ref} value={120} />);
      expect(ref.current.dirty).toBe(false);
    });
  });

  describe('id API', () => {
    it('sets the ID', () => {
      render(<DurationInput {...requiredProps} id="test-id" />);
      expect(screen.getByLabelText('the label')).toHaveAttribute('id', 'test-id');
    });

    it('is set on the ref', () => {
      const ref = createRef();
      render(<DurationInput {...requiredProps} id="unique-id" ref={ref} />);
      expect(ref.current.id).toBe('unique-id');
    });
  });

  describe('label API', () => {
    it('can be set', () => {
      render(<DurationInput {...requiredProps} label="Unique label" />);
      expect(screen.getByLabelText('Unique label')).toBeInTheDocument();
    });
  });

  describe('maxLength API', () => {
    it('sets the maxLength attribute', () => {
      render(<DurationInput {...requiredProps} maxLength={100} />);
      expect(screen.getByLabelText('the label')).toHaveAttribute('maxlength', '100');
    });
  });

  describe('name API', () => {
    it('sets the name attribute', () => {
      render(<DurationInput {...requiredProps} name="test-name" />);
      expect(screen.getByLabelText('the label')).toHaveAttribute('name', 'test-name');
    });

    it('is set on the ref', () => {
      const ref = createRef();
      render(<DurationInput {...requiredProps} name="unique-name" ref={ref} />);
      expect(ref.current.name).toBe('unique-name');
    });
  });

  describe('onBlur API', () => {
    it('sets the onblur handler', () => {
      const onBlurSpy = jest.fn();
      render(<DurationInput {...requiredProps} onBlur={onBlurSpy} />);
      userEvent.click(screen.getByLabelText('the label'));
      userEvent.tab();
      expect(onBlurSpy.mock.calls.length).toEqual(1);
    });
  });

  describe('onChange API', () => {
    it('sets the onchange handler', () => {
      const onChangeSpy = jest.fn();
      render(<DurationInput {...requiredProps} onChange={onChangeSpy} />);
      userEvent.type(screen.getByLabelText('the label'), '2');
      expect(onChangeSpy.mock.calls.length).toEqual(1);
    });
  });

  describe('onFocus API', () => {
    it('sets the onFocus handler', () => {
      const onFocusSpy = jest.fn();
      render(<DurationInput {...requiredProps} onFocus={onFocusSpy} />);
      userEvent.click(screen.getByLabelText('the label'));
      expect(onFocusSpy.mock.calls.length).toEqual(1);
    });
  });

  describe('onInput API', () => {
    it('sets the onInput handler', () => {
      const onInputSpy = jest.fn();
      render(<DurationInput {...requiredProps} onInput={onInputSpy} />);
      userEvent.type(screen.getByLabelText('the label'), '2');
      expect(onInputSpy.mock.calls.length).toEqual(1);
    });
  });

  describe('onKeyDown API', () => {
    it('sets the onKeyDown handler', () => {
      const onKeyDownSpy = jest.fn();
      render(<DurationInput {...requiredProps} onKeyDown={onKeyDownSpy} />);
      userEvent.click(screen.getByText('the label'));
      userEvent.type(screen.getByLabelText('the label'), '2');
      expect(onKeyDownSpy.mock.calls.length).toEqual(1);
    });
  });

  describe('placeholder API', () => {
    it('sets the placeholder attribute', () => {
      render(<DurationInput {...requiredProps} placeholder="test-placeholder" />);
      expect(screen.getByLabelText('the label')).toHaveAttribute('placeholder', 'test-placeholder');
    });
  });

  describe('readOnly API', () => {
    it('sets the readOnly attribute', () => {
      render(<DurationInput {...requiredProps} readOnly />);
      expect(screen.getByLabelText('the label')).toHaveAttribute('readonly');
    });
  });

  describe('ref API', () => {
    it('can be set', () => {
      const ref = React.createRef();
      render(<DurationInput {...requiredProps} ref={ref} value={120} />);
      expect(ref.current.value).toEqual(120);
    });
  });

  describe('required API', () => {
    it('can be set', () => {
      render(<DurationInput {...requiredProps} required={true} />);
      expect(screen.getByLabelText('the label')).toBeRequired();
      expect(screen.getByLabelText('the label')).toBeInvalid();
    });

    it('can be unset', () => {
      render(<DurationInput {...requiredProps} required={false} />);
      expect(screen.getByLabelText('the label')).not.toBeRequired();
      expect(screen.getByLabelText('the label')).toBeValid();
    });

    it('is invalid on mount but does not have an error message', () => {
      render(<DurationInput {...requiredProps} required={true} />);
      expect(screen.getByLabelText('the label')).toBeInvalid();
      expect(screen.getByLabelText('the label')).toHaveAccessibleDescription('');
    });

    it('is invalid after tabbing through', async () => {
      render(<DurationInput {...requiredProps} required={true} />);
      userEvent.tab();
      expect(document.activeElement).toBe(screen.getByLabelText('the label'));
      expect(screen.getByLabelText('the label')).toBeInvalid();
      expect(screen.getByLabelText('the label')).toHaveAccessibleDescription('');
      userEvent.tab();
      expect(document.activeElement).not.toBe(screen.getByLabelText('the label'));
      expect(screen.getByLabelText('the label')).toBeInvalid();
      expect(screen.getByLabelText('the label')).toHaveAccessibleDescription('Constraints not satisfied');
    });
  });

  describe('type API', () => {
    it('is be set to "text"', () => {
      render(<DurationInput {...requiredProps} type="text" />);
      expect(screen.getByLabelText('the label')).toHaveAttribute('type', 'text');
    });
  });

  describe('validationMessage API', () => {
    it('can be set', () => {
      render(<DurationInput {...requiredProps} validationMessage="unique error" />);
      expect(screen.getByLabelText('the label')).toBeInvalid();
      expect(screen.getByLabelText('the label')).toHaveAccessibleDescription('unique error');
      expect(screen.getByRole('img', { name: 'unique error' })).toBeInTheDocument();
    });

    it('can be unset', () => {
      render(<DurationInput {...requiredProps} validationMessage="" />);
      expect(screen.getByLabelText('the label')).toBeValid();
      expect(screen.getByLabelText('the label')).toHaveAccessibleDescription('');
    });
  });

  describe('value API', () => {
    it('sets the value', () => {
      const ref = React.createRef();
      render(<DurationInput {...requiredProps} ref={ref} value={1} />);
      expect(screen.getByLabelText('the label')).toHaveValue('0h 01');
      expect(ref.current.value).toBe(1);
    });

    it('updates the ref value with changes', () => {
      const ref = React.createRef();
      render(<DurationInput {...requiredProps} ref={ref} value={60} />);
      expect(screen.getByLabelText('the label')).toHaveValue('1h 00');

      userEvent.type(screen.getByLabelText('the label'), '{backspace}{backspace}{backspace}{backspace}{backspace}');
      userEvent.type(screen.getByLabelText('the label'), '2h 00');
      userEvent.tab(); // blur

      expect(ref.current.value).toBe(120);
    });
  });

  describe('formatting', () => {
    describe('formatting values', () => {
      it('handles just minutes', () => {
        render(<DurationInput {...requiredProps} value={1} />);
        expect(screen.getByLabelText('the label')).toHaveValue('0h 01');
      });

      it('handles hours', () => {
        render(<DurationInput {...requiredProps} value={120} />);
        expect(screen.getByLabelText('the label')).toHaveValue('2h 00');
      });

      it('handles hours and minutes', () => {
        render(<DurationInput {...requiredProps} value={150} />);
        expect(screen.getByLabelText('the label')).toHaveValue('2h 30');
      });
    });

    describe('formatting user input', () => {
      it('converts the user input: 2 to 2h 00', () => {
        render(<DurationInput {...requiredProps} />);
        userEvent.type(screen.getByLabelText('the label'), '2');
        userEvent.tab(); // blur
        expect(screen.getByLabelText('the label')).toHaveValue('2h 00');
      });

      it('converts the user input: 3h to 3h 00', () => {
        render(<DurationInput {...requiredProps} />);
        userEvent.type(screen.getByLabelText('the label'), '3h');
        userEvent.tab(); // blur
        expect(screen.getByLabelText('the label')).toHaveValue('3h 00');
      });

      it('converts the user input: 4.5 to 4h 30', () => {
        render(<DurationInput {...requiredProps} />);
        userEvent.type(screen.getByLabelText('the label'), '4.5');
        userEvent.tab(); // blur
        expect(screen.getByLabelText('the label')).toHaveValue('4h 30');
      });

      it('converts the user input: .25 to 0h 15', () => {
        render(<DurationInput {...requiredProps} />);
        userEvent.type(screen.getByLabelText('the label'), '.25');
        userEvent.tab(); // blur
        expect(screen.getByLabelText('the label')).toHaveValue('0h 15');
      });

      it('converts the user input: 45m to 0h 45', () => {
        render(<DurationInput {...requiredProps} />);
        userEvent.type(screen.getByLabelText('the label'), '45m');
        userEvent.tab(); // blur
        expect(screen.getByLabelText('the label')).toHaveValue('0h 45');
      });

      it('converts the user input: 45 min to 0h 45', () => {
        render(<DurationInput {...requiredProps} />);
        userEvent.type(screen.getByLabelText('the label'), '45 min');
        userEvent.tab(); // blur
        expect(screen.getByLabelText('the label')).toHaveValue('0h 45');
      });

      it('converts the user input: 1 hour 45 min to 1h 45', () => {
        render(<DurationInput {...requiredProps} />);
        userEvent.type(screen.getByLabelText('the label'), '1 hour 45 min');
        userEvent.tab(); // blur
        expect(screen.getByLabelText('the label')).toHaveValue('1h 45');
      });

      it('converts the user input: 1h 15 to 1h 15', () => {
        render(<DurationInput {...requiredProps} />);
        userEvent.type(screen.getByLabelText('the label'), '1h 15');
        userEvent.tab(); // blur
        expect(screen.getByLabelText('the label')).toHaveValue('1h 15');
      });

      it('converts the user input: 2:30 to 2h 30', () => {
        render(<DurationInput {...requiredProps} />);
        userEvent.type(screen.getByLabelText('the label'), '2:30');
        userEvent.tab(); // blur
        expect(screen.getByLabelText('the label')).toHaveValue('2h 30');
      });

      it('converts the user input: 1.5d to 36h 00', () => {
        render(<DurationInput {...requiredProps} />);
        userEvent.type(screen.getByLabelText('the label'), '1.5d');
        userEvent.tab(); // blur
        expect(screen.getByLabelText('the label')).toHaveValue('36h 00');
      });

      it('converts the user input: 3 days to 72h 00', () => {
        render(<DurationInput {...requiredProps} />);
        userEvent.type(screen.getByLabelText('the label'), '3 days');
        userEvent.tab(); // blur
        expect(screen.getByLabelText('the label')).toHaveValue('72h 00');
      });

      it('converts the user input: 2 days 2 hours 2 mins to 50h 02', () => {
        render(<DurationInput {...requiredProps} />);
        userEvent.type(screen.getByLabelText('the label'), '2 days 2 hours 2 mins');
        userEvent.tab(); // blur
        expect(screen.getByLabelText('the label')).toHaveValue('50h 02');
      });
    });
  });

  describe('tooltip API', () => {
    const tooltip = 'I am an input, short and stout.';

    it('applies a description to the input when the help icon is hovered', () => {
      render(<DurationInput {...requiredProps} tooltip={tooltip} />);
      userEvent.hover(screen.getByRole('img', { name: 'More information' }));
      expect(screen.getByRole('textbox', { name: requiredProps.label })).toHaveAccessibleDescription(tooltip);
    });

    it('removes the description to the input when the help icon is unhovered', () => {
      render(<DurationInput {...requiredProps} tooltip={tooltip} />);
      userEvent.hover(screen.getByRole('img', { name: 'More information' }));
      userEvent.unhover(screen.getByRole('img', { name: 'More information' }));
      expect(screen.getByRole('textbox', { name: requiredProps.label })).toHaveAccessibleDescription('');
    });
  });
});
