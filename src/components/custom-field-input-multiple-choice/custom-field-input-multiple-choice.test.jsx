import React from 'react';
import renderer from 'react-test-renderer';
import {
  fireEvent,
  render,
  screen,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { waitFor } from '@testing-library/dom';
import CustomFieldInputMultipleChoice from './custom-field-input-multiple-choice.jsx';

describe('<CustomFieldInputMultipleChoice>', () => {
  const requiredProps = {
    choices: [{
      id: '1',
      label: 'Choice 1',
    }, {
      id: '2',
      label: 'Choice 2',
    }],
    id: 'test-id',
    label: 'test label',
  };

  it('has defaults', () => {
    expect(renderer.create(<CustomFieldInputMultipleChoice {...requiredProps} />).toJSON()).toMatchSnapshot();
  });

  describe('autocompleter popup', () => {
    describe('input', () => {
      it('focuses on click', () => {
        render(<CustomFieldInputMultipleChoice {...requiredProps} />);
        expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
        userEvent.click(screen.getByText('test label'));
        expect(screen.getByLabelText('test label', { selector: 'input' })).toHaveFocus();
      });

      it('filters visible choices on value', () => {
        render(<CustomFieldInputMultipleChoice {...requiredProps} />);
        expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
        userEvent.click(screen.getByText('test label'));
        expect(screen.getByLabelText('test label', { selector: 'input' })).toHaveFocus();
        expect(screen.getByText('Choice 1')).toBeInTheDocument();
        expect(screen.getByText('Choice 2')).toBeInTheDocument();
        userEvent.type(document.activeElement, '1');
        expect(screen.getByText('Choice 1')).toBeInTheDocument();
        expect(screen.queryByText('Choice 2')).not.toBeInTheDocument();
      });

      it('is cleared on selection', () => {
        render(<CustomFieldInputMultipleChoice {...requiredProps} />);
        userEvent.click(screen.getByText('test label'));
        expect(screen.getByText('Choice 1')).toBeInTheDocument();
        expect(screen.getByText('Choice 2')).toBeInTheDocument();
        userEvent.type(document.activeElement, '1');
        userEvent.click(screen.getByText('Choice 1'));
        expect(screen.getByLabelText('test label', { selector: 'input' })).toHaveValue('');
      });

      it('has aria-haspopup for accessibility', () => {
        render(<CustomFieldInputMultipleChoice {...requiredProps} />);
        expect(screen.getByLabelText('test label', { selector: '[aria-haspopup="listbox"]' })).toBeInTheDocument();
      });

      it('has aria-expanded for accessibility', () => {
        render(<CustomFieldInputMultipleChoice {...requiredProps} />);
        userEvent.click(screen.getByText('test label'));
        expect(screen.getByLabelText('test label', { selector: 'ul[aria-expanded=true]' })).toBeInTheDocument();
      });
    });

    describe('popup', () => {
      it('opens on click', () => {
        render(<CustomFieldInputMultipleChoice {...requiredProps} />);
        expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
        userEvent.click(screen.getByText('test label'));
        expect(screen.queryByRole('listbox')).toBeInTheDocument();
      });

      it('opens on typing', async () => {
        render(<CustomFieldInputMultipleChoice {...requiredProps} />);
        userEvent.tab();
        expect(screen.getByLabelText('test label', { selector: 'input' })).toHaveFocus();
        expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
        userEvent.type(screen.getByLabelText('test label', { selector: 'input' }), 'Choi', { skipClick: true });
        expect(screen.queryByRole('listbox')).toBeInTheDocument();
      });

      it('closes on escape key', () => {
        render(<CustomFieldInputMultipleChoice {...requiredProps} />);
        userEvent.click(screen.getByText('test label'));
        expect(screen.queryByRole('listbox')).toBeInTheDocument();
        fireEvent.keyDown(document.activeElement, { key: 'Escape' });
        expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
      });

      it('informs the user when no choice is available', () => {
        render(<CustomFieldInputMultipleChoice {...requiredProps} choices={[]} />);
        userEvent.click(screen.getByText('test label'));
        expect(screen.getByText('No options available.')).toBeInTheDocument();
      });

      it('does not open when read-only', () => {
        render(<CustomFieldInputMultipleChoice {...requiredProps} readOnly />);
        userEvent.click(screen.getByText('test label'));
        expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
      });
    });
  });

  describe('deselecting a choice', () => {
    it('removes the choice value when pressing the remove button', () => {
      render((<CustomFieldInputMultipleChoice
        {...requiredProps}
        value={requiredProps.choices}
      />));

      expect(screen.getByText('Choice 1')).toBeInTheDocument();
      expect(screen.getByText('Choice 2')).toBeInTheDocument();

      userEvent.click(screen.getByRole('button', { name: 'Remove Choice 1' }));
      expect(screen.queryByText('Choice 1')).not.toBeInTheDocument();
      expect(screen.getByText('Choice 2')).toBeInTheDocument();
    });

    it('does not expand the popup', () => {
      render((<CustomFieldInputMultipleChoice
        {...requiredProps}
        value={requiredProps.choices}
      />));

      expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
      userEvent.click(screen.getByRole('button', { name: 'Remove Choice 1' }));
      expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
    });

    it('removes all choices when pressing the clear button and focuses the input', () => {
      render((<CustomFieldInputMultipleChoice
        {...requiredProps}
        value={requiredProps.choices}
      />));

      expect(screen.getByText('Choice 1')).toBeInTheDocument();
      expect(screen.getByText('Choice 2')).toBeInTheDocument();
      userEvent.click(screen.getByRole('button', { name: 'Remove all selected choices on test label' }));
      expect(screen.queryByText('Choice 1')).not.toBeInTheDocument();
      expect(screen.queryByText('Choice 2')).not.toBeInTheDocument();
      expect(screen.getByLabelText('test label', { selector: 'input' })).toHaveFocus();
    });
  });

  describe('choices API', () => {
    it('can be set', () => {
      render((<CustomFieldInputMultipleChoice
        {...requiredProps}
        choices={[{
          id: '42',
          label: 'Answer to everything',
        }]}
      />));

      expect(screen.queryByRole('option', { name: 'Answer to everything' })).not.toBeInTheDocument();
      userEvent.click(screen.getByText('test label'));
      expect(screen.getByRole('option', { name: 'Answer to everything' })).toBeInTheDocument();
    });

    it('does not show a selected choice', () => {
      const choices = [{
        id: '42',
        label: 'Answer to everything',
      }];
      render((<CustomFieldInputMultipleChoice
        {...requiredProps}
        choices={choices}
        value={choices}
      />));

      userEvent.click(screen.getByText('test label'));
      expect(screen.queryByRole('option', { name: 'Answer to everything' })).not.toBeInTheDocument();
    });
  });

  describe('errorText API', () => {
    it('can bet set', () => {
      render(<CustomFieldInputMultipleChoice {...requiredProps} errorText="This is an error message." />);
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

      expect(screen.getByText('Choice 1').parentElement).toHaveAttribute('id', '123-1');
      expect(screen.getByText('Choice 2').parentElement).toHaveAttribute('id', '123-2');
    });
  });

  describe('label API', () => {
    it('can be set', () => {
      render((<CustomFieldInputMultipleChoice {...requiredProps} label="Unique label" />));

      expect(screen.getByLabelText('Unique label', { selector: '[role="grid"]' })).toBeInTheDocument();
    });
  });

  describe('readOnly API', () => {
    it('does not have the clear button on its tags', () => {
      render((<CustomFieldInputMultipleChoice
        {...requiredProps}
        readOnly={true}
        value={[requiredProps.choices[0]]}
      />));

      expect(screen.queryByRole('button')).toBeNull();
    });

    it('has the clear button on its tags', () => {
      render((<CustomFieldInputMultipleChoice
        {...requiredProps}
        readOnly={false}
        value={[requiredProps.choices[0]]}
      />));

      expect(screen.getByRole('button', { name: 'Remove Choice 1' })).toBeInTheDocument();
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
      expect(screen.getByLabelText('test label', { selector: 'input' })).toHaveFocus();
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

  describe('dropdown close behavior', () => {
    it('closes the dropdown when clicking outside', async () => {
      render(
        <div>
          <span>CLOSE</span>
          <CustomFieldInputMultipleChoice {...requiredProps} />
        </div>,
      );

      userEvent.click(screen.getByLabelText('test label', { selector: 'input' }));
      expect(screen.getByText('Choice 1')).toBeInTheDocument();
      userEvent.click(screen.getByText('CLOSE'));
      await waitFor(() => expect(screen.queryByText('Choice 1')).not.toBeInTheDocument());
    });

    it('closes the dropdown when tabbing away', async () => {
      render(
        <div>
          <CustomFieldInputMultipleChoice {...requiredProps} />
          <input />
        </div>,
      );

      userEvent.click(screen.getByLabelText('test label', { selector: 'input' }));
      expect(screen.getByText('Choice 1')).toBeInTheDocument();

      userEvent.tab();
      userEvent.tab();

      await waitFor(() => expect(screen.queryByText('Choice 1')).not.toBeInTheDocument());
    });

    it('resets the inputs state', async () => {
      render(
        <div>
          <span>CLOSE</span>
          <CustomFieldInputMultipleChoice {...requiredProps} />
        </div>,
      );

      expect(screen.getByLabelText('test label', { selector: 'input' })).toHaveValue('');
      userEvent.type(screen.getByLabelText('test label', { selector: 'input' }), '1');
      expect(screen.getByLabelText('test label', { selector: 'input' })).toHaveValue('1');
      expect(screen.getByText('Choice 1')).toBeInTheDocument();
      userEvent.click(screen.getByText('CLOSE'));

      await waitFor(() => expect(screen.getByLabelText('test label', { selector: 'input' })).toHaveValue(''));
    });
  });
});
