import React from 'react';
import { render, fireEvent, cleanup, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderer from 'react-test-renderer';
import CustomFieldInputSingleChoice from './custom-field-input-single-choice.jsx';

describe('src/components/custom-field-input-single-choice/custom-field-input-single-choice', () => {
  afterEach(cleanup);

  it('has defaults', () => {
    const tree = renderer.create(<CustomFieldInputSingleChoice label="Foo" id="yo" />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  describe('accessibility', () => {
    it('shows choices when clicked', () => {
      const choices = ['foo', 'bar'];
      render(<CustomFieldInputSingleChoice label="Foo" id="bar" choices={choices} />);
      userEvent.click(screen.getByLabelText('Foo'));

      expect(screen.getByText('foo')).toBeInTheDocument();
      expect(screen.getByText('bar')).toBeInTheDocument();
    });

    it('does not show option when focused, but shows when enter key is pressed', () => {
      const choices = ['foo', 'bar'];
      render(<CustomFieldInputSingleChoice label="YOOOOOOOO" id="yo" choices={choices} />);
      userEvent.tab();

      expect(screen.getByLabelText('YOOOOOOOO')).toHaveFocus();
      expect(screen.queryByText('foo')).not.toBeInTheDocument();
      expect(screen.queryByText('bar')).not.toBeInTheDocument();

      fireEvent.keyUp(document.activeElement, { key: 'Enter' });
      expect(screen.getByText('foo')).toBeInTheDocument();
      expect(screen.getByText('bar')).toBeInTheDocument();
    });

    it('hides choices when ESC is pressed', () => {
      /* NOTE: The inclusion of the button here is only due to a bug in userEvent. Juanca has submitted a PR
       * that has fixed this bug, making this test work with that solution. Adjust this test accordingly when
       * that PR gets merged through.
       */
      const choices = ['foo', 'bar'];
      render(
        <React.Fragment>
          <CustomFieldInputSingleChoice label="Foo" id="yooo" choices={choices} />
          <button />
        </React.Fragment>,
      );
      userEvent.click(screen.getByLabelText('Foo'));
      expect(screen.getByText('foo')).toBeInTheDocument();
      expect(screen.getByText('bar')).toBeInTheDocument();

      fireEvent.keyUp(document.activeElement, { key: 'Escape' });
      expect(screen.queryByText('foo')).not.toBeInTheDocument();
      expect(screen.queryByText('bar')).not.toBeInTheDocument();
    });
  });

  describe('id API', () => {
    it('accepts an ID', () => {
      render(<CustomFieldInputSingleChoice label="Foo" id="this-is-an-id" />);
      expect(screen.getByLabelText('Foo')).toHaveAttribute('id', 'this-is-an-id');
    });
  });

  describe('label API', () => {
    it('accepts a label', () => {
      render(<CustomFieldInputSingleChoice label="Bar" id="bar" />);
      expect(screen.getByLabelText('Bar')).toBeDefined();
    });
  });

  describe('placeholder API', () => {
    it('accepts a placeholder', () => {
      render(<CustomFieldInputSingleChoice label="Foo" id="foo" placeholder="I am place" />);
      expect(screen.getByLabelText('Foo')).toHaveAttribute('placeholder', 'I am place');
    });
  });

  describe('readOnly API', () => {
    it('sets the readonly attribute', () => {
      render(<CustomFieldInputSingleChoice label="Foo" id="yooo" readOnly />);
      expect(screen.getByLabelText('Foo')).toHaveAttribute('readonly', '');
    });

    it('unsets the readonly attribute', () => {
      render(<CustomFieldInputSingleChoice label="Foo" id="yooo" readOnly={false} />);
      expect(screen.getByLabelText('Foo')).not.toHaveAttribute('readonly', '');
    });
  });

  describe('required API', () => {
    it('sets the required attribute', () => {
      render(<CustomFieldInputSingleChoice label="Foo" id="yooo" required />);
      expect(screen.getByLabelText('Foo')).toBeRequired();
    });

    it('unsets the required attribute', () => {
      render(<CustomFieldInputSingleChoice label="Foo" id="yooo" required={false} />);
      expect(screen.getByLabelText('Foo')).not.toBeRequired();
    });
  });

  describe('value API', () => {
    it('accepts a value', () => {
      render(<CustomFieldInputSingleChoice label="Foo" id="yooo" value={'Some selection'} />);
      expect(screen.getByLabelText('Foo')).toHaveValue('Some selection');
    });
  });
});
