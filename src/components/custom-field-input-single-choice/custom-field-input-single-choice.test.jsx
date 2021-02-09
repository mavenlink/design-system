import React, { createRef } from 'react';
import {
  fireEvent,
  render,
  screen,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CustomFieldInputSingleChoice from './custom-field-input-single-choice.jsx';

describe('src/components/custom-field-input-single-choice/custom-field-input-single-choice', () => {
  const requiredProps = {
    id: 'test-id',
    label: 'Test label',
    name: 'field-id',
  };

  it('has defaults', () => {
    const ref = createRef();
    render(<CustomFieldInputSingleChoice {...requiredProps} ref={ref} />);
    expect(document.body).toMatchSnapshot();
    expect(ref.current).toMatchSnapshot();
  });

  describe('className API', () => {
    it('prioritizes className prop', () => {
      const { container } = render(<CustomFieldInputSingleChoice {...requiredProps} className="prioritize-me" />);
      expect(container.firstChild).toHaveClass('prioritize-me');
    });
  });

  describe('dirty ref API', () => {
    it('updates on user interactions', () => {
      const choices = [{
        id: 1,
        label: 'foo',
      }];
      const ref = createRef();
      render(<CustomFieldInputSingleChoice {...requiredProps} choices={choices} ref={ref} />);
      userEvent.click(screen.getByLabelText('Test label'));
      userEvent.click(screen.getByText('foo'));
      expect(ref.current.dirty).toEqual(true);
      userEvent.click(screen.getByText('Remove selected choice'));
      expect(ref.current.dirty).toEqual(false);
    });
  });

  describe('errorText', () => {
    it('sets the input to be invalid', () => {
      render(<CustomFieldInputSingleChoice {...requiredProps} errorText="not valid" />);
      expect(screen.getByLabelText('Test label')).not.toBeValid();
    });
  });

  describe('id API', () => {
    it('accepts an ID', () => {
      render(<CustomFieldInputSingleChoice {...requiredProps} id="this-is-an-id" />);
      expect(screen.getByLabelText('Test label')).toHaveAttribute('id', 'this-is-an-id');
    });
  });

  describe('label API', () => {
    it('accepts a label', () => {
      render(<CustomFieldInputSingleChoice {...requiredProps} label="Bar" />);
      expect(screen.getByLabelText('Bar')).toBeDefined();
    });
  });

  describe('placeholder API', () => {
    it('accepts a placeholder', () => {
      render(<CustomFieldInputSingleChoice {...requiredProps} placeholder="I am place" />);
      expect(screen.getByLabelText('Test label')).toHaveAttribute('placeholder', 'I am place');
    });
  });

  describe('readOnly API', () => {
    it('sets the readonly attribute', () => {
      render(<CustomFieldInputSingleChoice {...requiredProps} readOnly />);
      expect(screen.getByLabelText('Test label')).toHaveAttribute('readonly', '');
    });

    it('unsets the readonly attribute', () => {
      render(<CustomFieldInputSingleChoice {...requiredProps} readOnly={false} />);
      expect(screen.getByLabelText('Test label')).not.toHaveAttribute('readonly', '');
    });
  });

  describe('required API', () => {
    it('sets the required attribute', () => {
      render(<CustomFieldInputSingleChoice {...requiredProps} required />);
      expect(screen.getByLabelText('Test label')).toBeRequired();
    });

    it('unsets the required attribute', () => {
      render(<CustomFieldInputSingleChoice {...requiredProps} required={false} />);
      expect(screen.getByLabelText('Test label')).not.toBeRequired();
    });
  });

  describe('value API', () => {
    const choices = [{
      id: 1,
      label: 'Some selection',
    }, {
      id: 2,
      label: 'A new selection',
    }];

    it('accepts a value', () => {
      const value = { id: 1, label: 'Some selection' };
      render(<CustomFieldInputSingleChoice {...requiredProps} value={value} />);
      expect(screen.getByLabelText('Test label')).toHaveValue('Some selection');
    });

    it('provided value sets the corresponding list item as selected', () => {
      render(<CustomFieldInputSingleChoice {...requiredProps} choices={choices} value={choices[0]} />);
      userEvent.click(screen.getByLabelText('Test label'));
      expect(screen.getByText('Some selection')).toHaveAttribute('aria-selected', 'true');
    });

    it('updates its value', () => {
      const { rerender } = render(<CustomFieldInputSingleChoice
        {...requiredProps}
        choices={choices}
        value={choices[0]}
      />);
      rerender(<CustomFieldInputSingleChoice {...requiredProps} choices={choices} value={choices[1]} />);
      expect(screen.getByLabelText('Test label')).toHaveValue('A new selection');
    });
  });

  describe('forwardRef API', () => {
    it('can be used to get value as array of selected id', () => {
      const inputRef = createRef(null);
      const value = { id: 1, label: 'hello' };
      const choices = [value];
      render(<CustomFieldInputSingleChoice {...requiredProps} value={value} choices={choices} ref={inputRef} />);

      userEvent.click(screen.getByLabelText('Test label'));
      expect(inputRef.current.value).toStrictEqual([Number(value.id)]);
    });
  });

  describe('onChange API', () => {
    const choices = [{
      id: 1,
      label: 'broke my heart',
    }, {
      id: 2,
      label: "now I'm aching for you",
    }];

    it('calls onChange when a new value is selected', () => {
      let changeValue = '';
      const onChange = (event) => {
        changeValue = event.target.value;
      };

      render(<CustomFieldInputSingleChoice {...requiredProps} label="Oh La Mort" id="hey" choices={choices} onChange={onChange} />);

      userEvent.click(screen.getByLabelText('Oh La Mort'));
      userEvent.click(screen.getByText('broke my heart'));

      expect(changeValue).toStrictEqual([1]);

      fireEvent.keyDown(screen.getByRole('button', { name: 'Remove selected choice' }).firstChild, { key: 'Enter', code: 'Enter' });
      userEvent.click(screen.getByLabelText('Oh La Mort'));
      userEvent.click(screen.getByText('now I\'m aching for you'));

      expect(changeValue).toStrictEqual([2]);
    });

    it('is not called when provided a new value prop', () => {
      const onChangeSpy = jest.fn();
      const { rerender } = render(<CustomFieldInputSingleChoice {...requiredProps} choices={choices} onChange={onChangeSpy} value={choices[0]} />);
      expect(onChangeSpy).not.toHaveBeenCalled();
      rerender(<CustomFieldInputSingleChoice {...requiredProps} choices={choices} onChange={onChangeSpy} value={choices[1]} />);
      expect(onChangeSpy).not.toHaveBeenCalled();
    });
  });
});
