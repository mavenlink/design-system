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
    it('can be set', () => {
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
