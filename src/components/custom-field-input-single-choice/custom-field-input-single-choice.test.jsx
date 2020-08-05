import React, { createRef } from 'react';
import { render, fireEvent, cleanup, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderer from 'react-test-renderer';
import { waitFor } from '@testing-library/dom';
import CustomFieldInputSingleChoice from './custom-field-input-single-choice.jsx';

describe('src/components/custom-field-input-single-choice/custom-field-input-single-choice', () => {
  const requiredProps = {
    id: 'test-id',
    label: 'Test label',
  };

  afterEach(cleanup);

  it('has defaults', () => {
    const tree = renderer.create(<CustomFieldInputSingleChoice {...requiredProps} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  describe('accessibility', () => {
    const choices = [{
      id: 'foo',
      label: 'foo',
    }, {
      id: 'bar',
      label: 'bar',
    }];

    it('shows choices when clicked', () => {
      render(<CustomFieldInputSingleChoice {...requiredProps} choices={choices} />);
      userEvent.click(screen.getByLabelText('Test label'));

      expect(screen.getByText('foo')).toBeInTheDocument();
      expect(screen.getByText('bar')).toBeInTheDocument();
    });

    it('does not show option when focused, but shows when enter key is pressed', () => {
      render(<CustomFieldInputSingleChoice {...requiredProps} choices={choices} />);
      userEvent.tab();

      expect(screen.getByLabelText('Test label')).toHaveFocus();
      expect(screen.queryByText('foo')).not.toBeInTheDocument();
      expect(screen.queryByText('bar')).not.toBeInTheDocument();

      fireEvent.keyDown(document.activeElement, { key: 'Enter' });
      expect(screen.getByText('foo')).toBeInTheDocument();
      expect(screen.getByText('bar')).toBeInTheDocument();
    });

    it('hides choices when ESC is pressed', () => {
      render(<CustomFieldInputSingleChoice {...requiredProps} choices={choices} />);
      userEvent.click(screen.getByLabelText('Test label'));
      expect(screen.getByText('foo')).toBeInTheDocument();
      expect(screen.getByText('bar')).toBeInTheDocument();

      fireEvent.keyDown(document.activeElement, { key: 'Escape' });
      expect(screen.queryByText('foo')).not.toBeInTheDocument();
      expect(screen.queryByText('bar')).not.toBeInTheDocument();
    });

    it('focuses on the first choice with tab', () => {
      render(<CustomFieldInputSingleChoice {...requiredProps} choices={choices} />);
      userEvent.click(screen.getByLabelText('Test label'));
      userEvent.tab();

      expect(document.activeElement.innerHTML).toBe('foo');
    });

    it('focuses on the second choice with down arrow', () => {
      render(<CustomFieldInputSingleChoice {...requiredProps} choices={choices} />);
      userEvent.click(screen.getByLabelText('Test label'));
      userEvent.tab();
      fireEvent.keyDown(document.activeElement, { key: 'ArrowDown' });

      expect(document.activeElement.innerHTML).toBe('bar');
    });

    it('focuses the input after selection', () => {
      render(<CustomFieldInputSingleChoice {...requiredProps} choices={choices} />);
      userEvent.click(screen.getByLabelText('Test label'));
      expect(screen.queryAllByRole('option', 'bar')[0]).toBeInTheDocument();

      userEvent.click(screen.getByText('foo'));
      expect(screen.getByLabelText('Test label')).toHaveFocus();
      expect(screen.queryAllByRole('option', 'bar')[0]).toBeUndefined();
    });
  });

  describe('choices', () => {
    it('informs user when there are no choices available', () => {
      render(<CustomFieldInputSingleChoice {...requiredProps} choices={[]} />);
      userEvent.click(screen.getByLabelText('Test label'));
      expect(screen.getByText('No options available.')).toBeInTheDocument();
    });

    it('does not inform the user when there are choices available', () => {
      render(<CustomFieldInputSingleChoice {...requiredProps} choices={[{ id: '1', label: 'yo' }]} />);
      userEvent.click(screen.getByLabelText('Test label'));
      expect(screen.queryByText('No options available.')).not.toBeInTheDocument();
    });
  });

  describe('errorText', () => {
    it('sets the input to be invalid', () => {
      render(<CustomFieldInputSingleChoice {...requiredProps} errorText="not valid" />);
      expect(screen.getByLabelText('Test label')).not.toBeValid();
    });
  });

  describe('filtering', () => {
    const choices = [{
      id: '1',
      label: 'Hey',
    }, {
      id: '2',
      label: 'Hi',
    }];

    it('occurs when provided text to filter on', () => {
      render(<CustomFieldInputSingleChoice {...requiredProps} choices={choices} />);
      userEvent.click(screen.getByLabelText('Test label'));
      userEvent.type(document.activeElement, 'he');

      expect(screen.getByText('Hey')).toBeInTheDocument();
      expect(screen.queryByText('Hi')).not.toBeInTheDocument();
    });

    it('allows filtering when focused on the component', () => {
      render(<CustomFieldInputSingleChoice {...requiredProps} choices={choices} />);
      userEvent.tab();
      userEvent.type(document.activeElement, 'he', { skipClick: true });

      expect(document.activeElement).toHaveValue('he');
      expect(screen.queryByText('Hey')).toBeInTheDocument();
      expect(screen.queryByText('Hi')).not.toBeInTheDocument();
    });

    it('respects deleting the value', () => {
      render(<CustomFieldInputSingleChoice {...requiredProps} choices={choices} />);
      userEvent.click(screen.getByLabelText('Test label'));
      userEvent.click(screen.getByText('Hey'));
      userEvent.click(screen.getByLabelText('Test label'));
      fireEvent.change(document.activeElement, { target: { value: '' } });

      expect(document.activeElement).toHaveValue('');
    });

    it('allows selection on filtering', () => {
      render(<CustomFieldInputSingleChoice {...requiredProps} choices={choices} />);
      userEvent.click(screen.getByLabelText('Test label'));
      userEvent.type(document.activeElement, 'he');
      userEvent.click(screen.getByText('Hey'));

      expect(document.activeElement).toHaveValue('Hey');
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

    it('does not show the listbox', () => {
      render(<CustomFieldInputSingleChoice {...requiredProps} readOnly={true} choices={[{ id: '1', label: 'yo' }]} />);
      userEvent.click(screen.getByLabelText('Test label'));
      expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
    });

    it('shows the listbox', () => {
      render(<CustomFieldInputSingleChoice {...requiredProps} readOnly={false} choices={[{ id: '1', label: 'yo' }]} />);
      userEvent.click(screen.getByLabelText('Test label'));
      expect(screen.queryByRole('listbox')).toBeInTheDocument();
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

  describe('selection', () => {
    const choices = [{
      id: 'broke',
      label: 'broke my heart',
    }, {
      id: 'now',
      label: "now I'm aching for you",
    }];

    it('sets the value of the input', () => {
      render(<CustomFieldInputSingleChoice {...requiredProps} label="Oh La Mort" id="hey" choices={choices} />);
      userEvent.click(screen.getByLabelText('Oh La Mort'));
      userEvent.click(screen.getByText('broke my heart'));

      expect(screen.getByLabelText('Oh La Mort')).toHaveValue('broke my heart');
    });

    it('keeps the selected value selected', () => {
      render(<CustomFieldInputSingleChoice {...requiredProps} label="Oh La Mort" id="hey" choices={choices} />);
      userEvent.click(screen.getByLabelText('Oh La Mort'));
      userEvent.click(screen.getByText('broke my heart'));
      userEvent.click(screen.getByLabelText('Oh La Mort'));

      expect(screen.getByText('broke my heart')).toHaveAttribute('aria-selected', 'true');
    });
  });

  describe('value API', () => {
    it('accepts a value', () => {
      const value = { id: 'some-selection', label: 'Some selection' };
      render(<CustomFieldInputSingleChoice {...requiredProps} value={value} />);
      expect(screen.getByLabelText('Test label')).toHaveValue('Some selection');
    });

    it('provided value sets the corresponding list item as selected', () => {
      const value = { id: 'hello', label: 'hello' };
      const choices = [value];
      render(<CustomFieldInputSingleChoice {...requiredProps} value={value} choices={choices} />);
      userEvent.click(screen.getByLabelText('Test label'));

      expect(screen.getByText('hello')).toHaveAttribute('aria-selected', 'true');
    });
  });

  describe('clear', () => {
    it('clears a value, hides the icon, and focuses the input', () => {
      const value = { id: 'some-selection', label: 'Some selection' };
      render(<CustomFieldInputSingleChoice {...requiredProps} value={value} />);
      expect(screen.getByLabelText('Test label')).toHaveValue('Some selection');
      userEvent.click(screen.getByRole('button'));
      expect(screen.getByLabelText('Test label')).toHaveValue('');
      expect(screen.getByLabelText('Test label', { selector: 'input' })).toHaveFocus();
    });

    it('clears a value when enter is pressed on the clear icon and the clear icon can be focused for accessibility', () => {
      const value = { id: 'some-selection', label: 'Some selection' };
      render(<CustomFieldInputSingleChoice {...requiredProps} value={value} />);
      expect(screen.getByLabelText('Test label')).toHaveValue('Some selection');
      userEvent.click(screen.getByLabelText('Test label', { selector: 'input' }));
      userEvent.tab();
      expect(screen.getByRole('button', { name: 'Remove selected choice' })).toHaveFocus();
      fireEvent.keyDown(screen.getByRole('button', { name: 'Remove selected choice' }).firstChild, { key: 'Enter', code: 'Enter' });
      expect(screen.getByLabelText('Test label')).toHaveValue('');
    });

    describe('when the input choice is readOnly', () => {
      it('does not show the clear icon', () => {
        const value = { id: 'some-selection', label: 'Some selection' };
        render(<CustomFieldInputSingleChoice {...requiredProps} value={value} readOnly />);
        // Only one img, the caret down and the clear icon is not present; implicitly declared by getByRole
        expect(screen.getByRole('img').firstChild).toHaveAttribute('xlink:href', '#icon-caret-down-disabled.svg');
      });
    });
  });

  describe('forwardRef API', () => {
    it('can be used to get value', () => {
      const inputRef = createRef(null);
      const value = { id: 'hello', label: 'hello' };
      const choices = [value];
      render(<CustomFieldInputSingleChoice {...requiredProps} value={value} choices={choices} ref={inputRef} />);

      userEvent.click(screen.getByLabelText('Test label'));
      expect(inputRef.current.value).toStrictEqual(value);
    });
  });

  describe('dropdown close behavior', () => {
    it('closes the dropdown when clicking outside', async () => {
      const choices = [{
        id: 'broke',
        label: 'broke my heart',
      }, {
        id: 'now',
        label: "now I'm aching for you",
      }];

      render(
        <div>
          <span>CLOSE</span>
          <CustomFieldInputSingleChoice {...requiredProps} choices={choices} />
        </div>,
      );

      userEvent.click(screen.getByLabelText('Test label'));
      expect(screen.getByText('broke my heart')).toBeInTheDocument();
      userEvent.click(screen.getByText('CLOSE'));
      await waitFor(() => expect(screen.queryByText('broke my heart')).not.toBeInTheDocument());
    });

    it('closes the dropdown when tabbing away', async () => {
      const choices = [{
        id: 'broke',
        label: 'broke my heart',
      }, {
        id: 'now',
        label: "now I'm aching for you",
      }];

      render(
        <div>
          <CustomFieldInputSingleChoice {...requiredProps} choices={choices} />
          <button></button>
        </div>,
      );

      userEvent.click(screen.getByLabelText('Test label'));
      expect(screen.getByText('broke my heart')).toBeInTheDocument();

      userEvent.tab();
      userEvent.tab();
      userEvent.tab();
      userEvent.tab();
      userEvent.tab();

      await waitFor(() => expect(screen.queryByText('broke my heart')).not.toBeInTheDocument());
    });

    it('resets the inputs state', async () => {
      const choices = [{
        id: 'broke',
        label: 'broke my heart',
      }, {
        id: 'now',
        label: "now I'm aching for you",
      }];

      render(
        <div>
          <span>CLOSE</span>
          <CustomFieldInputSingleChoice {...requiredProps} choices={choices} />
        </div>,
      );

      expect(screen.getByLabelText('Test label')).toHaveValue('');
      userEvent.type(screen.getByLabelText('Test label'), 'broke my');
      expect(screen.getByLabelText('Test label', { selector: 'input' })).toHaveValue('broke my');
      expect(screen.getByText('broke my heart')).toBeInTheDocument();
      userEvent.click(screen.getByText('CLOSE'));

      await waitFor(() => expect(screen.getByLabelText('Test label')).toHaveValue(''));
    });
  });
});
