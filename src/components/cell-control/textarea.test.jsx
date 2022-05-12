import React, { createRef } from 'react';
import { render as _render, screen } from '@testing-library/react';
import user from '@testing-library/user-event';
import Textarea from './textarea.jsx';

const render = (ui, options = { labelledBy: 'labelled-by' }) => (
  _render(ui, {
    ...options,
    wrapper: props => (
      <table>
        <thead>
          <tr>
            <th id={options.labelledBy}>Column Header</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            {props.children}
          </tr>
        </tbody>
      </table>
    ),
  })
);

describe('Textarea cell control', () => {
  const requiredProps = {
    labelledBy: 'labelled-by',
    id: 'test-id',
  };

  it('has defaults', () => {
    const ref = createRef();
    render(<Textarea {...requiredProps} ref={ref} />);
    expect(document.body).toMatchSnapshot();
    expect(ref.current).toMatchSnapshot();
  });

  describe('className API', () => {
    it('sets container class name', () => {
      render(<Textarea {...requiredProps} classNames={{ container: 'unique-class-container' }} />);
      expect(document.body).toMatchSnapshot();
    });

    it('sets textarea class name', () => {
      render(<Textarea {...requiredProps} classNames={{ textarea: 'unique-class-textarea' }} />);
      expect(document.body).toMatchSnapshot();
    });

    it('sets all class names', () => {
      render(<Textarea
        {...requiredProps}
        classNames={{
          container: 'unique-class-container',
          textarea: 'unique-class-textarea',
        }}
      />);
      expect(document.body).toMatchSnapshot();
    });
  });

  describe('labelledBy API', () => {
    it('references the column header', () => {
      render(<Textarea {...requiredProps} labelledBy="unique-labelled-by" />, { labelledBy: 'unique-labelled-by' });
      expect(document.body).toMatchSnapshot();
    });
  });

  describe('id API', () => {
    it('sets the ID on the textarea', () => {
      render(<Textarea {...requiredProps} id="unique-id" />);
      expect(document.body).toMatchSnapshot();
    });
  });

  describe('onChange API', () => {
    it('is called', () => {
      const onChange = jest.fn();
      render(<Textarea {...requiredProps} onChange={onChange} />);
      expect(onChange).not.toHaveBeenCalled();
      user.type(screen.getByRole('textbox'), 'test text');
      expect(onChange).toHaveBeenCalled();
    });
  });

  describe('placeholder API', () => {
    it('is set', () => {
      render(<Textarea {...requiredProps} placeholder="Unique placeholder" />);
      expect(screen.getByRole('textbox')).toHaveAttribute('placeholder', 'Unique placeholder');
    });
  });

  describe('readOnly API', () => {
    it('is set', () => {
      render(<Textarea {...requiredProps} readOnly={true} />);
      expect(screen.getByRole('textbox')).toHaveAttribute('readonly');
    });

    it('is unset', () => {
      render(<Textarea {...requiredProps} readOnly={false} />);
      expect(screen.getByRole('textbox')).not.toHaveAttribute('readonly');
    });
  });

  describe('required API', () => {
    it('is set', () => {
      render(<Textarea {...requiredProps} required={true} />);
      expect(screen.getByRole('textbox')).toHaveAttribute('required');
    });

    it('is unset', () => {
      render(<Textarea {...requiredProps} required={false} />);
      expect(screen.getByRole('textbox')).not.toHaveAttribute('required');
    });
  });

  describe('validationMessage API', () => {
    it('is set', () => {
      render(<Textarea {...requiredProps} validationMessage="Unique validationMessage" />);
      expect(screen.getByRole('textbox')).toBeInvalid();
      expect(screen.getByRole('textbox')).toHaveAccessibleDescription('Unique validationMessage');
    });
  });

  describe('value API', () => {
    it('is set', () => {
      const ref = createRef();
      render(<Textarea {...requiredProps} ref={ref} value="Unique value" />);
      expect(screen.getByRole('textbox')).toHaveValue('Unique value');
      expect(ref.current.value).toBe('Unique value');
    });
  });

  describe('onFocus API', () => {
    it('calls onFocus', () => {
      const onFocus = jest.fn(event => event.persist());
      render(<Textarea {...requiredProps} onFocus={onFocus} />);
      const textbox = screen.getByRole('textbox');
      user.click(textbox);
      expect(onFocus).toHaveBeenCalledWith(expect.objectContaining({
        type: 'focus',
        target: textbox,
      }));
    });
  });

  describe('onBlur API', () => {
    it('calls onBlur', () => {
      const onBlur = jest.fn(event => event.persist());
      render(<Textarea {...requiredProps} onBlur={onBlur} />);
      const textbox = screen.getByRole('textbox');
      user.click(textbox);
      user.tab();
      expect(onBlur).toHaveBeenCalledWith(expect.objectContaining({
        type: 'blur',
        target: textbox,
      }));
    });
  });
});
