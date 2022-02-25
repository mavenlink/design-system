import React, { createRef } from 'react';
import {
  render,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import jestServer from '../../mocks/jest-server.js';
import mockHandlers from '../custom-field-input-single-choice/mock-handlers.js';
import {
  findAvailableOption,
  findSelectedOption,
  querySelectedOption,
  openOptions,
} from '../multi-select/test-queries.js';
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

  describe('customFieldID API', () => {
    it('fetches options based on the customFieldID', async () => {
      render(<CustomFieldInputMultipleChoice {...requiredProps} customFieldID="1" />);

      await openOptions('test label');

      expect(await findAvailableOption('test label', 'Fizz')).toBeInTheDocument();
    });
  });

  describe('props value mapping behavior', () => {
    it('properly maps an array of choice IDs to full value objects', async () => {
      const { rerender } = render(<CustomFieldInputMultipleChoice {...requiredProps} value={['0']} />);

      const foo = await findSelectedOption('test label', 'Foo');
      expect(foo).toBeInTheDocument();
      expect(await querySelectedOption('test label', 'Bar')).not.toBeInTheDocument();

      rerender(<CustomFieldInputMultipleChoice {...requiredProps} value={['1']} />);

      await waitForElementToBeRemoved(foo);
      expect(await findSelectedOption('test label', 'Bar')).toBeInTheDocument();
    });
  });

  describe('ref API behaviors', () => {
    it('returns id set in props', () => {
      const ref = createRef();

      render(<CustomFieldInputMultipleChoice {...requiredProps} ref={ref} id="unique-id" />);
      expect(ref.current.id).toBe('unique-id');
    });

    it('returns name set in props', () => {
      const ref = createRef();

      render(<CustomFieldInputMultipleChoice {...requiredProps} ref={ref} name="unique-name" />);
      expect(ref.current.name).toBe('unique-name');
    });

    it('dirty updates through props and interaction', async () => {
      const ref = createRef();

      render(<CustomFieldInputMultipleChoice {...requiredProps} ref={ref} value={['0']} />);
      expect(ref.current.dirty).toBeFalsy();

      await openOptions('test label');
      userEvent.click(await findAvailableOption('test label', 'Bar'));
      expect(ref.current.dirty).toBeTruthy();
    });

    it('returns value in custom field value API format', async () => {
      const ref = createRef();

      render(<CustomFieldInputMultipleChoice {...requiredProps} ref={ref} />);

      await openOptions('test label');
      userEvent.click(await findAvailableOption('test label', 'Foo'));
      await openOptions('test label');
      userEvent.click(await findAvailableOption('test label', 'Bar'));

      expect(ref.current.value).toContain('0');
      expect(ref.current.value).toContain('1');
    });
  });
});
