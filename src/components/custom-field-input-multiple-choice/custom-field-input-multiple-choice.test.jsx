import React, { createRef } from 'react';
import {
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
  getAutocompleter,
  getAvailableChoice,
  getRemoveButton,
  getSelectedChoice,
  queryAvailableChoice,
  querySelectedChoice,
  queryRemoveButton,
} from './test-queries.js';
import CustomFieldInputMultipleChoice from './custom-field-input-multiple-choice.jsx';

describe('<CustomFieldInputMultipleChoice>', () => {
  const requiredProps = {
    choices: [{
      id: 1,
      label: 'Choice 1',
    }, {
      id: 2,
      label: 'Choice 2',
    }],
    id: 'test-id',
    label: 'test label',
    name: 'field-id',
  };

  it('has defaults', () => {
    const ref = createRef();
    render(<CustomFieldInputMultipleChoice {...requiredProps} ref={ref} />);
    expect(document.body).toMatchSnapshot();
    expect(ref.current).toMatchSnapshot();
  });

  describe('autocomplete behavior', () => {
    it('focuses the input on click', () => {
      render(<CustomFieldInputMultipleChoice {...requiredProps} />);
      userEvent.click(screen.getByText('test label'));
      expect(getAutocompleter('test label')).toHaveFocus();
    });

    it('filters visible choices on autocompleter value', () => {
      render(<CustomFieldInputMultipleChoice {...requiredProps} />);
      userEvent.click(getAutocompleter('test label'));
      expect(getAvailableChoice('test label', 'Choice 1')).toBeInTheDocument();
      expect(getAvailableChoice('test label', 'Choice 2')).toBeInTheDocument();
      userEvent.type(document.activeElement, '1');
      expect(getAvailableChoice('test label', 'Choice 1')).toBeInTheDocument();
      expect(queryAvailableChoice('test label', 'Choice 2')).not.toBeInTheDocument();
    });

    it('is clears the autocompleter on selection', () => {
      render(<CustomFieldInputMultipleChoice {...requiredProps} />);
      userEvent.type(getAutocompleter('test label'), '1');
      userEvent.click(getAvailableChoice('test label', 'Choice 1'));
      expect(getAutocompleter('test label')).toHaveValue('');
    });

    it('opens on typing', async () => {
      render(<CustomFieldInputMultipleChoice {...requiredProps} />);
      userEvent.tab();
      expect(getAutocompleter('test label')).toHaveFocus();
      expect(getAutocompleter('test label')).toHaveAttribute('aria-expanded', 'false');
      await userEvent.type(getAutocompleter('test label'), 'Choi', { skipClick: true });
      expect(getAvailableChoice('test label', 'Choice 2')).toBeInTheDocument();
    });

    it('closes on escape key', () => {
      render(<CustomFieldInputMultipleChoice {...requiredProps} />);
      userEvent.click(getAutocompleter('test label'));
      expect(getAutocompleter('test label')).toHaveAttribute('aria-expanded', 'true');
      userEvent.type(document.activeElement, '{esc}');
      expect(getAutocompleter('test label')).toHaveAttribute('aria-expanded', 'false');
    });

    it('informs the user when no choice is available', () => {
      render(<CustomFieldInputMultipleChoice {...requiredProps} choices={[]} />);
      userEvent.click(getAutocompleter('test label'));
      expect(getAutocompleter('test label')).toHaveDescription('No options available.');
    });
  });

  describe('className API', () => {
    it('can be set', () => {
      render(<CustomFieldInputMultipleChoice {...requiredProps} className="unique-class" />);
      expect(document.querySelector('.unique-class')).toBeInTheDocument();
    });
  });

  describe('dirty ref API', () => {
    it('updates on user interactions', () => {
      const ref = createRef();
      render(<CustomFieldInputMultipleChoice {...requiredProps} ref={ref} />);
      userEvent.click(getAutocompleter('test label'));
      expect(ref.current.dirty).toEqual(false);
      userEvent.click(getAvailableChoice('test label', 'Choice 1'));
      expect(ref.current.dirty).toEqual(true);
      userEvent.click(getRemoveButton('test label'));
      expect(ref.current.dirty).toEqual(false);
    });
  });

  describe('deselecting a choice', () => {
    it('removes the choice value when pressing the remove button', () => {
      render((<CustomFieldInputMultipleChoice
        {...requiredProps}
        value={requiredProps.choices}
      />));

      expect(getSelectedChoice('test label', 'Choice 1')).toBeInTheDocument();
      expect(getSelectedChoice('test label', 'Choice 2')).toBeInTheDocument();

      userEvent.click(getRemoveButton('test label', 'Choice 1'));
      expect(querySelectedChoice('test label', 'Choice 1')).not.toBeInTheDocument();
      expect(getSelectedChoice('test label', 'Choice 2')).toBeInTheDocument();
    });

    it('does not expand the popup', () => {
      render((<CustomFieldInputMultipleChoice
        {...requiredProps}
        value={requiredProps.choices}
      />));

      expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
      userEvent.click(getRemoveButton('test label', 'Choice 1'));
      expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
    });

    it('removes all choices when pressing the clear button and focuses the input', () => {
      render((<CustomFieldInputMultipleChoice
        {...requiredProps}
        value={requiredProps.choices}
      />));

      expect(getSelectedChoice('test label', 'Choice 1')).toBeInTheDocument();
      expect(getSelectedChoice('test label', 'Choice 2')).toBeInTheDocument();
      userEvent.click(getRemoveButton('test label'));
      expect(querySelectedChoice('test label', 'Choice 1')).not.toBeInTheDocument();
      expect(querySelectedChoice('test label', 'Choice 2')).not.toBeInTheDocument();
      expect(getAutocompleter('test label')).toHaveFocus();
    });
  });

  describe('choices API', () => {
    it('can be set', () => {
      render((<CustomFieldInputMultipleChoice
        {...requiredProps}
        choices={[{
          id: 42,
          label: 'Answer to everything',
        }]}
      />));

      expect(screen.queryByRole('option', { name: 'Answer to everything' })).not.toBeInTheDocument();
      userEvent.click(screen.getByText('test label'));
      expect(getAvailableChoice('test label', 'Answer to everything')).toBeInTheDocument();
    });

    it('does not show a selected choice', () => {
      render((<CustomFieldInputMultipleChoice
        {...requiredProps}
        value={[requiredProps.choices[0]]}
      />));

      userEvent.click(screen.getByText('test label'));
      expect(queryAvailableChoice('test label', 'Choice 1')).not.toBeInTheDocument();
    });

    it('does not show a selected choice when the selection is not set up on initial render', () => {
      const choices = [{
        id: 42,
        label: 'Answer to everything',
      }];
      const { rerender } = render((<CustomFieldInputMultipleChoice
        {...requiredProps}
        choices={choices}
      />));

      userEvent.click(screen.getByText('test label'));
      expect(getAvailableChoice('test label', 'Answer to everything')).toBeInTheDocument();

      rerender(<CustomFieldInputMultipleChoice
        {...requiredProps}
        choices={choices}
        value={choices}
      />);

      userEvent.click(screen.getByText('test label'));
      expect(screen.queryByRole('option', { name: 'Answer to everything' })).not.toBeInTheDocument();
      expect(getSelectedChoice('test label', 'Answer to everything')).toBeInTheDocument();
    });
  });

  describe('errorText API', () => {
    it('can bet set', () => {
      render(<CustomFieldInputMultipleChoice {...requiredProps} errorText="This is an error message." />);
      expect(getAutocompleter('test label')).toHaveDescription('This is an error message.');
      expect(screen.queryByText('This is an error message.')).toBeInTheDocument();
    });

    it('renders 1 icon', () => {
      render(<CustomFieldInputMultipleChoice {...requiredProps} />);
      expect(screen.queryAllByRole('img')).toHaveLength(1);
    });

    it('renders 2 icons', () => {
      render(<CustomFieldInputMultipleChoice {...requiredProps} errorText="This is an error message." />);
      expect(screen.queryAllByRole('img')).toHaveLength(2);
    });

    it('renders 2 icons with selected choices', () => {
      render((
        <CustomFieldInputMultipleChoice
          {...requiredProps}
          errorText="This is an error message."
          value={[requiredProps.choices[0]]}
        />
      ));
      expect(screen.queryAllByRole('img')).toHaveLength(2);
    });
  });

  describe('id API', () => {
    it('generates unique tag ids', () => {
      render((<CustomFieldInputMultipleChoice
        {...requiredProps}
        id="123"
        value={requiredProps.choices}
      />));

      expect(getSelectedChoice('test label', 'Choice 1').parentElement).toHaveAttribute('id', '123-1');
      expect(getSelectedChoice('test label', 'Choice 2').parentElement).toHaveAttribute('id', '123-2');
    });
  });

  describe('label API', () => {
    it('can be set', () => {
      render((<CustomFieldInputMultipleChoice {...requiredProps} label="Unique label" />));

      expect(screen.getByLabelText('Unique label', { selector: '[role="grid"]' })).toBeInTheDocument();
      expect(screen.getByLabelText('Unique label', { selector: '[role="combobox"]' })).toBeInTheDocument();
      userEvent.click(getAutocompleter('Unique label'));
      expect(screen.getByLabelText('Unique label', { selector: '[role="listbox"]' })).toBeInTheDocument();
    });
  });

  describe('placeholder API', () => {
    it('can be `undefined`', () => {
      render(<CustomFieldInputMultipleChoice {...requiredProps} choices={[]} placeholder={undefined} />);
      expect(getAutocompleter('test label')).not.toHaveAttribute('placeholder');
    });

    it('can be set (and shown)', () => {
      render(<CustomFieldInputMultipleChoice {...requiredProps} choices={[]} placeholder="Le placeholder" />);
      expect(getAutocompleter('test label')).toHaveAttribute('placeholder', 'Le placeholder');
    });

    it('can be set (and not shown)', () => {
      const choices = [
        { id: 1, label: 'Le choice' },
      ];
      render((<CustomFieldInputMultipleChoice
        {...requiredProps}
        choices={choices}
        placeholder="Le placeholder"
        value={choices}
      />));
      expect(getAutocompleter('test label')).not.toHaveAttribute('placeholder');
    });
  });

  describe('readOnly API', () => {
    it('can be set to `true`', () => {
      render((<CustomFieldInputMultipleChoice
        {...requiredProps}
        readOnly={true}
        value={[requiredProps.choices[0]]}
      />));

      expect(getAutocompleter('test label')).toHaveAttribute('readOnly', '');
      expect(queryRemoveButton('test label')).not.toBeInTheDocument();
      userEvent.click(getAutocompleter('test label'));
      expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
    });

    it('can be set to `false`', () => {
      render((<CustomFieldInputMultipleChoice
        {...requiredProps}
        readOnly={false}
        value={[requiredProps.choices[0]]}
      />));

      expect(getAutocompleter('test label')).not.toHaveAttribute('readOnly', '');
      expect(screen.getByRole('button', { name: 'Remove Choice 1' })).toBeInTheDocument();
    });
  });

  describe('required API', () => {
    it('can be set to `true`', () => {
      const choices = [
        { id: 1, label: 'Le choice' },
      ];

      render((<CustomFieldInputMultipleChoice
        {...requiredProps}
        choices={choices}
        required={true}
      />));

      expect(getAutocompleter('test label')).toHaveAttribute('required', '');
      expect(getAutocompleter('test label')).toBeInvalid();
      expect(getAutocompleter('test label')).not.toHaveDescription('Constraints not satisfied');
      userEvent.click(getAutocompleter('test label'));
      userEvent.tab();
      expect(getAutocompleter('test label')).toBeInvalid();
      expect(getAutocompleter('test label')).toHaveDescription('Constraints not satisfied');
      userEvent.click(getAutocompleter('test label'));
      userEvent.click(getAvailableChoice('test label', 'Le choice'));
      expect(getAutocompleter('test label')).not.toHaveDescription('Constraints not satisfied');
      expect(getAutocompleter('test label')).toBeValid();
    });

    it('can be set to `false`', () => {
      render((<CustomFieldInputMultipleChoice
        {...requiredProps}
        readOnly={false}
        value={[requiredProps.choices[0]]}
      />));

      expect(getAutocompleter('test label')).not.toHaveAttribute('required');
      expect(getAutocompleter('test label')).toBeValid();
      expect(getAutocompleter('test label')).not.toHaveDescription('Constraints not satisfied');
      userEvent.click(getAutocompleter('test label'));
      userEvent.tab();
      expect(getAutocompleter('test label')).not.toHaveDescription('Constraints not satisfied');
    });
  });

  describe('selecting a choice', () => {
    it('removes the choice from the list of choices', () => {
      render(<CustomFieldInputMultipleChoice {...requiredProps} />);
      userEvent.click(screen.getByText('test label'));
      expect(screen.queryByRole('option', { name: 'Choice 1' })).toBeInTheDocument();
      userEvent.click(screen.getByRole('option', { name: 'Choice 1' }));
      userEvent.click(screen.getByText('test label'));
      expect(screen.queryByRole('option', { name: 'Choice 1' })).not.toBeInTheDocument();
    });

    it('adds the choice to the selected choices and focuses the auto completer', () => {
      render(<CustomFieldInputMultipleChoice {...requiredProps} />);
      userEvent.click(screen.getByText('test label'));
      expect(screen.queryByRole('gridcell', { name: 'Choice 1' })).not.toBeInTheDocument();
      userEvent.click(screen.queryByRole('option', { name: 'Choice 1' }));
      expect(screen.queryByRole('option', { name: 'Choice 1' })).not.toBeInTheDocument();
      userEvent.click(screen.getByText('test label'));
      expect(screen.queryByRole('gridcell', { name: 'Choice 1' })).toBeInTheDocument();
      expect(getAutocompleter('test label')).toHaveFocus();
    });

    it('sorts the choices based on ID', () => {
      const testRef = createRef();
      render(<CustomFieldInputMultipleChoice {...requiredProps} ref={testRef} />);
      userEvent.click(screen.getByText('test label'));
      userEvent.click(screen.queryByRole('option', { name: 'Choice 2' }));
      userEvent.click(screen.getByText('test label'));
      userEvent.click(screen.queryByRole('option', { name: 'Choice 1' }));
      expect(testRef.current.value).toEqual([1, 2]);
    });
  });

  describe('value API', () => {
    it('generates tags', () => {
      render((<CustomFieldInputMultipleChoice
        {...requiredProps}
        value={requiredProps.choices}
      />));

      expect(screen.getByText('Choice 1')).toBeInTheDocument();
      expect(screen.getByText('Choice 2')).toBeInTheDocument();
    });
  });

  describe('forwardRef API', () => {
    it('provides access to the value', () => {
      const testRef = createRef();
      render((<CustomFieldInputMultipleChoice
        {...requiredProps}
        ref={testRef}
      />));

      expect(testRef.current.value).toStrictEqual([]);

      userEvent.click(screen.getByText('test label'));
      userEvent.click(getAvailableChoice('test label', 'Choice 1'));

      expect(testRef.current.value).toStrictEqual([1]);

      userEvent.click(screen.getByText('test label'));
      userEvent.click(getAvailableChoice('test label', 'Choice 2'));

      expect(testRef.current.value).toStrictEqual([1, 2]);
    });
  });

  describe('onChange API', () => {
    it('fires the onChange prop function when the value changes', () => {
      let componentValue = null;

      function onChangeHandler(event) {
        componentValue = event.target.value;
      }

      render((<CustomFieldInputMultipleChoice
        {...requiredProps}
        onChange={onChangeHandler}
      />));

      expect(componentValue).toStrictEqual([]);

      userEvent.click(getAutocompleter('test label'));
      userEvent.click(getAvailableChoice('test label', 'Choice 1'));

      expect(componentValue).toStrictEqual([1]);

      userEvent.click(getAutocompleter('test label'));
      userEvent.click(getAvailableChoice('test label', 'Choice 2'));

      expect(componentValue).toStrictEqual([1, 2]);
    });
  });

  describe('dropdown close behavior', () => {
    it('closes the dropdown when clicking outside', async () => {
      render(
        <div>
          <span>CLOSE</span>
          <CustomFieldInputMultipleChoice {...requiredProps} />
        </div>,
      );

      userEvent.click(getAutocompleter('test label'));
      expect(getAvailableChoice('test label', 'Choice 1')).toBeInTheDocument();
      userEvent.click(screen.getByText('CLOSE'));
      await waitFor(() => {
        if (screen.queryByText('Choice 1')) throw new Error('Expected popup to be closed.');
      });
      expect(screen.queryByText('Choice 1')).not.toBeInTheDocument();
    });

    it('closes the dropdown when tabbing away', async () => {
      render(
        <div>
          <CustomFieldInputMultipleChoice {...requiredProps} />
          <input />
        </div>,
      );

      userEvent.click(getAutocompleter('test label'));
      expect(getAvailableChoice('test label', 'Choice 1')).toBeInTheDocument();

      userEvent.tab();
      userEvent.tab();

      await waitFor(() => {
        if (screen.queryByText('Choice 1')) throw new Error('Expected popup to be closed.');
      });
      expect(screen.queryByText('Choice 1')).not.toBeInTheDocument();
    });

    it('resets the inputs state', async () => {
      render(
        <div>
          <span>CLOSE</span>
          <CustomFieldInputMultipleChoice {...requiredProps} />
        </div>,
      );

      expect(getAutocompleter('test label')).toHaveValue('');
      await userEvent.type(getAutocompleter('test label'), '1');
      expect(getAutocompleter('test label')).toHaveValue('1');
      expect(getAvailableChoice('test label', 'Choice 1')).toBeInTheDocument();
      userEvent.click(screen.getByText('CLOSE'));

      await waitFor(() => expect(getAutocompleter('test label')).toHaveValue(''));
    });
  });
});
