import React, { createRef } from 'react';
import {
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ListOption from '../list-option/list-option.jsx';
import Select from './select.jsx';

describe('src/components/select/select', () => {
  const baseListOptions = ['foo', 'bar'];
  const baseListOptionRefs = baseListOptions.map(() => createRef());
  const baseListOptionElements = baseListOptions.map((option, index) => {
    return (<ListOption key={option} ref={baseListOptionRefs[index]} value={option}>{option}</ListOption>);
  });
  const requiredProps = {
    id: 'test-id',
    label: 'Test label',
    listOptionRefs: baseListOptionRefs,
    name: 'field-id',
  };

  it('has defaults', () => {
    const ref = createRef();
    render(<Select {...requiredProps} ref={ref} />);
    expect(document.body).toMatchSnapshot();
    expect(ref.current).toMatchSnapshot();
  });

  describe('accessibility', () => {
    it('shows choices when clicked', () => {
      render(<Select {...requiredProps}>{baseListOptionElements}</Select>);
      userEvent.click(screen.getByLabelText('Test label'));

      expect(screen.getByText('foo')).toBeInTheDocument();
      expect(screen.getByText('bar')).toBeInTheDocument();
    });

    it('does not show option when focused, but shows when enter key is pressed', () => {
      render(<Select {...requiredProps}>{baseListOptionElements}</Select>);
      userEvent.tab();

      expect(screen.getByLabelText('Test label')).toHaveFocus();
      expect(screen.queryByText('foo')).not.toBeInTheDocument();
      expect(screen.queryByText('bar')).not.toBeInTheDocument();

      fireEvent.keyDown(document.activeElement, { key: 'Enter' });
      expect(screen.getByText('foo')).toBeInTheDocument();
      expect(screen.getByText('bar')).toBeInTheDocument();
    });

    it('hides choices when ESC is pressed', () => {
      render(<Select {...requiredProps}>{baseListOptionElements}</Select>);
      userEvent.click(screen.getByLabelText('Test label'));
      expect(screen.getByText('foo')).toBeInTheDocument();
      expect(screen.getByText('bar')).toBeInTheDocument();

      fireEvent.keyDown(document.activeElement, { key: 'Escape' });
      expect(screen.queryByText('foo')).not.toBeInTheDocument();
      expect(screen.queryByText('bar')).not.toBeInTheDocument();
    });

    it('focuses on the first choice with tab', () => {
      render(<Select {...requiredProps}>{baseListOptionElements}</Select>);
      userEvent.click(screen.getByLabelText('Test label'));
      userEvent.tab();

      expect(document.activeElement.innerHTML).toBe('foo');
    });

    it('focuses on the second choice with down arrow', async () => {
      render(<Select {...requiredProps}>{baseListOptionElements}</Select>);
      userEvent.click(screen.getByLabelText('Test label'));
      userEvent.tab();
      fireEvent.keyDown(document.activeElement, { key: 'ArrowDown' });

      expect(document.activeElement.innerHTML).toBe('bar');
    });

    it('focuses the input after selection', () => {
      render(<Select {...requiredProps}>{baseListOptionElements}</Select>);
      userEvent.click(screen.getByLabelText('Test label'));
      expect(screen.queryAllByRole('option', 'bar')[0]).toBeInTheDocument();

      userEvent.click(screen.getByText('foo'));
      expect(screen.getByLabelText('Test label')).toHaveFocus();
      expect(screen.queryAllByRole('option', 'bar')[0]).toBeUndefined();
    });

    it('has aria-haspopup, role is combobox, aria-autocomplete is list, and aria-controls references the list box id', () => {
      render(<Select {...requiredProps}>{baseListOptionElements}</Select>);
      expect(screen.getByLabelText('Test label', { selector: '[aria-haspopup="listbox"]' })).toBeInTheDocument();
      expect(screen.getByLabelText('Test label', { selector: 'input' })).toHaveAttribute('aria-autocomplete', 'list');
      expect(screen.getByLabelText('Test label', { selector: 'input' })).toHaveAttribute('aria-controls', 'test-id-single-choice-listbox');
    });

    it('has aria-expanded for accessibility', () => {
      render(<Select {...requiredProps}>{baseListOptionElements}</Select>);
      expect(screen.getByLabelText('Test label', { selector: 'input' })).toHaveAttribute('aria-expanded', 'false');
      userEvent.click(screen.getByLabelText('Test label'));
      expect(screen.getByLabelText('Test label', { selector: 'input' })).toHaveAttribute('aria-expanded', 'true');
    });
  });

  describe('choices', () => {
    it('informs user when there are no choices available', () => {
      render(<Select {...requiredProps} listOptionRefs={[]} />);
      userEvent.click(screen.getByLabelText('Test label'));
      expect(screen.getByText('No options available.')).toBeInTheDocument();
    });

    it('does not inform the user when there are choices available', () => {
      render(<Select {...requiredProps}>{baseListOptionElements}</Select>);
      userEvent.click(screen.getByLabelText('Test label'));
      expect(screen.queryByText('No options available.')).not.toBeInTheDocument();
    });

    it('does not break if the choices are changed', () => {
      const { rerender } = render(<Select {...requiredProps} listOptionRefs={[]} />);
      userEvent.click(screen.getByLabelText('Test label'));
      expect(screen.getByText('No options available.')).toBeInTheDocument();

      rerender(<Select {...requiredProps}>{baseListOptionElements}</Select>);
      userEvent.click(screen.getAllByLabelText('Test label')[0]);
      userEvent.click(screen.getByText('foo'));
    });
  });

  describe('className API', () => {
    it('prioritizes className prop', () => {
      const { container } = render(<Select {...requiredProps} className="prioritize-me">{baseListOptionElements}</Select>);
      expect(container.firstChild).toHaveClass('prioritize-me');
    });
  });

  describe('displayValueEvaluator API', () => {
    it('handles value objects when displayValueEvaluator is provided', () => {
      const selectValue = { id: 0, label: 'foo' };
      render(
        <Select
          {...requiredProps}
          value={selectValue}
          displayValueEvaluator={value => value.label}
        >
          {baseListOptionElements}
        </Select>);
      expect(screen.getByLabelText('Test label')).toHaveValue('foo');
    });
  });

  describe('dirty ref API', () => {
    it('updates on user interactions', () => {
      const ref = createRef();
      render(<Select {...requiredProps} ref={ref}>{baseListOptionElements}</Select>);
      userEvent.click(screen.getByLabelText('Test label'));
      userEvent.click(screen.getByText('foo'));
      expect(ref.current.dirty).toEqual(true);
      userEvent.click(screen.getByText('Remove selected choice'));
      expect(ref.current.dirty).toEqual(false);
    });
  });

  describe('errorText', () => {
    it('sets the input to be invalid', () => {
      render(<Select {...requiredProps} errorText="not valid">{baseListOptionElements}</Select>);
      expect(screen.getByLabelText('Test label')).not.toBeValid();
    });
  });

  describe('filtering', () => {
    it('occurs when provided text to filter on', () => {
      render(<Select {...requiredProps}>{baseListOptionElements}</Select>);
      userEvent.click(screen.getByLabelText('Test label'));
      userEvent.type(document.activeElement, 'fo');

      expect(screen.getByText('foo')).toBeInTheDocument();
      expect(screen.queryByText('bar')).toHaveClass('hidden');
    });

    it('allows filtering when focused on the component', () => {
      render(<Select {...requiredProps}>{baseListOptionElements}</Select>);
      userEvent.tab();
      userEvent.type(document.activeElement, 'fo', { skipClick: true });

      expect(document.activeElement).toHaveValue('fo');
      expect(screen.queryByText('foo')).toBeInTheDocument();
      expect(screen.queryByText('bar')).toHaveClass('hidden');
    });

    it('respects deleting the value', () => {
      render(<Select {...requiredProps}>{baseListOptionElements}</Select>);
      userEvent.click(screen.getByLabelText('Test label'));
      userEvent.click(screen.getByText('foo'));
      userEvent.click(screen.getByLabelText('Test label'));
      fireEvent.change(document.activeElement, { target: { value: '' } });

      expect(document.activeElement).toHaveValue('');
    });

    it('allows selection on filtering', () => {
      render(<Select {...requiredProps}>{baseListOptionElements}</Select>);
      userEvent.click(screen.getByLabelText('Test label'));
      userEvent.type(document.activeElement, 'fo');
      userEvent.click(screen.getByText('foo'));

      expect(document.activeElement).toHaveValue('foo');
    });
  });

  describe('id API', () => {
    it('accepts an ID', () => {
      render(<Select {...requiredProps} id="this-is-an-id">{baseListOptionElements}</Select>);
      expect(screen.getByLabelText('Test label')).toHaveAttribute('id', 'this-is-an-id');
    });
  });

  describe('label API', () => {
    it('accepts a label', () => {
      render(<Select {...requiredProps} label="Bar">{baseListOptionElements}</Select>);
      expect(screen.getByLabelText('Bar')).toBeDefined();
    });
  });

  describe('placeholder API', () => {
    it('accepts a placeholder', () => {
      render(<Select {...requiredProps} placeholder="I am place">{baseListOptionElements}</Select>);
      expect(screen.getByLabelText('Test label')).toHaveAttribute('placeholder', 'I am place');
    });
  });

  describe('readOnly API', () => {
    it('sets the readonly attribute', () => {
      render(<Select {...requiredProps} readOnly>{baseListOptionElements}</Select>);
      expect(screen.getByLabelText('Test label')).toHaveAttribute('readonly', '');
    });

    it('unsets the readonly attribute', () => {
      render(<Select {...requiredProps} readOnly={false}>{baseListOptionElements}</Select>);
      expect(screen.getByLabelText('Test label')).not.toHaveAttribute('readonly', '');
    });

    it('does not show the listbox', () => {
      render(<Select {...requiredProps} readOnly>{baseListOptionElements}</Select>);
      userEvent.click(screen.getByLabelText('Test label'));
      expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
    });

    it('shows the listbox', () => {
      render(<Select {...requiredProps} readOnly={false}>{baseListOptionElements}</Select>);
      userEvent.click(screen.getByLabelText('Test label'));
      expect(screen.queryByRole('listbox')).toBeInTheDocument();
    });
  });

  describe('required API', () => {
    it('sets the required attribute', () => {
      render(<Select {...requiredProps} required>{baseListOptionElements}</Select>);
      expect(screen.getByLabelText('Test label')).toBeRequired();
    });

    it('unsets the required attribute', () => {
      render(<Select {...requiredProps} required={false}>{baseListOptionElements}</Select>);
      expect(screen.getByLabelText('Test label')).not.toBeRequired();
    });
  });

  describe('selection', () => {
    it('sets the value of the input', () => {
      render(<Select {...requiredProps}>{baseListOptionElements}</Select>);
      userEvent.click(screen.getByLabelText('Test label'));
      userEvent.click(screen.getByText('foo'));

      expect(screen.getByLabelText('Test label')).toHaveValue('foo');
    });

    it('keeps the selected value selected', () => {
      render(<Select {...requiredProps}>{baseListOptionElements}</Select>);
      userEvent.click(screen.getByLabelText('Test label'));
      userEvent.click(screen.getByText('foo'));
      userEvent.click(screen.getByLabelText('Test label'));

      expect(screen.getByText('foo')).toHaveAttribute('aria-selected', 'true');
    });

    it('keeps the selected value selected even when value type is complex', () => {
      const listOptions = [{ id: 0, label: 'foo' }];
      const listOptionRefs = listOptions.map(() => React.createRef());
      const listOptionElements = listOptions.map((option, index) => {
        return (<ListOption key={option.id} ref={listOptionRefs[index]} value={option}>{option.label}</ListOption>);
      });

      render(
        <Select
          {...requiredProps}
          value={listOptions[0]}
          displayValueEvaluator={value => value.label}
        >
          {listOptionElements}
        </Select>);
      userEvent.click(screen.getByLabelText('Test label'));
      userEvent.click(screen.getByText('foo'));
      userEvent.click(screen.getAllByLabelText('Test label')[0]);

      expect(screen.getByText('foo')).toHaveAttribute('aria-selected', 'true');
    });
  });

  describe('value API', () => {
    it('accepts a value', () => {
      const value = 'foo';
      render(<Select {...requiredProps} value={value}>{baseListOptionElements}</Select>);
      expect(screen.getByLabelText('Test label')).toHaveValue('foo');
    });

    it('provided value sets the corresponding list item as selected', () => {
      const value = 'bar';
      render(<Select {...requiredProps} value={value}>{baseListOptionElements}</Select>);
      userEvent.click(screen.getByLabelText('Test label'));

      expect(screen.getByText('bar')).toHaveAttribute('aria-selected', 'true');
    });
  });

  describe('clear', () => {
    it('clears a value, hides the icon, and focuses the input', () => {
      const value = 'bar';
      render(<Select {...requiredProps} value={value}>{baseListOptionElements}</Select>);
      expect(screen.getByLabelText('Test label')).toHaveValue('bar');
      userEvent.click(screen.getByRole('button'));
      expect(screen.getByLabelText('Test label')).toHaveValue('');
      expect(screen.getByLabelText('Test label', { selector: 'input' })).toHaveFocus();
    });

    it('clears a value when enter is pressed on the clear icon and the clear icon can be focused for accessibility', () => {
      const value = 'bar';
      render(<Select {...requiredProps} value={value}>{baseListOptionElements}</Select>);
      expect(screen.getByLabelText('Test label')).toHaveValue('bar');
      userEvent.click(screen.getByLabelText('Test label', { selector: 'input' }));
      userEvent.tab();
      expect(screen.getByRole('button', { name: 'Remove selected choice' })).toHaveFocus();
      fireEvent.keyDown(screen.getByRole('button', { name: 'Remove selected choice' }).firstChild, { key: 'Enter', code: 'Enter' });
      expect(screen.getAllByLabelText('Test label')[0]).toHaveValue('');
    });

    describe('when the input choice is readOnly', () => {
      it('does not show the clear icon', () => {
        const value = 'bar';
        render(<Select {...requiredProps} value={value} readOnly>{baseListOptionElements}</Select>);
        // Only one img, the caret down and the clear icon is not present; implicitly declared by getByRole
        expect(screen.getByRole('img').children[1]).toHaveAttribute('xlink:href', '#caret-down-disabled.svg');
      });
    });
  });

  describe('forwardRef API', () => {
    it('can be used to get value as array of selected id', () => {
      const inputRef = createRef(null);
      const value = 'bar';
      render(<Select {...requiredProps} value={value} ref={inputRef}>{baseListOptionElements}</Select>);

      userEvent.click(screen.getByLabelText('Test label'));
      expect(inputRef.current.value).toEqual(value);
    });
  });

  describe('onChange API', () => {
    it('calls onChange when a new value is selected', () => {
      let changeValue = '';
      const onChange = (event) => {
        changeValue = event.target.value;
      };

      render(<Select {...requiredProps} onChange={onChange}>{baseListOptionElements}</Select>);

      userEvent.click(screen.getByLabelText('Test label'));
      userEvent.click(screen.getByText('foo'));

      expect(changeValue).toEqual('foo');

      fireEvent.keyDown(screen.getByRole('button', { name: 'Remove selected choice' }).firstChild, { key: 'Enter', code: 'Enter' });
      userEvent.click(screen.getByLabelText('Test label'));
      userEvent.click(screen.getByText('bar'));

      expect(changeValue).toEqual('bar');
    });
  });

  describe('dropdown close behavior', () => {
    beforeEach(() => {
      render((
        <React.Fragment>
          <Select {...requiredProps} value={baseListOptions[0]}>{baseListOptionElements}</Select>
          <input aria-label="outside" />
        </React.Fragment>
      ));
    });

    it('closes the dropdown when clicking outside', () => {
      userEvent.click(screen.getByLabelText('Test label'));
      expect(screen.getByText('foo')).toBeInTheDocument();
      userEvent.click(screen.getByLabelText('outside'));
      expect(screen.queryByText('foo')).not.toBeInTheDocument();
    });

    it('closes the dropdown when tabbing away', () => {
      userEvent.click(screen.getByLabelText('Test label'));
      expect(screen.getByText('foo')).toBeInTheDocument();
      userEvent.tab();
      userEvent.tab();
      userEvent.tab();
      expect(screen.queryByText('foo')).not.toBeInTheDocument();
    });

    it('sets the input state to the last known choice', () => {
      expect(screen.getByRole('combobox', { name: 'Test label' })).toHaveValue('foo');
      userEvent.type(screen.getByRole('combobox', { name: 'Test label' }), '{backspace}');
      expect(screen.getByRole('combobox', { name: 'Test label' })).toHaveValue('fo');
      userEvent.click(screen.getByLabelText('outside'));
      expect(screen.getByRole('combobox', { name: 'Test label' })).toHaveValue('foo');
    });

    it('leaves the input state as blank', async () => {
      expect(screen.getByRole('combobox', { name: 'Test label' })).toHaveValue('foo');
      userEvent.type(screen.getByRole('combobox', { name: 'Test label' }), '{backspace}{backspace}{backspace}');
      expect(screen.getByRole('combobox', { name: 'Test label' })).toHaveValue('');
      userEvent.click(screen.getByLabelText('outside'));
      expect(screen.getByRole('combobox', { name: 'Test label' })).toHaveValue('');
    });
  });
});
