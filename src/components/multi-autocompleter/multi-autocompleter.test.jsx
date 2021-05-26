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
      render(<MultiAutocompleter {...requiredProps} />);

      await openOptions('test label');
      const loader = screen.getByRole('progressbar');
      expect(loader).toBeInTheDocument();

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
    });
  });
});
