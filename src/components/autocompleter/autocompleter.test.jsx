import React, { createRef } from 'react';
import {
  fireEvent,
  render, screen,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import jestServer from '../../mocks/jest-server.js';
import Autocompleter from './autocompleter.jsx';
import mockHandlers from './mock-handlers.js';

describe('src/components/autocompleter/autocompleter', () => {
  beforeEach(() => {
    jestServer.use(...mockHandlers());
  });

  const requiredProps = {
    id: 'test-id',
    label: 'Test label',
    name: 'test_name',
    apiEndpoint: '/models',
  };

  it('has defaults', () => {
    const ref = createRef();
    render(<Autocompleter {...requiredProps} ref={ref} />);
    expect(document.body).toMatchSnapshot();
    expect(ref.current).toMatchSnapshot();
  });

  describe('className API', () => {
    it('prioritizes className prop', () => {
      const { container } = render(<Autocompleter {...requiredProps} className="prioritize-me" />);
      expect(container.firstChild).toHaveClass('prioritize-me');
    });
  });

  describe('name API', () => {
    it('uses name', () => {
      const { container } = render(<Autocompleter {...requiredProps} className="prioritize-me" />);
      expect(container.firstChild).toHaveClass('prioritize-me');
    });
  });

  describe('validationMessage', () => {
    it('sets the input to be invalid', () => {
      render(<Autocompleter {...requiredProps} validationMessage="not valid" />);
      expect(screen.getByLabelText('Test label')).toHaveDescription('not valid');
      expect(screen.getByLabelText('Test label')).not.toBeValid();
    });
  });

  describe('id API', () => {
    it('accepts an ID', () => {
      render(<Autocompleter {...requiredProps} id="this-is-an-id" />);
      expect(screen.getByLabelText('Test label')).toHaveAttribute('id', 'this-is-an-id');
    });
  });

  describe('label API', () => {
    it('accepts a label', () => {
      render(<Autocompleter {...requiredProps} label="Bar" />);
      expect(screen.getByLabelText('Bar')).toBeDefined();
    });
  });

  describe('placeholder API', () => {
    it('accepts a placeholder', () => {
      render(<Autocompleter {...requiredProps} placeholder="I am place" />);
      expect(screen.getByLabelText('Test label')).toHaveAttribute('placeholder', 'I am place');
    });
  });

  describe('readOnly API', () => {
    it('sets the readonly attribute', () => {
      render(<Autocompleter {...requiredProps} readOnly />);
      expect(screen.getByLabelText('Test label')).toHaveAttribute('readonly', '');
    });

    it('unsets the readonly attribute', () => {
      render(<Autocompleter {...requiredProps} readOnly={false} />);
      expect(screen.getByLabelText('Test label')).not.toHaveAttribute('readonly', '');
    });
  });

  describe('required API', () => {
    it('sets the required attribute', () => {
      render(<Autocompleter {...requiredProps} required />);
      expect(screen.getByLabelText('Test label')).toBeRequired();
      expect(screen.getByText('(Required)')).toBeInTheDocument();
    });

    it('unsets the required attribute', () => {
      render(<Autocompleter {...requiredProps} required={false} />);
      expect(screen.getByLabelText('Test label')).not.toBeRequired();
      expect(screen.queryByText('(Required)')).not.toBeInTheDocument();
    });
  });

  describe('value API', () => {
    it('accepts a value', async () => {
      const value1 = { id: 22, name: 'cool dude' };
      const value2 = { id: 68, name: 'coolio dude' };
      const { rerender } = render(<Autocompleter {...requiredProps} value={value1} />);
      expect(screen.getByLabelText('Test label')).toHaveValue('cool dude');
      rerender(<Autocompleter {...requiredProps} value={value2} />);
      expect(screen.getByLabelText('Test label')).toHaveValue('coolio dude');
    });
  });

  describe('models API', () => {
    it('accepts a an array of models and can re-render', async () => {
      const models = [{ id: 22, name: 'cool dude' }, { id: 33, name: 'neato burrito' }];
      const { rerender } = render(<Autocompleter {...requiredProps} models={models} />);

      userEvent.click(screen.getByLabelText('Test label'));
      expect(screen.getByText('cool dude')).toBeInTheDocument();
      expect(screen.getByText('neato burrito')).toBeInTheDocument();

      const newModels = [{ id: 44, name: 'wow man' }, { id: 55, name: 'super duper' }];
      rerender(<Autocompleter {...requiredProps} models={newModels} />);

      userEvent.click(screen.getAllByLabelText('Test label')[1]);
      expect(screen.getByText('wow man')).toBeInTheDocument();
      expect(screen.getByText('super duper')).toBeInTheDocument();
    });
  });

  describe('forwardRef API', () => {
    it('can be used to get value as array of selected id', async () => {
      const ref = createRef();
      render(<Autocompleter {...requiredProps} value={{ name: 'neat', id: 11 }} ref={ref} />);

      expect(ref.current.value).toStrictEqual({ name: 'neat', id: 11 });
    });
  });

  describe('self loading models', () => {
    it('fetches the models on mount', async () => {
      render(<Autocompleter {...requiredProps} />);

      userEvent.click(screen.getByLabelText('Test label'));

      expect(await screen.findByText('Fizz')).toBeInTheDocument();
      expect(screen.getByText('Buzz')).toBeInTheDocument();
    });
  });

  describe('onChange API', () => {
    it('calls onChange when a new value is selected', () => {
      let changeValue = '';
      const onChange = (event) => {
        changeValue = event.target.value;
      };

      const models = [{ id: 22, name: 'Foo' }, { id: 33, name: 'Bar' }];
      render(<Autocompleter {...requiredProps} models={models} onChange={onChange} />);

      userEvent.click(screen.getByLabelText('Test label'));
      userEvent.click(screen.getByText('Foo'));

      expect(changeValue).toEqual({ id: 22, name: 'Foo' });

      fireEvent.keyDown(screen.getByRole('button', { name: 'Remove selected choice' }).firstChild, { key: 'Enter', code: 'Enter' });
      userEvent.click(screen.getByLabelText('Test label'));
      userEvent.click(screen.getByText('Bar'));

      expect(changeValue).toEqual({ id: 33, name: 'Bar' });
    });

    it('is not called when provided a new value prop', () => {
      const onChangeSpy = jest.fn();
      const { rerender } = render(<Autocompleter {...requiredProps} onChange={onChangeSpy} value={{ id: 22, name: 'hi' }} />);
      expect(onChangeSpy).not.toHaveBeenCalled();
      rerender(<Autocompleter {...requiredProps} onChange={onChangeSpy} value={{ id: 22, name: 'bye' }} />);
      expect(onChangeSpy).not.toHaveBeenCalled();
    });
  });

  describe('displayValueEvaluator API', () => {
    it('handles value objects when displayValueEvaluator is provided', () => {
      const selectValue = { id: 0, label: 'foo' };
      render(
        <Autocompleter
          {...requiredProps}
          value={selectValue}
          displayValueEvaluator={value => value.label}
        />);
      expect(screen.getByLabelText('Test label')).toHaveValue('foo');
    });
  });

  describe('search', () => {
    it('searches with the search string', async () => {
      render(<Autocompleter {...requiredProps} />);

      userEvent.click(screen.getByLabelText('Test label'));
      userEvent.type(document.activeElement, 'Ba');

      expect(await screen.findByText('Bax')).toBeInTheDocument();
      expect(screen.getByText('Baz')).toBeInTheDocument();
    });

    it('uses the search param prop with the search string', async () => {
      render(<Autocompleter {...requiredProps} searchParam={'find'} />);

      userEvent.click(screen.getByLabelText('Test label'));
      userEvent.type(document.activeElement, 'Find');

      expect(await screen.findByText('Find-stub')).toBeInTheDocument();
    });

    it('handles apiEndpoint with existing query params', async () => {
      render(<Autocompleter {...requiredProps} apiEndpoint={'/models?filter=true'} />);

      userEvent.click(screen.getByLabelText('Test label'));
      userEvent.type(document.activeElement, 'Filter');

      expect(await screen.findByText('filter-stub')).toBeInTheDocument();
    });
  });

  describe('tooltip API', () => {
    const tooltip = 'I am an input, short and stout.';

    it('applies a description to the input when the help icon is hovered', () => {
      render(<Autocompleter {...requiredProps} tooltip={tooltip} />);
      userEvent.hover(screen.getByRole('img', { name: 'More information' }));
      expect(screen.getByLabelText(requiredProps.label)).toHaveDescription(tooltip);
    });

    it('removes the description to the input when the help icon is unhovered', () => {
      render(<Autocompleter {...requiredProps} tooltip={tooltip} />);
      userEvent.hover(screen.getByRole('img', { name: 'More information' }));
      userEvent.unhover(screen.getByRole('img', { name: 'More information' }));
      expect(screen.getByLabelText(requiredProps.label)).toHaveDescription('');
    });
  });
});
