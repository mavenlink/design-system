import React, { createRef } from 'react';
import {
  fireEvent,
  render,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import jestServer from '../../mocks/jest-server.js';
import CustomFieldInputSingleChoice from './custom-field-input-single-choice.jsx';
import mockHandlers from './mock-handlers.js';

describe('src/components/custom-field-input-single-choice/custom-field-input-single-choice', () => {
  beforeEach(() => {
    jestServer.use(...mockHandlers);
  });

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
    it('updates on user interactions', async () => {
      const ref = createRef();
      render(<CustomFieldInputSingleChoice {...requiredProps} ref={ref} />);

      await waitForElementToBeRemoved(() => screen.queryByText('Loading...'));

      userEvent.click(screen.getByLabelText('Test label'));
      userEvent.click(screen.getByText('Foo'));
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
    it('accepts a value', () => {
      const value = { id: 1, label: 'Some selection' };
      render(<CustomFieldInputSingleChoice {...requiredProps} value={value} />);
      expect(screen.getByLabelText('Test label')).toHaveValue('Some selection');
    });

    it('provided value sets the corresponding list item as selected', async () => {
      const value = { id: 1, label: 'Bar' };
      render(<CustomFieldInputSingleChoice {...requiredProps} value={value} />);

      await waitForElementToBeRemoved(() => screen.queryByText('Loading...'));

      userEvent.click(screen.getByLabelText('Test label'));

      expect(screen.getByText('Bar')).toHaveAttribute('aria-selected', 'true');
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
    it('calls onChange when a new value is selected', async () => {
      let changeValue = '';
      const onChange = (event) => {
        changeValue = event.target.value;
      };

      render(<CustomFieldInputSingleChoice {...requiredProps} label="Oh La Mort" id="hey" onChange={onChange} />);

      await waitForElementToBeRemoved(() => screen.queryByText('Loading...'));

      userEvent.click(screen.getByLabelText('Oh La Mort'));
      userEvent.click(screen.getByText('Bar'));

      expect(changeValue).toStrictEqual([1]);

      fireEvent.keyDown(screen.getByRole('button', { name: 'Remove selected choice' }).firstChild, { key: 'Enter', code: 'Enter' });
      userEvent.click(screen.getByLabelText('Oh La Mort'));
      userEvent.click(screen.getByText('Foo'));

      expect(changeValue).toStrictEqual([0]);
    });
  });

  describe('self choice fetching', () => {
    it('fetches choices on mount', async () => {
      render(<CustomFieldInputSingleChoice {...requiredProps} />);

      await waitForElementToBeRemoved(() => screen.queryByText('Loading...'));

      userEvent.click(screen.getByLabelText('Test label'));
      userEvent.click(screen.getByText('Foo'));
    });
  });
});
