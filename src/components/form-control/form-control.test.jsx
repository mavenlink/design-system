import React, {
  createRef,
} from 'react';
import renderer from 'react-test-renderer';
import {
  render,
  screen,
} from '@testing-library/react';
import FormControl from './form-control.jsx';

describe('<FormControl>', () => {
  const requiredProps = {
    children: <input id="test-id" />,
    id: 'test-id',
    label: 'Test label',
  };

  it('has defaults', () => {
    expect(renderer.create(<FormControl {...requiredProps} />).toJSON()).toMatchSnapshot();
  });

  it('requires either an id or a labelId', () => {
    /* eslint-disable no-console */
    const originalConsoleError = console.error;
    console.error = jest.fn();

    render(<FormControl {...requiredProps} id={undefined} labelId={undefined} />);
    expect(console.error).toHaveBeenNthCalledWith(1, 'Warning: Failed prop type: Invalid prop `id` supplied to `FormControl`. Either `id` or `labelId` are required.\n    in FormControl');
    expect(console.error).toHaveBeenNthCalledWith(2, 'Warning: Failed prop type: Invalid prop `labelId` supplied to `FormControl`. Either `id` or `labelId` are required.\n    in FormControl');

    console.error = originalConsoleError;
    /* eslint-enable no-console */
  });

  describe('className API', () => {
    it('can be set', () => {
      render(<FormControl {...requiredProps} className="unique-class" />);
      expect(screen.getByLabelText('Test label').parentElement.parentElement).toHaveAttribute('class', 'unique-class');
    });
  });

  describe('children API', () => {
    it('can be set', () => {
      const inputRef = createRef();
      render((
        <FormControl {...requiredProps}>
          <input id="test-id" ref={inputRef} />
        </FormControl>
      ));
      expect(screen.getByLabelText('Test label')).toBe(inputRef.current);
    });
  });

  describe('error API', () => {
    it('can be set', () => {
      render(<FormControl {...requiredProps} error="I am an error message" />);
      expect(screen.getByText('I am an error message')).toBeInTheDocument();
    });
  });

  describe('id API', () => {
    it('can be set without a labelId', () => {
      render((
        <FormControl {...requiredProps} id="unique-id">
          <input id="unique-id" />
        </FormControl>
      ));
      expect(screen.getByLabelText('Test label')).toHaveAttribute('id', 'unique-id');
    });
  });

  describe('label API', () => {
    it('can be set', () => {
      render(<FormControl {...requiredProps} label="Unique label" />);
      expect(screen.getByLabelText('Unique label')).toBeInTheDocument();
    });
  });

  describe('labelId API', () => {
    it('can be set without an id', () => {
      render(<FormControl {...requiredProps} id={undefined} labelId="unique-label-id" />);
      expect(screen.getByText('Test label')).toHaveAttribute('id', 'unique-label-id');
    });
  });

  describe('readOnly API', () => {
    it('can be set and hides the error state', () => {
      render(<FormControl {...requiredProps} readOnly={true} error="I am invalid" />);
      expect(screen.queryByText('I am invalid')).not.toBeInTheDocument();
    });

    it('can be unset', () => {
      render(<FormControl {...requiredProps} readOnly={false} error="I am invalid" />);
      expect(screen.getByText('I am invalid')).toBeInTheDocument();
    });
  });

  describe('required API', () => {
    it('can be set', () => {
      render(<FormControl {...requiredProps} required={true} />);
      expect(screen.getByText('(Required)')).toBeInTheDocument();
    });

    it('can be unset', () => {
      render(<FormControl {...requiredProps} required={false} />);
      expect(screen.queryByText('(Required)')).not.toBeInTheDocument();
    });
  });
});
