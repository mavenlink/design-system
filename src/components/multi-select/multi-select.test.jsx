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
  getAutocompleter,
  getAvailableOption,
  getRemoveButton,
  getSelectedOption,
  openOptions,
  queryAvailableOption,
  querySelectedOption,
  queryRemoveButton,
} from './test-queries.js';

describe('<MultiSelect>', () => {
  const requiredProps = {
    options: ['Foo', 'Bar'],
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

      expect(document.querySelector('.unique-container')).toBeInTheDocument();
      expect(document.querySelector('.unique-form-control-children-container')).toBeInTheDocument();
      expect(document.querySelector('.unique-input-class')).toBeInTheDocument();
      expect(document.querySelector('.unique-tag-list-class')).toBeInTheDocument();
    });
  });

  describe('id API', () => {
    it('sets id of container and selected options', () => {
      render(<MultiSelect {...requiredProps} id="unique-id" value={['Foo']} />);

      expect(document.querySelector('#unique-id')).toBeInTheDocument();
      expect(getSelectedOption('test label', 'Foo').parentElement).toHaveAttribute('id', 'unique-id-option-Foo');
    });
  });

  describe('label API', () => {
    it('sets label of form control and clear button', () => {
      render(<MultiSelect {...requiredProps} label="unique label" value={['Foo']} />);

      expect(screen.getByText('unique label')).toBeInTheDocument();
      expect(getRemoveButton('unique label', 'Foo')).toBeInTheDocument();
    });
  });

  describe('listboxChildren API', () => {
    it('uses render function for listbox children if set', () => {
      function listboxChildren(options, refs, onSelect) {
        return (
          <div>
            {options.map((option, index) => (
              <span key={option} ref={refs[index]} onClick={() => { onSelect({ target: refs[index] }); }}>Override {option}</span>
            ))}
          </div>
        );
      }

      render(<MultiSelect {...requiredProps} listboxChildren={listboxChildren} />);

      openOptions('test label');
      expect(screen.getByText('Override Foo')).toBeInTheDocument();
      userEvent.click(screen.getByText('Override Foo'));
      expect(getSelectedOption('test label', 'Foo')).toBeInTheDocument();
    });
  });

  describe('onChange API', () => {
    it('fires the onChange event when the value changes', () => {
      let value = [];

      function onChange(event) {
        value = event.target.value;
      }

      render(<MultiSelect {...requiredProps} onChange={onChange} />);

      openOptions('test label');
      userEvent.click(getAvailableOption('test label', 'Foo'));
      expect(value).toContain('Foo');
    });
  });

  describe('options API', () => {
    it('generates options', () => {
      render(<MultiSelect {...requiredProps} />);

      openOptions('test label');
      expect(getAvailableOption('test label', 'Foo')).toBeInTheDocument();
      expect(getAvailableOption('test label', 'Bar')).toBeInTheDocument();
    });
  });

  describe('option objects APIs', () => {
    it('allows option that are objects, and uses provided getters', () => {
      render(<MultiSelect
        {...requiredProps}
        options={[
          {
            id: 'test-1',
            label: 'Foo',
          },
          {
            id: 'test-2',
            label: 'Bar',
          },
        ]}
        optionIDGetter={option => option.id}
        optionLabelGetter={option => option.label}
      />);

      openOptions('test label');

      expect(getAvailableOption('test label', 'Foo')).toBeInTheDocument();
      expect(getAvailableOption('test label', 'Bar')).toBeInTheDocument();

      userEvent.type(document.activeElement, 'F');

      expect(getAvailableOption('test label', 'Foo')).toBeInTheDocument();
      expect(queryAvailableOption('test label', 'Bar')).not.toBeInTheDocument();

      userEvent.click(getAvailableOption('test label', 'Foo'));

      expect(getSelectedOption('test label', 'Foo')).toBeInTheDocument();
    });
  });

  describe('placeholder API', () => {
    it('sets the autocompleter placeholder', () => {
      render(<MultiSelect {...requiredProps} placeholder="This is a placeholder" />);

      expect(getAutocompleter('test label')).toHaveAttribute('placeholder', 'This is a placeholder');
    });
  });

  describe('readOnly API', () => {
    it('can be set to `true`', () => {
      render((<MultiSelect
        {...requiredProps}
        readOnly={true}
      />));

      expect(getAutocompleter('test label')).toHaveAttribute('readOnly', '');
      expect(queryRemoveButton('test label')).not.toBeInTheDocument();
      userEvent.click(getAutocompleter('test label'));
      expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
    });

    it('can be set to `false`', () => {
      render((<MultiSelect
        {...requiredProps}
        readOnly={false}
        value={['Foo']}
      />));

      expect(getSelectedOption('test label', 'Foo')).toBeInTheDocument();
      expect(getAutocompleter('test label')).not.toHaveAttribute('readOnly', '');
      expect(screen.getByRole('button', { name: 'Remove Foo' })).toBeInTheDocument();
    });
  });

  describe('required API', () => {
    it('can be set to `true`', () => {
      render((<MultiSelect
        {...requiredProps}
        required={true}
      />));

      expect(getAutocompleter('test label')).toHaveAttribute('required', '');
      expect(getAutocompleter('test label')).toBeInvalid();
      openOptions('test label');
      userEvent.click(getAutocompleter('test label'));
      userEvent.tab();
      expect(getAutocompleter('test label')).toBeInvalid();
      userEvent.click(getAutocompleter('test label'));
      userEvent.click(getAvailableOption('test label', 'Foo'));
      expect(getAutocompleter('test label')).toBeValid();
    });

    it('can be set to `false`', () => {
      render((<MultiSelect
        {...requiredProps}
        readOnly={false}
        value={['Foo']}
      />));

      expect(getSelectedOption('test label', 'Foo')).toBeInTheDocument();
      expect(getAutocompleter('test label')).not.toHaveAttribute('required');
      expect(getAutocompleter('test label')).toBeValid();
      expect(getAutocompleter('test label')).not.toHaveDescription('Constraints not satisfied');
      userEvent.click(getAutocompleter('test label'));
      userEvent.tab();
      expect(getAutocompleter('test label')).not.toHaveDescription('Constraints not satisfied');
    });
  });

  describe('showLoader API', () => {
    it('when set to true, shows a loader in the autocompleter dropdown', () => {
      render(<MultiSelect {...requiredProps} showLoader />);

      openOptions('test label');
      expect(screen.getByRole('progressbar')).toBeInTheDocument();
    });

    it('when set to false, shows no loader', () => {
      render(<MultiSelect {...requiredProps} showLoader={false} />);

      openOptions('test label');
      expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
    });
  });

  describe('tagChildren API', () => {
    it('uses render function for taglist children if set', () => {
      function tagChildren(options, refs, onRemove) {
        return (
          <div>
            {options.map((option, index) => (
              <React.Fragment key={option}>
                <span>Override {option}</span>
                <Tag
                  defaultActive={index === 0}
                  id={option}
                  key={option}
                  onRemove={onRemove}
                  ref={refs[index]}
                >
                  {option}
                </Tag>
              </React.Fragment>
            ))}
          </div>
        );
      }

      render(<MultiSelect {...requiredProps} tagChildren={tagChildren} value={['Foo']} />);

      expect(screen.getByText('Override Foo')).toBeInTheDocument();
      expect(getSelectedOption('test label', 'Foo')).toBeInTheDocument();
      userEvent.click(getRemoveButton('test label', 'Foo'));
      expect(querySelectedOption('test label', 'Foo')).not.toBeInTheDocument();
    });
  });

  describe('validationMessage API', () => {
    it('sets the validationMessage on the form control', () => {
      const { rerender } = render(<MultiSelect {...requiredProps} validationMessage="Some backend error" />);

      expect(screen.getByText('Some backend error', { selector: 'span' })).toBeInTheDocument();
      rerender(<MultiSelect {...requiredProps} validationMessage={undefined} />);
      expect(screen.queryByText('Some backend error', { selector: 'span' })).toBeInTheDocument();
    });
  });

  describe('value API', () => {
    it('sets the value for the input and is responsive to changes', () => {
      const { rerender } = render(<MultiSelect {...requiredProps} value={['Foo']} />);

      expect(getSelectedOption('test label', 'Foo')).toBeInTheDocument();
      expect(querySelectedOption('test label', 'Bar')).not.toBeInTheDocument();

      rerender(<MultiSelect {...requiredProps} value={['Bar']} />);
      expect(querySelectedOption('test label', 'Foo')).not.toBeInTheDocument();
      expect(getSelectedOption('test label', 'Bar')).toBeInTheDocument();

      rerender(<MultiSelect {...requiredProps} value={[]} />);
      expect(querySelectedOption('test label', 'Foo')).not.toBeInTheDocument();
      expect(querySelectedOption('test label', 'Bar')).not.toBeInTheDocument();

      rerender(<MultiSelect {...requiredProps} value={undefined} />);
      expect(querySelectedOption('test label', 'Foo')).not.toBeInTheDocument();
      expect(querySelectedOption('test label', 'Bar')).not.toBeInTheDocument();
    });
  });

  describe('autocomplete behavior', () => {
    it('focuses the input on click', () => {
      render(<MultiSelect {...requiredProps} />);
      openOptions('test label');
      expect(getAutocompleter('test label')).toHaveFocus();
    });

    it('filters visible options on autocompleter value', () => {
      render(<MultiSelect {...requiredProps} />);
      openOptions('test label');
      expect(getAvailableOption('test label', 'Foo')).toBeInTheDocument();
      expect(getAvailableOption('test label', 'Bar')).toBeInTheDocument();
      userEvent.type(document.activeElement, 'F');
      expect(getAvailableOption('test label', 'Foo')).toBeInTheDocument();
      expect(queryAvailableOption('test label', 'Bar')).not.toBeInTheDocument();
    });

    it('clears the autocompleter on selection', () => {
      render(<MultiSelect {...requiredProps} />);
      userEvent.type(getAutocompleter('test label'), 'F');
      userEvent.click(getAvailableOption('test label', 'Foo'));
      expect(getAutocompleter('test label')).toHaveValue('');
    });

    it('opens on typing', async () => {
      render(<MultiSelect {...requiredProps} />);
      userEvent.tab();
      expect(getAutocompleter('test label')).toHaveFocus();
      expect(getAutocompleter('test label')).toHaveAttribute('aria-expanded', 'false');
      await userEvent.type(getAutocompleter('test label'), 'Fo', { skipClick: true });
      expect(getAvailableOption('test label', 'Foo')).toBeInTheDocument();
    });

    it('closes on escape key', () => {
      render(<MultiSelect {...requiredProps} />);
      userEvent.click(getAutocompleter('test label'));
      expect(getAutocompleter('test label')).toHaveAttribute('aria-expanded', 'true');
      userEvent.type(document.activeElement, '{esc}');
      expect(getAutocompleter('test label')).toHaveAttribute('aria-expanded', 'false');
    });

    it('informs the user when no option is available', async () => {
      render(<MultiSelect {...requiredProps} options={[]} />);
      openOptions('test label');
      expect(getAutocompleter('test label')).toHaveDescription('No options available.');
    });
  });

  describe('option deselect behavior', () => {
    it('removes the option value when pressing the remove button', () => {
      render(<MultiSelect {...requiredProps} value={['Foo']} />);

      expect(getSelectedOption('test label', 'Foo')).toBeInTheDocument();

      userEvent.click(getRemoveButton('test label', 'Foo'));
      expect(querySelectedOption('test label', 'Foo')).not.toBeInTheDocument();
    });

    it('does not expand the popup', () => {
      render(<MultiSelect {...requiredProps} value={['Foo']} />);

      expect(getSelectedOption('test label', 'Foo')).toBeInTheDocument();
      expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
      userEvent.click(getRemoveButton('test label', 'Foo'));
      expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
    });

    it('removes all options when pressing the clear button and focuses the input', () => {
      render(<MultiSelect {...requiredProps} value={['Foo', 'Bar']} />);

      expect(getSelectedOption('test label', 'Foo')).toBeInTheDocument();
      expect(getSelectedOption('test label', 'Bar')).toBeInTheDocument();
      userEvent.click(getRemoveButton('test label'));
      expect(querySelectedOption('test label', 'Foo')).not.toBeInTheDocument();
      expect(querySelectedOption('test label', 'Bar')).not.toBeInTheDocument();
      expect(getAutocompleter('test label')).toHaveFocus();
    });
  });

  describe('option select behavior', () => {
    it('removes the option from the list of options', () => {
      render(<MultiSelect {...requiredProps} />);
      openOptions('test label');
      expect(screen.queryByRole('option', { name: 'Foo' })).toBeInTheDocument();
      userEvent.click(screen.getByRole('option', { name: 'Foo' }));
      userEvent.click(screen.getByText('test label'));
      expect(screen.queryByRole('option', { name: 'Foo' })).not.toBeInTheDocument();
    });

    it('adds the option to the selected options and focuses the auto completer', () => {
      render(<MultiSelect {...requiredProps} />);
      openOptions('test label');
      expect(screen.queryByRole('gridcell', { name: 'Foo' })).not.toBeInTheDocument();
      userEvent.click(screen.queryByRole('option', { name: 'Foo' }));
      expect(screen.queryByRole('option', { name: 'Foo' })).not.toBeInTheDocument();
      userEvent.click(screen.getByText('test label'));
      expect(screen.queryByRole('gridcell', { name: 'Foo' })).toBeInTheDocument();
      expect(getAutocompleter('test label')).toHaveFocus();
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

      openOptions('test label');
      userEvent.click(getAutocompleter('test label'));
      expect(getAvailableOption('test label', 'Foo')).toBeInTheDocument();
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

      openOptions('test label');
      userEvent.click(getAutocompleter('test label'));
      expect(getAvailableOption('test label', 'Foo')).toBeInTheDocument();

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

      openOptions('test label');
      expect(getAutocompleter('test label')).toHaveValue('');
      await userEvent.type(getAutocompleter('test label'), 'F');
      expect(getAutocompleter('test label')).toHaveValue('F');
      expect(getAvailableOption('test label', 'Foo')).toBeInTheDocument();
      userEvent.click(screen.getByText('CLOSE'));

      await waitFor(() => expect(getAutocompleter('test label')).toHaveValue(''));
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

    it('value updates through props and interaction', () => {
      const ref = createRef();

      render(<MultiSelect {...requiredProps} ref={ref} value={['Foo']} />);
      expect(ref.current.value).toContain('Foo');

      openOptions('test label');
      userEvent.click(getAvailableOption('test label', 'Bar'));
      expect(ref.current.value).toContain('Bar');
    });

    it('dirty updates through props and interaction', () => {
      const ref = createRef();

      render(<MultiSelect {...requiredProps} ref={ref} value={['Foo']} />);
      expect(ref.current.dirty).toBeFalsy();

      openOptions('test label');
      userEvent.click(getAvailableOption('test label', 'Bar'));
      expect(ref.current.dirty).toBeTruthy();
    });
  });
});
