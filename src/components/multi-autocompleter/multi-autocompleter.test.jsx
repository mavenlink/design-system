import React, { createRef } from 'react';
import {
  render,
  screen,
} from '@testing-library/react';
import MultiAutocompleter from './multi-autocompleter.jsx';
import {
  findAutocompleter,
  findAvailableOption,
  findRemoveButton,
  findSelectedOption,
  openOptions,
  queryAvailableOption,
  querySelectedOption,
  queryRemoveButton,
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
  });

  describe('value behavior', () => {
    it('is responsive to prop changes', async () => {
      const { rerender } = render(<MultiAutocompleter {...requiredProps} value={[]} />);

      expect(await querySelectedOption('test label', 'Foo')).not.toBeInTheDocument();

      rerender(<MultiAutocompleter {...requiredProps} value={['55']} />);

      expect(await findSelectedOption('test label', 'Foo')).toBeInTheDocument();

      rerender(<MultiAutocompleter {...requiredProps} value={['1']} />);

      expect(await querySelectedOption('test label', 'Foo')).not.toBeInTheDocument();
      expect(await findSelectedOption('test label', 'Bar')).toBeInTheDocument();

      rerender(<MultiAutocompleter {...requiredProps} value={['55', '1']} />);

      expect(await findSelectedOption('test label', 'Foo')).toBeInTheDocument();
      expect(await findSelectedOption('test label', 'Bar')).toBeInTheDocument();
    });
  });
});
