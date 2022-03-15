import React, {
  createRef,
} from 'react';
import {
  render,
  screen,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Textarea from './textarea.jsx';

describe('Textarea', () => {
  const requiredProps = {
    id: 'foo',
    label: 'the label',
  };

  it('has defaults', () => {
    const ref = createRef();
    render(<Textarea {...requiredProps} ref={ref} />);
    expect(document.body).toMatchSnapshot();
    expect(ref.current).toMatchSnapshot();
  });

  describe('className API', () => {
    it('sets <textarea> className', () => {
      render(<Textarea {...requiredProps} className="test-class" />);
      expect(screen.getByLabelText('the label')).toHaveClass('test-class');
    });
  });

  describe('cssContainer API', () => {
    it('sets <textarea> container className', () => {
      render(<Textarea {...requiredProps} cssContainer="test-class" />);
      expect(screen.getByLabelText('the label').parentElement.parentElement.parentElement).toHaveClass('test-class');
    });
  });

  describe('dirty API', () => {
    it('is unset without any changes', () => {
      const ref = createRef();
      render(<Textarea {...requiredProps} ref={ref} />);
      expect(ref.current.dirty).toBe(false);
    });

    it('is set with any changes', () => {
      const ref = createRef();
      render(<Textarea {...requiredProps} ref={ref} />);
      userEvent.type(screen.getByLabelText('the label'), 'a');
      expect(ref.current.dirty).toBe(true);
    });

    it('is unset with changes back to initial state', () => {
      const ref = createRef();
      render(<Textarea {...requiredProps} ref={ref} />);
      userEvent.type(screen.getByLabelText('the label'), 'a');
      userEvent.type(screen.getByLabelText('the label'), '{backspace}');
      expect(ref.current.dirty).toBe(false);
    });

    it('is unset with changes and new value prop', () => {
      const ref = createRef();
      const { rerender } = render(<Textarea {...requiredProps} ref={ref} />);
      userEvent.type(screen.getByLabelText('the label'), 'a');
      rerender(<Textarea {...requiredProps} ref={ref} value="a" />);
      expect(ref.current.dirty).toBe(false);
    });
  });

  describe('id API', () => {
    it('sets the ID', () => {
      render(<Textarea {...requiredProps} id="test-id" />);
      expect(screen.getByLabelText('the label')).toHaveAttribute('id', 'test-id');
    });

    it('is set on the ref', () => {
      const ref = createRef();
      render(<Textarea {...requiredProps} id="unique-id" ref={ref} />);
      expect(ref.current.id).toBe('unique-id');
    });
  });

  describe('label API', () => {
    it('can be set', () => {
      render(<Textarea {...requiredProps} label="Unique label" />);
      expect(screen.getByLabelText('Unique label')).toBeInTheDocument();
    });
  });

  describe('name API', () => {
    it('sets the name attribute', () => {
      render(<Textarea {...requiredProps} name="test-name" />);
      expect(screen.getByLabelText('the label')).toHaveAttribute('name', 'test-name');
    });

    it('is set on the ref', () => {
      const ref = createRef();
      render(<Textarea {...requiredProps} name="unique-name" ref={ref} />);
      expect(ref.current.name).toBe('unique-name');
    });
  });

  describe('onBlur API', () => {
    it('sets the onblur handler', () => {
      const onBlurSpy = jest.fn();
      render(
        <React.Fragment>
          <Textarea {...requiredProps} onBlur={onBlurSpy} />
          <span>Test Text</span>
        </React.Fragment>,
      );
      userEvent.click(screen.getByLabelText('the label'));
      userEvent.click(screen.getByText('Test Text'));
      expect(onBlurSpy.mock.calls.length).toEqual(1);
    });
  });

  describe('onChange API', () => {
    it('sets the onchange handler', () => {
      const onChangeSpy = jest.fn();
      render(<Textarea {...requiredProps} onChange={onChangeSpy} />);
      userEvent.type(screen.getByLabelText('the label'), 'new value');
      expect(onChangeSpy.mock.calls.length).toEqual(9);
    });
  });

  describe('placeholder API', () => {
    it('sets the placeholder attribute', () => {
      render(<Textarea {...requiredProps} placeholder="test-placeholder" />);
      expect(screen.getByLabelText('the label')).toHaveAttribute('placeholder', 'test-placeholder');
    });
  });

  describe('readOnly API', () => {
    it('sets the readOnly attribute', () => {
      render(<Textarea {...requiredProps} readOnly />);
      expect(screen.getByLabelText('the label')).toHaveAttribute('readonly');
    });
  });

  describe('ref API', () => {
    it('can be set', () => {
      const ref = React.createRef();
      render(<Textarea {...requiredProps} ref={ref} value="test value" />);
      expect(ref.current.value).toEqual('test value');
    });
  });

  describe('required API', () => {
    it('can be set', () => {
      render(<Textarea {...requiredProps} required={true} />);
      expect(screen.getByLabelText('the label')).toBeRequired();
      expect(screen.getByLabelText('the label')).toBeInvalid();
      expect(screen.queryByText('Constraints not satisfied')).not.toBeInTheDocument();
      expect(screen.getByLabelText('the label')).toHaveAccessibleDescription('');
    });

    it('can be unset', () => {
      render(<Textarea {...requiredProps} required={false} />);
      expect(screen.getByLabelText('the label')).not.toBeRequired();
      expect(screen.getByLabelText('the label')).toBeValid();
    });

    it('is invalid after tabbing through', async () => {
      render(<Textarea {...requiredProps} required={true} />);
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

  describe('validationMessage API', () => {
    it('can be set', () => {
      render(<Textarea {...requiredProps} validationMessage="unique error" />);
      expect(screen.getByLabelText('the label')).toBeInvalid();
      expect(screen.getByLabelText('the label')).toHaveAccessibleDescription('unique error');
      expect(screen.getByRole('img', { name: 'unique error' })).toBeInTheDocument();
    });

    it('can be unset', () => {
      render(<Textarea {...requiredProps} validationMessage="" />);
      expect(screen.getByLabelText('the label')).toBeValid();
      expect(screen.getByLabelText('the label')).toHaveAccessibleDescription('');
    });
  });

  describe('value API', () => {
    it('sets the value', () => {
      render(<Textarea {...requiredProps} value="test-value" />);
      expect(screen.getByLabelText('the label')).toHaveValue('test-value');
    });

    it('updates the value', () => {
      const { rerender } = render(<Textarea {...requiredProps} value="test value" />);
      rerender(<Textarea {...requiredProps} value="another value" />);
      expect(screen.getByLabelText('the label')).toHaveValue('another value');
    });

    it('set on the ref', () => {
      const ref = createRef();
      const { rerender } = render(<Textarea {...requiredProps} ref={ref} value="unique value" />);
      expect(ref.current.value).toBe('unique value');
      userEvent.type(screen.getByLabelText('the label'), '!');
      expect(ref.current.value).toBe('unique value!');

      rerender(<Textarea {...requiredProps} ref={ref} value={undefined} />);
      expect(ref.current.value).toBe('');
      userEvent.type(screen.getByLabelText('the label'), '!');
      expect(ref.current.value).toBe('!');
    });
  });

  describe('tooltip API', () => {
    const tooltip = 'I am an input, short and stout.';

    it('applies a description to the input when the help icon is hovered', () => {
      render(<Textarea {...requiredProps} tooltip={tooltip} />);
      userEvent.hover(screen.getByRole('img', { name: 'More information' }));
      expect(screen.getByLabelText('the label')).toHaveAccessibleDescription(tooltip);
    });

    it('removes the description to the input when the help icon is unhovered', () => {
      render(<Textarea {...requiredProps} tooltip={tooltip} />);
      userEvent.hover(screen.getByRole('img', { name: 'More information' }));
      userEvent.unhover(screen.getByRole('img', { name: 'More information' }));
      expect(screen.getByLabelText('the label')).toHaveAccessibleDescription('');
    });
  });
});
