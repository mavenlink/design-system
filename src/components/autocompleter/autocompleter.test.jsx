import React, { createRef } from 'react';
import {
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
    name: 'field-id',
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

  describe('errorText', () => {
    it('sets the input to be invalid', () => {
      render(<Autocompleter {...requiredProps} errorText="not valid" />);
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
    });

    it('unsets the required attribute', () => {
      render(<Autocompleter {...requiredProps} required={false} />);
      expect(screen.getByLabelText('Test label')).not.toBeRequired();
    });
  });

  describe('value API', () => {
    it('accepts a value', async () => {
      const value = { id: 22, name: 'cool dude' };
      render(<Autocompleter {...requiredProps} value={value} />);

      expect(screen.getByLabelText('Test label')).toHaveValue('cool dude');
    });
  });

  describe('models API', () => {
    it('accepts a an array of models', async () => {
      const models = [{ id: 22, name: 'cool dude' }, { id: 33, name: 'neato burrito' }];
      render(<Autocompleter {...requiredProps} models={models} />);

      userEvent.click(screen.getByLabelText('Test label'));
      expect(screen.queryByText('cool dude')).toBeInTheDocument();
      expect(screen.queryByText('neato burrito')).toBeInTheDocument();
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

      expect(screen.queryByText('Fizz')).toBeInTheDocument();
      expect(screen.queryByText('Buzz')).toBeInTheDocument();
    });
  });

  describe('search', () => {
    it('searches with the search string', async () => {
      render(<Autocompleter {...requiredProps} />);

      userEvent.click(screen.getByLabelText('Test label'));
      userEvent.type(document.activeElement, 'Ba');

      expect(screen.queryByText('Bax')).toBeInTheDocument();
      expect(screen.queryByText('Baz')).toBeInTheDocument();
    });
  });
});
