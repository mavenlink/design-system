import React, { createRef } from 'react';
import {
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import user from '@testing-library/user-event';
import jestServer from '../../mocks/jest-server.js';
import CustomFieldInputSingleChoice from './custom-field-input-single-choice.jsx';
import mockHandlers from './mock-handlers.js';
import {
  clearChoice,
  getSingleChoiceRootByName,
  selectChoice,
  waitForChoices,
} from './test-queries.js';

describe('src/components/custom-field-input-single-choice/custom-field-input-single-choice', () => {
  beforeEach(() => {
    jestServer.use(...mockHandlers());
  });

  const requiredProps = {
    id: 'test-id',
    customFieldID: '0',
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

  describe('customFieldID API', () => {
    it('uses the set customFieldID to fetch choices', async () => {
      render(<CustomFieldInputSingleChoice {...requiredProps} customFieldID={'1'} />);

      await waitForChoices('Test label', 'Fizz');
      selectChoice('Test label', 'Fizz');
    });
  });

  describe('dirty ref API', () => {
    it('updates on user interactions', async () => {
      const ref = createRef();
      render(<CustomFieldInputSingleChoice {...requiredProps} ref={ref} />);

      await waitForChoices('Test label', 'Foo');
      selectChoice('Test label', 'Foo');

      expect(ref.current.dirty).toEqual(true);

      clearChoice();

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
    it('accepts a value', async () => {
      render(<CustomFieldInputSingleChoice {...requiredProps} value={['0']} />);

      await waitFor(() => expect(getSingleChoiceRootByName('Test label')).toHaveValue('Foo'));
    });

    it('provided value sets the corresponding list item as selected', async () => {
      render(<CustomFieldInputSingleChoice {...requiredProps} value={['0']} />);

      await waitForChoices('Test label', 'Foo');

      expect(screen.getByText('Foo')).toHaveAttribute('aria-selected', 'true');
    });

    it('updates its value', async () => {
      const { rerender } = render(<CustomFieldInputSingleChoice
        {...requiredProps}
        value={['0']}
      />);

      await waitForChoices('Test label');

      rerender(<CustomFieldInputSingleChoice {...requiredProps} value={['1']} />);

      await waitFor(() => expect(getSingleChoiceRootByName('Test label')).toHaveValue('Bar'));
    });

    it('handles empty array without errors', async () => {
      const { rerender } = render(<CustomFieldInputSingleChoice
        {...requiredProps}
        value={['0']}
      />);

      await waitFor(() => expect(getSingleChoiceRootByName('Test label')).toHaveValue('Foo'));

      rerender(<CustomFieldInputSingleChoice {...requiredProps} value={[]} />);

      await waitFor(() => expect(getSingleChoiceRootByName('Test label')).toHaveValue(''));
    });
  });

  describe('forwardRef API', () => {
    it('can be used to get value as array of selected id', async () => {
      const inputRef = createRef(null);
      render(<CustomFieldInputSingleChoice {...requiredProps} value={['0']} ref={inputRef} />);

      await waitForChoices('Test label', 'Foo');

      expect(inputRef.current.value).toStrictEqual(['0']);
    });
  });

  describe('onChange API', () => {
    it('calls onChange when a new value is selected', async () => {
      let changeValue = '';
      const onChange = (event) => {
        changeValue = event.target.value;
      };

      render(<CustomFieldInputSingleChoice {...requiredProps} label="Oh La Mort" id="hey" onChange={onChange} />);

      await waitForChoices('Oh La Mort', 'Bar');
      selectChoice('Oh La Mort', 'Bar');

      expect(changeValue).toStrictEqual(['1']);

      fireEvent.keyDown(screen.getByRole('button', { name: 'Remove selected choice' }).firstChild, { key: 'Enter', code: 'Enter' });

      selectChoice('Oh La Mort', 'Foo');

      expect(changeValue).toStrictEqual(['0']);
    });
  });

  describe('self choice fetching', () => {
    it('fetches choices on mount', async () => {
      render(<CustomFieldInputSingleChoice {...requiredProps} />);

      await waitForChoices('Test label', 'Foo');
      selectChoice('Test label', 'Foo');
    });
  });

  describe('tooltip API', () => {
    const tooltip = 'I am an input, short and stout.';

    it('applies a description to the input when the help icon is hovered', () => {
      render(<CustomFieldInputSingleChoice {...requiredProps} tooltip={tooltip} />);
      user.hover(screen.getByRole('img', { name: 'More information' }));
      expect(screen.getByLabelText(requiredProps.label)).toHaveAccessibleDescription(tooltip);
    });

    it('removes the description to the input when the help icon is unhovered', () => {
      render(<CustomFieldInputSingleChoice {...requiredProps} tooltip={tooltip} />);
      user.hover(screen.getByRole('img', { name: 'More information' }));
      user.unhover(screen.getByRole('img', { name: 'More information' }));
      expect(screen.getByLabelText(requiredProps.label)).toHaveAccessibleDescription('');
    });
  });
});
