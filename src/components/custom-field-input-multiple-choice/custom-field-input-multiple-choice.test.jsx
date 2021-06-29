import React, { createRef } from 'react';
import {
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import jestServer from '../../mocks/jest-server.js';
import mockHandlers from '../custom-field-input-single-choice/mock-handlers.js';
import {
  getAutocompleter,
  getAvailableChoice,
  getRemoveButton,
  getSelectedChoice,
  openChoices,
  queryAvailableChoice,
  querySelectedChoice,
  queryRemoveButton,
  waitForChoices,
  waitForChoicesNoOpen,
} from './test-queries.js';
import CustomFieldInputMultipleChoice from './custom-field-input-multiple-choice.jsx';

describe('<CustomFieldInputMultipleChoice>', () => {
  const requiredProps = {
    customFieldID: '0',
    id: 'test-id',
    label: 'test label',
    name: 'field-id',
  };

  beforeEach(() => {
    jestServer.use(...mockHandlers());
  });

  it('has defaults', () => {
    const ref = createRef();
    render(<CustomFieldInputMultipleChoice {...requiredProps} ref={ref} />);
    expect(document.body).toMatchSnapshot();
    expect(ref.current).toMatchSnapshot();
  });

  describe('autocomplete behavior', () => {
    it('focuses the input on click', () => {
      render(<CustomFieldInputMultipleChoice {...requiredProps} />);
      openChoices('test label');
      expect(getAutocompleter('test label')).toHaveFocus();
    });

    it('filters visible choices on autocompleter value', async () => {
      render(<CustomFieldInputMultipleChoice {...requiredProps} />);
      await waitForChoices('test label');
      expect(getAvailableChoice('test label', 'Foo')).toBeInTheDocument();
      expect(getAvailableChoice('test label', 'Bar')).toBeInTheDocument();
      userEvent.type(document.activeElement, 'F');
      expect(getAvailableChoice('test label', 'Foo')).toBeInTheDocument();
      expect(queryAvailableChoice('test label', 'Bar')).not.toBeInTheDocument();
    });

    it('clears the autocompleter on selection', async () => {
      render(<CustomFieldInputMultipleChoice {...requiredProps} />);
      userEvent.type(getAutocompleter('test label'), 'F');
      await waitForChoices('test label');
      userEvent.click(getAvailableChoice('test label', 'Foo'));
      expect(getAutocompleter('test label')).toHaveValue('');
    });

    it('opens on typing', async () => {
      render(<CustomFieldInputMultipleChoice {...requiredProps} />);
      userEvent.tab();
      expect(getAutocompleter('test label')).toHaveFocus();
      expect(getAutocompleter('test label')).toHaveAttribute('aria-expanded', 'false');
      await userEvent.type(getAutocompleter('test label'), 'Fo', { skipClick: true });
      await waitForChoicesNoOpen();
      expect(getAvailableChoice('test label', 'Foo')).toBeInTheDocument();
    });

    it('closes on escape key', () => {
      render(<CustomFieldInputMultipleChoice {...requiredProps} />);
      userEvent.click(getAutocompleter('test label'));
      expect(getAutocompleter('test label')).toHaveAttribute('aria-expanded', 'true');
      userEvent.type(document.activeElement, '{esc}');
      expect(getAutocompleter('test label')).toHaveAttribute('aria-expanded', 'false');
    });

    it('informs the user when no choice is available', async () => {
      render(<CustomFieldInputMultipleChoice {...requiredProps} customFieldID="-1" />);
      await waitForChoices('test label');
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
    it('updates on user interactions', async () => {
      const ref = createRef();
      render(<CustomFieldInputMultipleChoice {...requiredProps} ref={ref} />);
      userEvent.click(getAutocompleter('test label'));
      await waitForChoices('test label');
      expect(ref.current.dirty).toEqual(false);
      userEvent.click(getAvailableChoice('test label', 'Foo'));
      expect(ref.current.dirty).toEqual(true);
      userEvent.click(getRemoveButton('test label'));
      expect(ref.current.dirty).toEqual(false);
    });
  });

  describe('deselecting a choice', () => {
    it('removes the choice value when pressing the remove button', async () => {
      render((<CustomFieldInputMultipleChoice
        {...requiredProps}
        value={['0', '1']}
      />));

      // Why does await waitForChoices fail these tests?
      await waitFor(() => { expect(getSelectedChoice('test label', 'Foo')).toBeInTheDocument(); });
      expect(getSelectedChoice('test label', 'Bar')).toBeInTheDocument();

      userEvent.click(getRemoveButton('test label', 'Foo'));
      expect(querySelectedChoice('test label', 'Foo')).not.toBeInTheDocument();
      expect(getSelectedChoice('test label', 'Bar')).toBeInTheDocument();
    });

    it('does not expand the popup', async () => {
      render((<CustomFieldInputMultipleChoice
        {...requiredProps}
        value={['0', '1']}
      />));

      await waitFor(() => { expect(getSelectedChoice('test label', 'Foo')).toBeInTheDocument(); });
      expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
      userEvent.click(getRemoveButton('test label', 'Foo'));
      expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
    });

    it('removes all choices when pressing the clear button and focuses the input', async () => {
      render((<CustomFieldInputMultipleChoice
        {...requiredProps}
        value={['0', '1']}
      />));

      await waitFor(() => { expect(getSelectedChoice('test label', 'Foo')).toBeInTheDocument(); });
      expect(getSelectedChoice('test label', 'Bar')).toBeInTheDocument();
      userEvent.click(getRemoveButton('test label'));
      expect(querySelectedChoice('test label', 'Foo')).not.toBeInTheDocument();
      expect(querySelectedChoice('test label', 'Bar')).not.toBeInTheDocument();
      expect(getAutocompleter('test label')).toHaveFocus();
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
          value={['0']}
        />
      ));
      expect(screen.queryAllByRole('img')).toHaveLength(2);
    });
  });

  describe('id API', () => {
    it('generates unique tag ids', async () => {
      render((<CustomFieldInputMultipleChoice
        {...requiredProps}
        id="123"
        value={['0', '1']}
      />));

      await waitFor(() => { expect(getSelectedChoice('test label', 'Foo')).toBeInTheDocument(); });
      expect(getSelectedChoice('test label', 'Foo').parentElement).toHaveAttribute('id', '123-0');
      expect(getSelectedChoice('test label', 'Bar').parentElement).toHaveAttribute('id', '123-1');
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
      render(<CustomFieldInputMultipleChoice {...requiredProps} customFieldID="-1" placeholder={undefined} />);
      expect(getAutocompleter('test label')).not.toHaveAttribute('placeholder');
    });

    it('can be set (and shown)', () => {
      render(<CustomFieldInputMultipleChoice {...requiredProps} customFieldID="-1" placeholder="Le placeholder" />);
      expect(getAutocompleter('test label')).toHaveAttribute('placeholder', 'Le placeholder');
    });

    it('can be set (and not shown)', () => {
      render((<CustomFieldInputMultipleChoice
        {...requiredProps}
        placeholder="Le placeholder"
        value={['0']}
      />));
      expect(getAutocompleter('test label')).not.toHaveAttribute('placeholder');
    });
  });

  describe('readOnly API', () => {
    it('can be set to `true`', () => {
      render((<CustomFieldInputMultipleChoice
        {...requiredProps}
        readOnly={true}
      />));

      expect(getAutocompleter('test label')).toHaveAttribute('readOnly', '');
      expect(queryRemoveButton('test label')).not.toBeInTheDocument();
      userEvent.click(getAutocompleter('test label'));
      expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
    });

    it('can be set to `false`', async () => {
      render((<CustomFieldInputMultipleChoice
        {...requiredProps}
        readOnly={false}
        value={['0']}
      />));

      await waitFor(() => { expect(getSelectedChoice('test label', 'Foo')).toBeInTheDocument(); });
      expect(getAutocompleter('test label')).not.toHaveAttribute('readOnly', '');
      expect(screen.getByRole('button', { name: 'Remove Foo' })).toBeInTheDocument();
    });
  });

  describe('required API', () => {
    it('can be set to `true`', async () => {
      render((<CustomFieldInputMultipleChoice
        {...requiredProps}
        required={true}
      />));

      expect(getAutocompleter('test label')).toHaveAttribute('required', '');
      expect(getAutocompleter('test label')).toBeInvalid();
      expect(getAutocompleter('test label')).not.toHaveDescription('Constraints not satisfied');
      await waitForChoices('test label');
      userEvent.click(getAutocompleter('test label'));
      userEvent.tab();
      expect(getAutocompleter('test label')).toBeInvalid();
      expect(getAutocompleter('test label')).toHaveDescription('Constraints not satisfied');
      userEvent.click(getAutocompleter('test label'));
      userEvent.click(getAvailableChoice('test label', 'Foo'));
      expect(getAutocompleter('test label')).not.toHaveDescription('Constraints not satisfied');
      expect(getAutocompleter('test label')).toBeValid();
    });

    it('can be set to `false`', async () => {
      render((<CustomFieldInputMultipleChoice
        {...requiredProps}
        readOnly={false}
        value={['0']}
      />));

      await waitFor(() => { expect(getSelectedChoice('test label', 'Foo')).toBeInTheDocument(); });
      expect(getAutocompleter('test label')).not.toHaveAttribute('required');
      expect(getAutocompleter('test label')).toBeValid();
      expect(getAutocompleter('test label')).not.toHaveDescription('Constraints not satisfied');
      userEvent.click(getAutocompleter('test label'));
      userEvent.tab();
      expect(getAutocompleter('test label')).not.toHaveDescription('Constraints not satisfied');
    });
  });

  describe('selecting a choice', () => {
    it('removes the choice from the list of choices', async () => {
      render(<CustomFieldInputMultipleChoice {...requiredProps} />);
      await waitForChoices('test label');
      expect(screen.queryByRole('option', { name: 'Foo' })).toBeInTheDocument();
      userEvent.click(screen.getByRole('option', { name: 'Foo' }));
      userEvent.click(screen.getByText('test label'));
      expect(screen.queryByRole('option', { name: 'Foo' })).not.toBeInTheDocument();
    });

    it('adds the choice to the selected choices and focuses the auto completer', async () => {
      render(<CustomFieldInputMultipleChoice {...requiredProps} />);
      await waitForChoices('test label');
      expect(screen.queryByRole('gridcell', { name: 'Foo' })).not.toBeInTheDocument();
      userEvent.click(screen.queryByRole('option', { name: 'Foo' }));
      expect(screen.queryByRole('option', { name: 'Foo' })).not.toBeInTheDocument();
      userEvent.click(screen.getByText('test label'));
      expect(screen.queryByRole('gridcell', { name: 'Foo' })).toBeInTheDocument();
      expect(getAutocompleter('test label')).toHaveFocus();
    });

    it('sorts the choices based on ID', async () => {
      const testRef = createRef();
      render(<CustomFieldInputMultipleChoice {...requiredProps} ref={testRef} />);
      await waitForChoices('test label');
      userEvent.click(screen.queryByRole('option', { name: 'Bar' }));
      userEvent.click(screen.getByText('test label'));
      userEvent.click(screen.queryByRole('option', { name: 'Foo' }));
      expect(testRef.current.value).toEqual(['1', '0']);
    });
  });

  describe('tooltip API', () => {
    const tooltip = 'I am an input, short and stout.';

    it('applies a description to the input when the help icon is hovered', () => {
      render(<CustomFieldInputMultipleChoice {...requiredProps} tooltip={tooltip} />);
      userEvent.hover(screen.getByRole('img', { name: 'More information' }));
      expect(screen.getByRole('combobox', { name: requiredProps.label })).toHaveDescription(tooltip);
    });

    it('removes the description to the input when the help icon is unhovered', () => {
      render(<CustomFieldInputMultipleChoice {...requiredProps} tooltip={tooltip} />);
      userEvent.hover(screen.getByRole('img', { name: 'More information' }));
      userEvent.unhover(screen.getByRole('img', { name: 'More information' }));
      expect(screen.getByRole('combobox', { name: requiredProps.label })).toHaveDescription('');
    });
  });

  describe('value API', () => {
    it('generates tags', async () => {
      render((<CustomFieldInputMultipleChoice
        {...requiredProps}
        value={['0', '1']}
      />));

      await waitFor(() => { expect(getSelectedChoice('test label', 'Foo')).toBeInTheDocument(); });
      expect(screen.getByText('Bar')).toBeInTheDocument();
    });
  });

  describe('forwardRef API', () => {
    it('provides access to the value', async () => {
      const testRef = createRef();
      render((<CustomFieldInputMultipleChoice
        {...requiredProps}
        ref={testRef}
      />));

      expect(testRef.current.value).toStrictEqual([]);
      await waitForChoices('test label');

      userEvent.click(screen.getByText('test label'));
      userEvent.click(getAvailableChoice('test label', 'Foo'));

      expect(testRef.current.value).toStrictEqual(['0']);

      userEvent.click(screen.getByText('test label'));
      userEvent.click(getAvailableChoice('test label', 'Bar'));

      expect(testRef.current.value).toStrictEqual(['0', '1']);
    });
  });

  describe('onChange API', () => {
    it('fires the onChange prop function when the value changes', async () => {
      let componentValue = null;

      function onChangeHandler(event) {
        componentValue = event.target.value;
      }

      render((<CustomFieldInputMultipleChoice
        {...requiredProps}
        onChange={onChangeHandler}
      />));

      expect(componentValue).toStrictEqual([]);
      await waitForChoices('test label');

      userEvent.click(getAutocompleter('test label'));
      userEvent.click(getAvailableChoice('test label', 'Foo'));

      expect(componentValue).toStrictEqual(['0']);

      userEvent.click(getAutocompleter('test label'));
      userEvent.click(getAvailableChoice('test label', 'Bar'));

      expect(componentValue).toStrictEqual(['0', '1']);
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

      await waitForChoices('test label');
      userEvent.click(getAutocompleter('test label'));
      expect(getAvailableChoice('test label', 'Foo')).toBeInTheDocument();
      userEvent.click(screen.getByText('CLOSE'));
      await waitFor(() => {
        if (screen.queryByText('Foo')) throw new Error('Expected popup to be closed.');
      });
      expect(screen.queryByText('Foo')).not.toBeInTheDocument();
    });

    it('closes the dropdown when tabbing away', async () => {
      render(
        <div>
          <CustomFieldInputMultipleChoice {...requiredProps} />
          <input />
        </div>,
      );

      await waitForChoices('test label');
      userEvent.click(getAutocompleter('test label'));
      expect(getAvailableChoice('test label', 'Foo')).toBeInTheDocument();

      userEvent.tab();
      userEvent.tab();

      await waitFor(() => {
        if (screen.queryByText('Foo')) throw new Error('Expected popup to be closed.');
      });
      expect(screen.queryByText('Foo')).not.toBeInTheDocument();
    });

    it('resets the inputs state', async () => {
      render(
        <div>
          <span>CLOSE</span>
          <CustomFieldInputMultipleChoice {...requiredProps} />
        </div>,
      );

      await waitForChoices('test label');
      expect(getAutocompleter('test label')).toHaveValue('');
      await userEvent.type(getAutocompleter('test label'), 'F');
      expect(getAutocompleter('test label')).toHaveValue('F');
      expect(getAvailableChoice('test label', 'Foo')).toBeInTheDocument();
      userEvent.click(screen.getByText('CLOSE'));

      await waitFor(() => expect(getAutocompleter('test label')).toHaveValue(''));
    });
  });
});
