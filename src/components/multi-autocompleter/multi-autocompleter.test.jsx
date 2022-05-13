import React, { createRef } from 'react';
import {
  render,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { rest } from 'msw';
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
import { API_ROOT } from '../../mocks/mock-constants.js';
import mockHandlers from '../autocompleter/mock-handlers.js';
import Date from "../control/date";

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

  describe('apiEndpoint API', () => {
    it('overrides the apiEndpoint used to load options', async () => {
      jestServer.resetHandlers();
      jestServer.use(rest.get(`${API_ROOT}/test`, (request, response, context) => {
        return response(
          context.status(200),
          context.json({
            count: 1,
            meta: {
              count: 1,
              page_count: 1,
              page_number: 0,
              page_size: 1,
            },
            results: [
              {
                key: 'models',
                id: '1',
              },
            ],
            models: {
              1: {
                id: '1',
                name: 'Test Option',
              },
            },
          }),
        );
      }));

      render(<MultiAutocompleter {...requiredProps} apiEndpoint="/test" />);

      await openOptions('test label');

      expect(await findAvailableOption('test label', 'Test Option')).toBeInTheDocument();
    });
  });

  describe('className API', () => {
    it('uses class name provided', () => {
      render(<MultiAutocompleter {...requiredProps} className="unique-container" />);

      expect(document.body).toMatchSnapshot();
    });
  });

  describe('onChange API', () => {
    it('fires the onChange event when the value changes', async () => {
      const onChangeMock = jest.fn();

      render(<MultiAutocompleter {...requiredProps} onChange={onChangeMock} />);
      expect(onChangeMock).not.toHaveBeenCalled();

      await openOptions('test label');
      userEvent.click(await await findAvailableOption('test label', 'Foo'));
      expect(onChangeMock).toHaveBeenCalledWith({
        target: {
          dirty: true,
          id: 'test-id',
          value: ['55'],
        },
      });
    });
  });

  describe('searchParam API', () => {
    it('overrides the search param used to filter options', async () => {
      render(<MultiAutocompleter {...requiredProps} searchParam="find" />);

      await openOptions('test label');

      userEvent.keyboard('Find');

      expect(await findAvailableOption('test label', 'Find-stub')).toBeInTheDocument();
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
    it('default handles title, name, full_name, currency, and label "labels" with id', async () => {
      render(<MultiAutocompleter {...requiredProps} />);

      await openOptions('test label');
      expect(await findAvailableOption('test label', 'Foo')).toBeInTheDocument();
      expect(await findAvailableOption('test label', 'Option 6')).toBeInTheDocument();
      expect(await findAvailableOption('test label', 'Option 7')).toBeInTheDocument();
      expect(await findAvailableOption('test label', 'USD')).toBeInTheDocument();
      expect(await findAvailableOption('test label', 'Option 9')).toBeInTheDocument();

      userEvent.click(await findAvailableOption('test label', 'Foo'));

      await openOptions('test label');
      userEvent.click(await findAvailableOption('test label', 'Option 6'));

      await openOptions('test label');
      userEvent.click(await findAvailableOption('test label', 'Option 7'));

      await openOptions('test label');
      userEvent.click(await findAvailableOption('test label', 'USD'));

      await openOptions('test label');
      userEvent.click(await findAvailableOption('test label', 'Option 9'));

      expect(await findSelectedOption('test label', 'Foo')).toBeInTheDocument();
      expect(await findSelectedOption('test label', 'Option 6')).toBeInTheDocument();
      expect(await findSelectedOption('test label', 'Option 7')).toBeInTheDocument();
      expect(await findSelectedOption('test label', 'USD')).toBeInTheDocument();
      expect(await findSelectedOption('test label', 'Option 9')).toBeInTheDocument();
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

  describe('value API', () => {
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

      const foo = await findSelectedOption('test label', 'Foo');
      expect(foo).toBeInTheDocument();

      rerender(<MultiAutocompleter
        {...requiredProps}
        value={[{
          id: '1',
          name: 'Bar',
        }]}
      />);

      await waitForElementToBeRemoved(foo);
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

    it('accepts an array of ids', async () => {
      const { rerender } = render(<MultiAutocompleter {...requiredProps} value={[]} />);

      expect(await querySelectedOption('test label', 'Foo')).not.toBeInTheDocument();

      rerender(<MultiAutocompleter
        {...requiredProps}
        value={['55']}
      />);

      const foo = await findSelectedOption('test label', 'Foo');
      expect(foo).toBeInTheDocument();
    });

    it('has a ref', () => {
      const ref = createRef();
      render(<MultiAutocompleter {...requiredProps} ref={ref} value={['55']} />);
      expect(ref.current.value).toEqual(['55']);
    });
  });

  describe('tooltip API', () => {
    const tooltip = 'I am an input, short and stout.';

    it('applies a description to the input when the help icon is hovered', () => {
      render(<MultiAutocompleter {...requiredProps} tooltip={tooltip} />);
      userEvent.hover(screen.getByRole('img', { name: 'More information' }));
      expect(screen.getByRole('combobox', { name: requiredProps.label })).toHaveAccessibleDescription(tooltip);
    });

    it('removes the description to the input when the help icon is unhovered', () => {
      render(<MultiAutocompleter {...requiredProps} tooltip={tooltip} />);
      userEvent.hover(screen.getByRole('img', { name: 'More information' }));
      userEvent.unhover(screen.getByRole('img', { name: 'More information' }));
      expect(screen.getByRole('combobox', { name: requiredProps.label })).toHaveAccessibleDescription('');
    });
  });

  describe('onFocus API', () => {
    it('triggers callback when tooltip is focused', () => {
      const onFocus = jest.fn(event => event.persist());
      render(<MultiAutocompleter {...requiredProps} onFocus={onFocus} />);

      userEvent.click(screen.queryByRole('combobox'));
      expect(onFocus).toHaveBeenCalledWith(expect.objectContaining({
        type: 'focus',
      }));
    });
  });

  describe('onBlur API', () => {
    it('triggers callback when tooltip is focused', () => {
      const onBlur = jest.fn(event => event.persist());
      render(<MultiAutocompleter {...requiredProps} onBlur={onBlur} />);

      userEvent.click(screen.queryByRole('combobox'));
      userEvent.tab(); // Clear Button `X`
      userEvent.tab(); // Expend Button `V`
      userEvent.tab(); // Document Body
      expect(onBlur).toHaveBeenCalledWith(expect.objectContaining({
        type: 'blur',
      }));
    });
  });
});
