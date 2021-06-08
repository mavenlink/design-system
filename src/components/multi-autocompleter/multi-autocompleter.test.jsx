import React, { createRef } from 'react';
import {
  render,
  screen,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import MultiAutocompleter from './multi-autocompleter.jsx';
import {
  findAvailableOption,
  findSelectedOption,
  openOptions,
  queryAvailableOption,
  querySelectedOption,
  waitForLoadingComplete,
} from '../multi-select/test-queries.js';
import jestServer from '../../mocks/jest-server.js';
import mockHandlers from '../autocompleter/mock-handlers.js';

describe('<MultiAutocompleter>', () => {
  const requiredProps = {
    apiEndpoint: '/models',
    id: 'test-id',
    label: 'test label',
    name: 'field-id',
  };

  beforeEach(() => {
    jestServer.use(...mockHandlers());
  });

  it('has defaults', () => {
    const ref = createRef();

    render(<MultiAutocompleter {...requiredProps} ref={ref} />);
    expect(document.body).toMatchSnapshot();
    expect(ref.current).toMatchSnapshot();
  });

  describe('onChange API', () => {
    it('fires the onChange event when the value changes', async () => {
      const onChangeMock = jest.fn();

      render(<MultiAutocompleter {...requiredProps} onChange={onChangeMock} />);

      await openOptions('test label');
      userEvent.click(await await findAvailableOption('test label', 'Foo'));
      expect(onChangeMock).toHaveBeenCalled();
    });
  });

  describe('validationMessage API', () => {
    it('uses prop and is responsive to prop changes', async () => {
      const { rerender } = render(<MultiAutocompleter {...requiredProps} validationMessage="This is an error" />);

      expect(await screen.findByText('This is an error', { selector: 'span' })).toBeInTheDocument();

      rerender(<MultiAutocompleter {...requiredProps} validationMessage="This is a different error" />);

      expect(await screen.findByText('This is a different error', { selector: 'span' })).toBeInTheDocument();

      rerender(<MultiAutocompleter {...requiredProps} validationMessage={undefined} />);

      expect(screen.queryByText('This is a different error')).not.toBeInTheDocument();
    });
  });

  describe('option getter* function behavior', () => {
    it('default handles title, name, full_name, and currency "labels" with id', async () => {
      render(<MultiAutocompleter {...requiredProps} />);

      await openOptions('test label');
      expect(await findAvailableOption('test label', 'Foo')).toBeInTheDocument();
      expect(await findAvailableOption('test label', 'Option 6')).toBeInTheDocument();
      expect(await findAvailableOption('test label', 'Option 7')).toBeInTheDocument();
      expect(await findAvailableOption('test label', 'USD')).toBeInTheDocument();

      userEvent.click(await findAvailableOption('test label', 'Foo'));

      await openOptions('test label');
      userEvent.click(await findAvailableOption('test label', 'Option 6'));

      await openOptions('test label');
      userEvent.click(await findAvailableOption('test label', 'Option 7'));

      await openOptions('test label');
      userEvent.click(await findAvailableOption('test label', 'USD'));

      expect(await findSelectedOption('test label', 'Foo')).toBeInTheDocument();
      expect(await findSelectedOption('test label', 'Option 6')).toBeInTheDocument();
      expect(await findSelectedOption('test label', 'Option 7')).toBeInTheDocument();
      expect(await findSelectedOption('test label', 'USD')).toBeInTheDocument();
    });
  });

  describe('option loading behavior', () => {
    it('shows the loader while loading options', async () => {
      // Reset handlers and use them with 100msec delay to guarantee we see the progressbar
      jestServer.resetHandlers();
      jestServer.use(...mockHandlers(100));

      render(<MultiAutocompleter {...requiredProps} />);

      await openOptions('test label');
      expect(await screen.findByRole('progressbar')).toBeInTheDocument();

      await waitForLoadingComplete('test label');
      expect(await findAvailableOption('test label', 'Foo')).toBeInTheDocument();
    });

    it('shows an error when option loading fails', async () => {
      render(<MultiAutocompleter {...requiredProps} apiEndpoint="/model-does-not-exist" />);

      expect(await screen.findByText('Failed to load options', { selector: 'span' })).toBeInTheDocument();
    });

    it('applies the filter input value as a search param', async () => {
      render(<MultiAutocompleter {...requiredProps} />);

      await openOptions('test label');

      expect(await findAvailableOption('test label', 'Foo')).toBeInTheDocument();
      expect(await findAvailableOption('test label', 'Bar')).toBeInTheDocument();

      userEvent.type(document.activeElement, 'Fo');

      expect(await findAvailableOption('test label', 'Foo')).toBeInTheDocument();
      expect(await queryAvailableOption('test label', 'Bar')).not.toBeInTheDocument();
    });

    it('resets the search value when an option is selected', async () => {
      render(<MultiAutocompleter {...requiredProps} />);

      await openOptions('test label');

      expect(await findAvailableOption('test label', 'Foo')).toBeInTheDocument();
      expect(await findAvailableOption('test label', 'Bar')).toBeInTheDocument();

      userEvent.type(document.activeElement, 'Bar');

      expect(await queryAvailableOption('test label', 'Foo')).not.toBeInTheDocument();
      userEvent.click(await findAvailableOption('test label', 'Bar'));

      await openOptions('test label');

      expect(await findAvailableOption('test label', 'Foo')).toBeInTheDocument();
    });
  });

  describe('value behavior', () => {
    it('is responsive to prop changes', async () => {
      const { rerender } = render(<MultiAutocompleter {...requiredProps} value={[]} />);

      expect(await querySelectedOption('test label', 'Foo')).not.toBeInTheDocument();

      rerender(<MultiAutocompleter
        {...requiredProps}
        value={[{
          id: '55',
          name: 'Foo',
        }]}
      />);

      expect(await findSelectedOption('test label', 'Foo')).toBeInTheDocument();

      rerender(<MultiAutocompleter
        {...requiredProps}
        value={[{
          id: '1',
          name: 'Bar',
        }]}
      />);

      expect(await querySelectedOption('test label', 'Foo')).not.toBeInTheDocument();
      expect(await findSelectedOption('test label', 'Bar')).toBeInTheDocument();

      rerender(<MultiAutocompleter
        {...requiredProps}
        value={[
          {
            id: '55',
            name: 'Foo',
          },
          {
            id: '1',
            name: 'Bar',
          },
        ]}
      />);

      expect(await findSelectedOption('test label', 'Foo')).toBeInTheDocument();
      expect(await findSelectedOption('test label', 'Bar')).toBeInTheDocument();
    });
  });
});
