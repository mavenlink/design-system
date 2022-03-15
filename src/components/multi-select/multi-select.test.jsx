import React, { createRef } from 'react';
import {
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import MultiSelect from './multi-select.jsx';
import Tag from '../tag/tag.jsx';
import {
  findAutocompleter,
  findAvailableOption,
  findRemoveButton,
  findSelectedOption,
  openOptions,
  queryAvailableOption,
  querySelectedOption,
  queryRemoveButton,
} from './test-queries.js';

describe('<MultiSelect>', () => {
  const requiredProps = {
    options: [
      {
        value: '1',
        label: 'Foo',
      },
      {
        value: '2',
        label: 'Bar',
      },
    ],
    id: 'test-id',
    label: 'test label',
    name: 'field-id',
  };

  it('has defaults', () => {
    const ref = createRef();

    render(<MultiSelect {...requiredProps} ref={ref} />);
    expect(document.body).toMatchSnapshot();
    expect(ref.current).toMatchSnapshot();
  });

  describe('classNames API', () => {
    it('uses class name overrides provided', () => {
      render(<MultiSelect
        {...requiredProps}
        classNames={{
          container: 'unique-container',
          formControlChildrenContainer: 'unique-form-control-children-container',
          input: 'unique-input-class',
          tagList: 'unique-tag-list-class',
        }}
      />);

      expect(document.body).toMatchSnapshot();
    });
  });

  describe('id API', () => {
    it('sets id of container and selected options', async () => {
      render(<MultiSelect {...requiredProps} id="unique-id" value={[requiredProps.options[0]]} />);

      expect(document.querySelector('#unique-id')).toBeInTheDocument();
      expect((await findSelectedOption('test label', 'Foo')).parentElement).toHaveAttribute('id', 'unique-id-option-1');
    });
  });

  describe('label API', () => {
    it('sets label of form control and clear button', async () => {
      render(<MultiSelect {...requiredProps} label="unique label" value={[requiredProps.options[0]]} />);

      expect(screen.getByText('unique label')).toBeInTheDocument();
      expect(await findRemoveButton('unique label', 'Foo')).toBeInTheDocument();
    });
  });

  describe('listboxChildren API', () => {
    it('uses render function for listbox children if set', async () => {
      function listboxChildren(options, refs, onSelect) {
        return (
          <div>
            {options.map((option, index) => (
              <span key={option.value} ref={refs[index]} onClick={() => { onSelect({ target: refs[index] }); }}>Override {option.label}</span>
            ))}
          </div>
        );
      }

      render(<MultiSelect {...requiredProps} listboxChildren={listboxChildren} />);

      await openOptions('test label');
      expect(screen.getByText('Override Foo')).toBeInTheDocument();
      userEvent.click(screen.getByText('Override Foo'));
      expect(await findSelectedOption('test label', 'Foo')).toBeInTheDocument();
    });
  });

  describe('onChange API', () => {
    it('fires the onChange event when the value changes', async () => {
      const onChangeMock = jest.fn();

      render(<MultiSelect {...requiredProps} onChange={onChangeMock} />);

      await openOptions('test label');
      userEvent.click(await await findAvailableOption('test label', 'Foo'));
      expect(onChangeMock).toHaveBeenCalled();
    });
  });

  describe('onInput API', () => {
    it('fires the onInput event when the user types in the combobox input', async () => {
      const onInputMock = jest.fn();

      render(<MultiSelect {...requiredProps} onInput={onInputMock} />);

      userEvent.type(await findAutocompleter('test label'), 'F');
      expect(onInputMock).toHaveBeenCalled();
    });
  });

  describe('options API', () => {
    it('generates options', async () => {
      render(<MultiSelect {...requiredProps} />);

      await openOptions('test label');
      expect(await findAvailableOption('test label', 'Foo')).toBeInTheDocument();
      expect(await findAvailableOption('test label', 'Bar')).toBeInTheDocument();
    });
  });

  describe('option objects APIs', () => {
    it('uses provided getter overrides', async () => {
      render(<MultiSelect
        {...requiredProps}
        options={[
          {
            id: 'test-1',
            text: 'Foo',
          },
          {
            id: 'test-2',
            text: 'Bar',
          },
        ]}
        optionIDGetter={option => option.id}
        optionLabelGetter={option => option.text}
      />);

      await openOptions('test label');

      expect(await findAvailableOption('test label', 'Foo')).toBeInTheDocument();
      expect(await findAvailableOption('test label', 'Bar')).toBeInTheDocument();

      userEvent.type(document.activeElement, 'F');

      expect(await findAvailableOption('test label', 'Foo')).toBeInTheDocument();
      expect(await queryAvailableOption('test label', 'Bar')).not.toBeInTheDocument();

      userEvent.click(await findAvailableOption('test label', 'Foo'));

      expect(await findSelectedOption('test label', 'Foo')).toBeInTheDocument();
    });
  });

  describe('placeholder API', () => {
    it('sets the autocompleter placeholder', async () => {
      render(<MultiSelect {...requiredProps} placeholder="This is a placeholder" />);

      expect(await findAutocompleter('test label')).toHaveAttribute('placeholder', 'This is a placeholder');
    });
  });

  describe('readOnly API', () => {
    it('can be set to `true`', async () => {
      render((<MultiSelect
        {...requiredProps}
        readOnly={true}
      />));

      expect(await findAutocompleter('test label')).toHaveAttribute('readOnly', '');
      expect(queryRemoveButton('test label')).not.toBeInTheDocument();
      userEvent.click(await findAutocompleter('test label'));
      expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
    });

    it('can be set to `false`', async () => {
      render((<MultiSelect
        {...requiredProps}
        readOnly={false}
        value={[requiredProps.options[0]]}
      />));

      expect(await findSelectedOption('test label', 'Foo')).toBeInTheDocument();
      expect(await findAutocompleter('test label')).not.toHaveAttribute('readOnly', '');
      expect(screen.getByRole('button', { name: 'Remove Foo' })).toBeInTheDocument();
    });
  });

  describe('required API', () => {
    it('can be set to `true`', async () => {
      render((<MultiSelect
        {...requiredProps}
        required={true}
      />));

      expect(await findAutocompleter('test label')).toHaveAttribute('required', '');
      expect(await findAutocompleter('test label')).toBeInvalid();
      await openOptions('test label');
      userEvent.click(await findAutocompleter('test label'));
      userEvent.tab();
      expect(await findAutocompleter('test label')).toBeInvalid();
      userEvent.click(await findAutocompleter('test label'));
      userEvent.click(await findAvailableOption('test label', 'Foo'));
      expect(await findAutocompleter('test label')).toBeValid();
    });

    it('can be set to `false`', async () => {
      render((<MultiSelect
        {...requiredProps}
        readOnly={false}
        value={[requiredProps.options[0]]}
      />));

      expect(await findSelectedOption('test label', 'Foo')).toBeInTheDocument();
      expect(await findAutocompleter('test label')).not.toHaveAttribute('required');
      expect(await findAutocompleter('test label')).toBeValid();
      expect(await findAutocompleter('test label')).not.toHaveAccessibleDescription('Constraints not satisfied');
      userEvent.click(await findAutocompleter('test label'));
      userEvent.tab();
      expect(await findAutocompleter('test label')).not.toHaveAccessibleDescription('Constraints not satisfied');
    });
  });

  describe('showLoader API', () => {
    it('when set to true, shows a loader in the autocompleter dropdown', async () => {
      render(<MultiSelect {...requiredProps} showLoader />);

      await openOptions('test label');
      expect(screen.getByRole('progressbar')).toBeInTheDocument();
    });

    it('when set to false, shows no loader', async () => {
      render(<MultiSelect {...requiredProps} showLoader={false} />);

      await openOptions('test label');
      expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
    });
  });

  describe('tagChildren API', () => {
    it('uses render function for taglist children if set', async () => {
      function tagChildren(options, refs, onRemove) {
        return (
          <div>
            {options.map((option, index) => (
              <React.Fragment key={option.value}>
                <span>Override {option.label}</span>
                <Tag
                  defaultActive={index === 0}
                  id={option.value}
                  key={option.value}
                  onRemove={onRemove}
                  ref={refs[index]}
                >
                  {option.label}
                </Tag>
              </React.Fragment>
            ))}
          </div>
        );
      }

      render(<MultiSelect {...requiredProps} tagChildren={tagChildren} value={[requiredProps.options[0]]} />);

      expect(screen.getByText('Override Foo')).toBeInTheDocument();
      expect(await findSelectedOption('test label', 'Foo')).toBeInTheDocument();
      userEvent.click(await findRemoveButton('test label', 'Foo'));
      expect(await querySelectedOption('test label', 'Foo')).not.toBeInTheDocument();
    });
  });

  describe('validationMessage API', () => {
    it('sets the validationMessage on the form control', () => {
      const { rerender } = render(<MultiSelect {...requiredProps} validationMessage="Some backend error" />);

      expect(screen.getByText('Some backend error', { selector: 'span' })).toBeInTheDocument();
      rerender(<MultiSelect {...requiredProps} validationMessage={undefined} />);
      expect(screen.queryByText('Some backend error', { selector: 'span' })).not.toBeInTheDocument();
    });
  });

  describe('value API', () => {
    it('sets the value for the input and is responsive to changes', async () => {
      const { rerender } = render(<MultiSelect {...requiredProps} value={[requiredProps.options[0]]} />);

      expect(await findSelectedOption('test label', 'Foo')).toBeInTheDocument();
      expect(await querySelectedOption('test label', 'Bar')).not.toBeInTheDocument();

      rerender(<MultiSelect {...requiredProps} value={[requiredProps.options[1]]} />);
      expect(await querySelectedOption('test label', 'Foo')).not.toBeInTheDocument();
      expect(await findSelectedOption('test label', 'Bar')).toBeInTheDocument();

      rerender(<MultiSelect {...requiredProps} value={[]} />);
      expect(await querySelectedOption('test label', 'Foo')).not.toBeInTheDocument();
      expect(await querySelectedOption('test label', 'Bar')).not.toBeInTheDocument();

      rerender(<MultiSelect {...requiredProps} value={undefined} />);
      expect(await querySelectedOption('test label', 'Foo')).not.toBeInTheDocument();
      expect(await querySelectedOption('test label', 'Bar')).not.toBeInTheDocument();
    });
  });

  describe('autocomplete behavior', () => {
    it('focuses the input on click', async () => {
      render(<MultiSelect {...requiredProps} />);
      await openOptions('test label');
      expect(await findAutocompleter('test label')).toHaveFocus();
    });

    it('filters visible options on autocompleter value when props.filterOptions is true', async () => {
      render(<MultiSelect {...requiredProps} />);
      await openOptions('test label');
      expect(await findAvailableOption('test label', 'Foo')).toBeInTheDocument();
      expect(await findAvailableOption('test label', 'Bar')).toBeInTheDocument();
      userEvent.type(document.activeElement, 'F');
      expect(await findAvailableOption('test label', 'Foo')).toBeInTheDocument();
      expect(await queryAvailableOption('test label', 'Bar')).not.toBeInTheDocument();
    });

    it('does not filter options on autocompleter value when props.filterOptions is false', async () => {
      render(<MultiSelect {...requiredProps} filterOptions={false} />);
      await openOptions('test label');
      expect(await findAvailableOption('test label', 'Foo')).toBeInTheDocument();
      expect(await findAvailableOption('test label', 'Bar')).toBeInTheDocument();
      userEvent.type(document.activeElement, 'F');
      expect(await findAvailableOption('test label', 'Foo')).toBeInTheDocument();
      expect(await queryAvailableOption('test label', 'Bar')).toBeInTheDocument();
      userEvent.click(await findAvailableOption('test label', 'Foo'));
      await openOptions('test label');
      expect(await queryAvailableOption('test label', 'Foo')).not.toBeInTheDocument();
    });

    it('clears the autocompleter on selection', async () => {
      render(<MultiSelect {...requiredProps} />);
      userEvent.type(await findAutocompleter('test label'), 'F');
      userEvent.click(await findAvailableOption('test label', 'Foo'));
      expect(await findAutocompleter('test label')).toHaveValue('');
    });

    it('opens on typing', async () => {
      render(<MultiSelect {...requiredProps} />);
      userEvent.tab();
      expect(await findAutocompleter('test label')).toHaveFocus();
      expect(await findAutocompleter('test label')).toHaveAttribute('aria-expanded', 'false');
      await userEvent.type(await findAutocompleter('test label'), 'Fo', { skipClick: true });
      expect(await findAvailableOption('test label', 'Foo')).toBeInTheDocument();
    });

    it('closes on escape key', async () => {
      render(<MultiSelect {...requiredProps} />);
      userEvent.click(await findAutocompleter('test label'));
      expect(await findAutocompleter('test label')).toHaveAttribute('aria-expanded', 'true');
      userEvent.type(document.activeElement, '{esc}');
      expect(await findAutocompleter('test label')).toHaveAttribute('aria-expanded', 'false');
    });

    it('informs the user when no option is available', async () => {
      render(<MultiSelect {...requiredProps} options={[]} />);
      await openOptions('test label');
      expect(await findAutocompleter('test label')).toHaveAccessibleDescription('No options available.');
    });
  });

  describe('option deselect behavior', () => {
    it('removes the option value when pressing the remove button', async () => {
      render(<MultiSelect {...requiredProps} value={[requiredProps.options[0]]} />);

      expect(await findSelectedOption('test label', 'Foo')).toBeInTheDocument();

      userEvent.click(await findRemoveButton('test label', 'Foo'));
      expect(await querySelectedOption('test label', 'Foo')).not.toBeInTheDocument();
    });

    it('does not expand the popup', async () => {
      render(<MultiSelect {...requiredProps} value={[requiredProps.options[0]]} />);

      expect(await findSelectedOption('test label', 'Foo')).toBeInTheDocument();
      expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
      userEvent.click(await findRemoveButton('test label', 'Foo'));
      expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
    });

    it('removes all options when pressing the clear button and focuses the input', async () => {
      render(<MultiSelect {...requiredProps} value={[requiredProps.options[0], requiredProps.options[1]]} />);

      expect(await findSelectedOption('test label', 'Foo')).toBeInTheDocument();
      expect(await findSelectedOption('test label', 'Bar')).toBeInTheDocument();
      userEvent.click(await findRemoveButton('test label'));
      expect(await querySelectedOption('test label', 'Foo')).not.toBeInTheDocument();
      expect(await querySelectedOption('test label', 'Bar')).not.toBeInTheDocument();
      expect(await findAutocompleter('test label')).toHaveFocus();
    });
  });

  describe('option select behavior', () => {
    it('removes the option from the list of options', async () => {
      render(<MultiSelect {...requiredProps} />);
      await openOptions('test label');
      expect(screen.queryByRole('option', { name: 'Foo' })).toBeInTheDocument();
      userEvent.click(screen.getByRole('option', { name: 'Foo' }));
      userEvent.click(screen.getByText('test label'));
      expect(screen.queryByRole('option', { name: 'Foo' })).not.toBeInTheDocument();
    });

    it('adds the option to the selected options and focuses the auto completer', async () => {
      render(<MultiSelect {...requiredProps} />);
      await openOptions('test label');
      expect(screen.queryByRole('gridcell', { name: 'Foo' })).not.toBeInTheDocument();
      userEvent.click(screen.queryByRole('option', { name: 'Foo' }));
      expect(screen.queryByRole('option', { name: 'Foo' })).not.toBeInTheDocument();
      userEvent.click(screen.getByText('test label'));
      expect(screen.queryByRole('gridcell', { name: 'Foo' })).toBeInTheDocument();
      expect(await findAutocompleter('test label')).toHaveFocus();
    });
  });

  describe('dropdown close behavior', () => {
    it('closes the dropdown when clicking outside', async () => {
      render(
        <div>
          <span>CLOSE</span>
          <MultiSelect {...requiredProps} />
        </div>,
      );

      await openOptions('test label');
      userEvent.click(await findAutocompleter('test label'));
      expect(await findAvailableOption('test label', 'Foo')).toBeInTheDocument();
      userEvent.click(screen.getByText('CLOSE'));
      await waitFor(() => {
        if (screen.queryByText('Foo')) throw new Error('Expected popup to be closed.');
      });
      expect(screen.queryByText('Foo')).not.toBeInTheDocument();
    });

    it('closes the dropdown when tabbing away', async () => {
      render(
        <div>
          <MultiSelect {...requiredProps} />
          <input />
        </div>,
      );

      await openOptions('test label');
      userEvent.click(await findAutocompleter('test label'));
      expect(await findAvailableOption('test label', 'Foo')).toBeInTheDocument();

      userEvent.tab();
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
          <MultiSelect {...requiredProps} />
        </div>,
      );

      await openOptions('test label');
      expect(await findAutocompleter('test label')).toHaveValue('');
      await userEvent.type(await findAutocompleter('test label'), 'F');
      expect(await findAutocompleter('test label')).toHaveValue('F');
      expect(await findAvailableOption('test label', 'Foo')).toBeInTheDocument();
      userEvent.click(screen.getByText('CLOSE'));

      await waitFor(async () => expect(await findAutocompleter('test label')).toHaveValue(''));
    });
  });

  describe('ref API behaviors', () => {
    it('returns id set in props', () => {
      const ref = createRef();

      render(<MultiSelect {...requiredProps} ref={ref} id="unique-id" />);
      expect(ref.current.id).toBe('unique-id');
    });

    it('returns name set in props', () => {
      const ref = createRef();

      render(<MultiSelect {...requiredProps} ref={ref} name="unique-name" />);
      expect(ref.current.name).toBe('unique-name');
    });

    it('value updates through props and interaction', async () => {
      const ref = createRef();

      render(<MultiSelect {...requiredProps} ref={ref} value={[requiredProps.options[0]]} />);
      expect(ref.current.value).toContain(requiredProps.options[0]);

      await openOptions('test label');
      userEvent.click(await findAvailableOption('test label', 'Bar'));
      expect(ref.current.value).toContain(requiredProps.options[1]);
    });

    it('dirty updates through props and interaction', async () => {
      const ref = createRef();

      render(<MultiSelect {...requiredProps} ref={ref} value={[requiredProps.options[0]]} />);
      expect(ref.current.dirty).toBeFalsy();

      await openOptions('test label');
      userEvent.click(await findAvailableOption('test label', 'Bar'));
      expect(ref.current.dirty).toBeTruthy();
    });
  });

  describe('tooltip API', () => {
    const tooltip = 'I am an input, short and stout.';

    it('applies a description to the input when the help icon is hovered', () => {
      render(<MultiSelect {...requiredProps} tooltip={tooltip} />);
      userEvent.hover(screen.getByRole('img', { name: 'More information' }));
      expect(screen.getByRole('combobox', { name: requiredProps.label })).toHaveAccessibleDescription(tooltip);
    });

    it('removes the description to the input when the help icon is unhovered', () => {
      render(<MultiSelect {...requiredProps} tooltip={tooltip} />);
      userEvent.hover(screen.getByRole('img', { name: 'More information' }));
      userEvent.unhover(screen.getByRole('img', { name: 'More information' }));
      expect(screen.getByRole('combobox', { name: requiredProps.label })).toHaveAccessibleDescription('');
    });
  });
});
