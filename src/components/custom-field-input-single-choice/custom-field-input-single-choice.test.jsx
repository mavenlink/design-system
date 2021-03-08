import React, { createRef } from 'react';
import {
  fireEvent,
  render,
  screen,
} from '@testing-library/react';
import jestServer from '../../mocks/jest-server.js';
import CustomFieldInputSingleChoice from './custom-field-input-single-choice.jsx';
import mockHandlers from './mock-handlers.js';
import {
  clearChoice,
  openChoices,
  selectChoice,
  waitForChoices,
} from './test-queries.js';

describe('src/components/custom-field-input-single-choice/custom-field-input-single-choice', () => {
  beforeEach(() => {
    jestServer.use(...mockHandlers);
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

      await waitForChoices();
      selectChoice('Test label', 'Fizz');
    });
  });

  describe('dirty ref API', () => {
    it('updates on user interactions', async () => {
      const ref = createRef();
      render(<CustomFieldInputSingleChoice {...requiredProps} ref={ref} />);

      await waitForChoices();
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
      const value = ['0'];
      render(<CustomFieldInputSingleChoice {...requiredProps} value={value} />);

      await waitForChoices();

      expect(screen.getByLabelText('Test label')).toHaveValue('Foo');
    });

    it('provided value sets the corresponding list item as selected', async () => {
      const value = ['0'];
      render(<CustomFieldInputSingleChoice {...requiredProps} value={value} />);

      await waitForChoices();
      openChoices('Test label');

      expect(screen.getByText('Foo')).toHaveAttribute('aria-selected', 'true');
    });

    it('updates its value', async () => {
      const { rerender } = render(<CustomFieldInputSingleChoice
        {...requiredProps}
        value={['0']}
      />);

      await waitForChoices();

      rerender(<CustomFieldInputSingleChoice {...requiredProps} value={['1']} />);

      expect(screen.getByLabelText('Test label')).toHaveValue('Bar');
    });

    it('handles empty array without errors', async () => {
      const { rerender } = render(<CustomFieldInputSingleChoice
        {...requiredProps}
        value={['0']}
      />);

      await waitForChoices();

      rerender(<CustomFieldInputSingleChoice {...requiredProps} value={[]} />);

      expect(screen.getByLabelText('Test label')).toHaveValue('');
    });
  });

  describe('forwardRef API', () => {
    it('can be used to get value as array of selected id', async () => {
      const inputRef = createRef(null);
      render(<CustomFieldInputSingleChoice {...requiredProps} value={['0']} ref={inputRef} />);

      await waitForChoices();

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

      await waitForChoices();
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

      await waitForChoices();
      selectChoice('Test label', 'Foo');
    });
  });
});
