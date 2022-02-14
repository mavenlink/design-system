import React, {
  createRef,
} from 'react';
import {
  render,
  screen,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Percentage from './percentage.jsx';

describe('Percentage', () => {
  const requiredProps = {
    id: 'foo',
    label: 'the label',
  };

  it('has defaults', () => {
    const ref = createRef();
    render(<Percentage {...requiredProps} ref={ref} />);
    expect(document.body).toMatchSnapshot();
    expect(ref.current).toMatchSnapshot();
  });

  describe('className API', () => {
    it('sets <input> className', () => {
      render(<Percentage {...requiredProps} className="test-class" />);
      expect(screen.getByLabelText('the label')).toHaveClass('test-class');
    });
  });

  describe('cssContainer API', () => {
    it('sets container className', () => {
      render(<Percentage {...requiredProps} cssContainer="test-class" />);
      expect(screen.getByLabelText('the label').parentElement.parentElement.parentElement).toHaveClass('test-class');
    });
  });

  describe('dirty API', () => {
    it('is unset without any changes', () => {
      const ref = createRef();
      render(<Percentage {...requiredProps} ref={ref} />);
      expect(ref.current.dirty).toBe(false);
    });

    it('is set with any changes', () => {
      const ref = createRef();
      render(<Percentage {...requiredProps} ref={ref} />);
      userEvent.type(screen.getByLabelText('the label'), '1');
      expect(ref.current.dirty).toBe(true);
    });

    it('is unset with changes back to initial state', () => {
      const ref = createRef();
      render(<Percentage {...requiredProps} ref={ref} />);
      userEvent.type(screen.getByLabelText('the label'), '1');
      userEvent.type(screen.getByLabelText('the label'), '{backspace}');
      expect(ref.current.dirty).toBe(false);
    });

    it('is unset with changes and new value prop', () => {
      const ref = createRef();
      const { rerender } = render(<Percentage {...requiredProps} ref={ref} />);
      userEvent.type(screen.getByLabelText('the label'), '1');
      rerender(<Percentage {...requiredProps} ref={ref} value={1} />);
      expect(ref.current.dirty).toBe(false);
    });
  });

  describe('id API', () => {
    it('sets the ID', () => {
      render(<Percentage {...requiredProps} id="test-id" />);
      expect(screen.getByLabelText('the label')).toHaveAttribute('id', 'test-id');
    });

    it('is set on the ref', () => {
      const ref = createRef();
      render(<Percentage {...requiredProps} id="unique-id" ref={ref} />);
      expect(ref.current.id).toBe('unique-id');
    });
  });

  describe('label API', () => {
    it('can be set', () => {
      render(<Percentage {...requiredProps} label="Unique label" />);
      expect(screen.getByLabelText('Unique label')).toBeInTheDocument();
    });
  });

  describe('name API', () => {
    it('sets the name attribute', () => {
      render(<Percentage {...requiredProps} name="test-name" />);
      expect(screen.getByLabelText('the label')).toHaveAttribute('name', 'test-name');
    });

    it('is set on the ref', () => {
      const ref = createRef();
      render(<Percentage {...requiredProps} name="unique-name" ref={ref} />);
      expect(ref.current.name).toBe('unique-name');
    });
  });

  describe('onChange API', () => {
    it('sets the onchange handler', () => {
      const onChangeSpy = jest.fn();
      render(<Percentage {...requiredProps} onChange={onChangeSpy} />);
      userEvent.type(screen.getByLabelText('the label'), '100');
      expect(onChangeSpy.mock.calls.length).toEqual(3);
    });
  });

  describe('placeholder API', () => {
    it('sets the placeholder attribute', () => {
      render(<Percentage {...requiredProps} placeholder="test-placeholder" />);
      expect(screen.getByLabelText('the label')).toHaveAttribute('placeholder', 'test-placeholder');
    });
  });

  describe('readOnly API', () => {
    it('sets the readOnly attribute', () => {
      const { rerender } = render(<Percentage {...requiredProps} readOnly />);
      expect(screen.getByLabelText('the label')).toHaveAttribute('readonly');

      rerender(<Percentage {...requiredProps} readOnly={false} />);
      expect(screen.getByLabelText('the label')).not.toHaveAttribute('readonly');
    });
  });

  describe('ref API', () => {
    it('can be set', () => {
      const ref = React.createRef();
      render(<Percentage {...requiredProps} ref={ref} value={100} />);
      expect(ref.current.value).toEqual(100);
    });
  });

  describe('required API', () => {
    it('can be set', () => {
      render(<Percentage {...requiredProps} required={true} />);
      expect(screen.getByLabelText('the label')).toBeRequired();
      expect(screen.getByLabelText('the label')).toBeInvalid();
    });

    it('can be unset', () => {
      render(<Percentage {...requiredProps} required={false} />);
      expect(screen.getByLabelText('the label')).not.toBeRequired();
      expect(screen.getByLabelText('the label')).toBeValid();
    });

    it('is invalid on mount but does not have an error message', () => {
      render(<Percentage {...requiredProps} required={true} />);
      expect(screen.getByLabelText('the label')).toBeInvalid();
      expect(screen.getByLabelText('the label')).toHaveAccessibleDescription('');
    });

    it('is invalid after tabbing through', async () => {
      render(<Percentage {...requiredProps} required={true} />);
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

  describe('tooltip API', () => {
    const tooltip = 'I am an input, short and stout.';

    it('applies a description to the input when the help icon is hovered', () => {
      render(<Percentage {...requiredProps} tooltip={tooltip} />);
      userEvent.hover(screen.getByRole('img', { name: 'More information' }));
      expect(screen.getByLabelText(requiredProps.label)).toHaveAccessibleDescription(tooltip);
    });

    it('removes the description to the input when the help icon is unhovered', () => {
      render(<Percentage {...requiredProps} tooltip={tooltip} />);
      userEvent.hover(screen.getByRole('img', { name: 'More information' }));
      userEvent.unhover(screen.getByRole('img', { name: 'More information' }));
      expect(screen.getByLabelText(requiredProps.label)).toHaveAccessibleDescription('');
    });
  });

  describe('validationMessage API', () => {
    it('can be set', () => {
      render(<Percentage {...requiredProps} validationMessage="unique error" />);
      expect(screen.getByLabelText('the label')).toBeInvalid();
      expect(screen.getByLabelText('the label')).toHaveAccessibleDescription('unique error');
      expect(screen.getByRole('img', { name: 'unique error' })).toBeInTheDocument();
    });

    it('can be unset', () => {
      render(<Percentage {...requiredProps} validationMessage="" />);
      expect(screen.getByLabelText('the label')).toBeValid();
      expect(screen.getByLabelText('the label')).toHaveAccessibleDescription('');
    });
  });

  describe('value API', () => {
    it('sets the value', () => {
      render(<Percentage {...requiredProps} value={100} />);
      expect(screen.getByLabelText('the label')).toHaveValue(100);
    });

    it('updates the value', () => {
      const { rerender } = render(<Percentage {...requiredProps} value={1} />);
      rerender(<Percentage {...requiredProps} value={100} />);
      expect(screen.getByLabelText('the label')).toHaveValue(100);
    });

    it('set on the ref', () => {
      const ref = createRef();
      const { rerender } = render(<Percentage {...requiredProps} ref={ref} value={1} />);
      expect(ref.current.value).toBe(1);
      userEvent.type(screen.getByLabelText('the label'), '2');
      expect(ref.current.value).toBe(12);

      rerender(<Percentage {...requiredProps} ref={ref} value={undefined} />);
      expect(ref.current.value).toBeUndefined();
      userEvent.type(screen.getByLabelText('the label'), '1');
      expect(ref.current.value).toBe(1);
    });
  });
});
