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
    const choices = [{
      id: 'foo',
      label: 'foo',
    }, {
      id: 'bar',
      label: 'bar',
    }];

    it('shows choices when clicked', () => {
      render(<CustomFieldInputSingleChoice label="Foo" id="bar" choices={choices} />);
      userEvent.click(screen.getByLabelText('Foo'));

      expect(screen.getByText('foo')).toBeInTheDocument();
      expect(screen.getByText('bar')).toBeInTheDocument();
    });

    it('does not show choices when readOnly is true', () => {
      render(<CustomFieldInputSingleChoice label="Foo" id="bar" choices={choices} readOnly />);
      userEvent.click(screen.getByLabelText('Foo'));

      expect(screen.queryByText('foo')).not.toBeInTheDocument();
      expect(screen.queryByText('bar')).not.toBeInTheDocument();
    });

    it('does not show option when focused, but shows when enter key is pressed', () => {
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
      render(<CustomFieldInputSingleChoice label="Foo" id="yooo" choices={choices} />);
      userEvent.click(screen.getByLabelText('Foo'));
      expect(screen.getByText('foo')).toBeInTheDocument();
      expect(screen.getByText('bar')).toBeInTheDocument();

      fireEvent.keyUp(document.activeElement, { key: 'Escape' });
      expect(screen.queryByText('foo')).not.toBeInTheDocument();
      expect(screen.queryByText('bar')).not.toBeInTheDocument();
    });

    it('focuses on the first choice with tab', () => {
      render(<CustomFieldInputSingleChoice label="Foo" id="yooo" choices={choices} />);
      userEvent.click(screen.getByLabelText('Foo'));
      userEvent.tab();

      expect(document.activeElement.innerHTML).toBe('foo');
    });

    it('focuses on the second choice with down arrow', () => {
      render(<CustomFieldInputSingleChoice label="Foo" id="yooo" choices={choices} />);
      userEvent.click(screen.getByLabelText('Foo'));
      userEvent.tab();
      fireEvent.keyDown(document.activeElement, { key: 'ArrowDown' });

      expect(document.activeElement.innerHTML).toBe('bar');
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

  describe('selection', () => {
    const choices = [{
      id: 'broke',
      label: 'broke my heart',
    }, {
      id: 'now',
      label: "now I'm aching for you",
    }];

    it('sets the value of the input', () => {
      render(<CustomFieldInputSingleChoice label="Oh La Mort" id="hey" choices={choices} />);
      userEvent.click(screen.getByLabelText('Oh La Mort'));
      userEvent.click(screen.getByText('broke my heart'));

      expect(screen.getByLabelText('Oh La Mort')).toHaveValue('broke my heart');
    });

    it('keeps the selected value selected', () => {
      render(<CustomFieldInputSingleChoice label="Oh La Mort" id="hey" choices={choices} />);
      userEvent.click(screen.getByLabelText('Oh La Mort'));
      userEvent.click(screen.getByText('broke my heart'));
      userEvent.click(screen.getByLabelText('Oh La Mort'));

      expect(screen.getByText('broke my heart')).toHaveAttribute('aria-selected', 'true');
    });
  });

  describe('value API', () => {
    it('accepts a value', () => {
      const value = { id: 'some-selection', label: 'Some selection' };
      render(<CustomFieldInputSingleChoice label="Foo" id="yooo" value={value} />);
      expect(screen.getByLabelText('Foo')).toHaveValue('Some selection');
    });

    it('provided value sets the corresponding list item as selected', () => {
      const value = { id: 'hello', label: 'hello'};
      const choices = [value];
      render(<CustomFieldInputSingleChoice label="Foo" id="yooo" value={value} choices={choices} />);
      userEvent.click(screen.getByLabelText('Foo'));

      expect(screen.getByText('hello')).toHaveAttribute('aria-selected', 'true');
    });
  });
});
