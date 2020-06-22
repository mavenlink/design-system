import React from 'react';
import { render, fireEvent, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderer from 'react-test-renderer';
import CustomFieldInputSingleChoice from './custom-field-input-single-choice.jsx';

describe('src/components/custom-field-input-single-choice/custom-field-input-single-choice', () => {
  const renderComponent = (props = {}) => render(<CustomFieldInputSingleChoice label="Foo" id="yooo" {...props} />);

  afterEach(cleanup);

  it('has defaults', () => {
    const tree = renderer.create(<CustomFieldInputSingleChoice label="Foo" id="yo" />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  describe('id API', () => {
    it('accepts an ID', () => {
      const { getByLabelText } = renderComponent({ id: 'this-is-an-id' });
      expect(getByLabelText('Foo')).toHaveAttribute('id', 'this-is-an-id');
    });
  });

  describe('label API', () => {
    it('accepts a label', () => {
      const { getByLabelText } = renderComponent({ label: 'Bar' });
      expect(getByLabelText('Bar')).toBeDefined();
    });
  });

  describe('options API', () => {
    it('shows options when clicked', () => {
      const options = ['foo', 'bar'];
      const { getByLabelText, getByText } = renderComponent({ options });
      userEvent.click(getByLabelText('Foo'));

      expect(getByText('foo')).toBeInTheDocument();
      expect(getByText('bar')).toBeInTheDocument();
    });

    it('does not show option when focused, but shows when enter key is pressed', () => {
      const options = ['foo', 'bar'];
      const { getByLabelText, queryByText, getByText } = renderComponent({ options, label: 'YOOOOOOOO' });
      userEvent.tab();

      expect(getByLabelText('YOOOOOOOO')).toHaveFocus();
      expect(queryByText('foo')).not.toBeInTheDocument();
      expect(queryByText('bar')).not.toBeInTheDocument();

      fireEvent.keyUp(document.activeElement, { key: 'Enter' });
      expect(getByText('foo')).toBeInTheDocument();
      expect(getByText('bar')).toBeInTheDocument();
    });

    it('hides options when not focused', () => {
      /* NOTE: The inclusion of the button here is only due to a bug in userEvent. Juanca has submitted a PR
       * that has fixed this bug, making this test work with that solution. Adjust this test accordingly when
       * that PR gets merged through.
       */
      const options = ['foo', 'bar'];
      const { getByLabelText, getByText, queryByText } = render(
        <React.Fragment>
          <CustomFieldInputSingleChoice label="Foo" id="yooo" options={options}/>
          <button />
        </React.Fragment>,
      );
      userEvent.click(getByLabelText('Foo'));
      expect(getByText('foo')).toBeInTheDocument();
      expect(getByText('bar')).toBeInTheDocument();

      userEvent.tab();
      expect(queryByText('foo')).not.toBeInTheDocument();
      expect(queryByText('bar')).not.toBeInTheDocument();
    });
  });

  describe('placeholder API', () => {
    it('accepts a placeholder', () => {
      const { getByLabelText } = renderComponent({ placeholder: 'I am place' });
      expect(getByLabelText('Foo')).toHaveAttribute('placeholder', 'I am place');
    });
  });

  describe('readOnly API', () => {
    it('sets the readonly attribute', () => {
      const { getByLabelText } = renderComponent({ readOnly: true });
      expect(getByLabelText('Foo')).toHaveAttribute('readonly', '');
    });

    it('unsets the readonly attribute', () => {
      const { getByLabelText } = renderComponent({ readOnly: false });
      expect(getByLabelText('Foo')).not.toHaveAttribute('readonly', '');
    });
  });

  describe('required API', () => {
    it('sets the required attribute', () => {
      const { getByLabelText } = renderComponent({ required: true });
      expect(getByLabelText('Foo')).toBeRequired();
    });

    it('unsets the required attribute', () => {
      const { getByLabelText } = renderComponent({ required: false });
      expect(getByLabelText('Foo')).not.toBeRequired();
    });
  });

  describe('value API', () => {
    it('accepts a value', () => {
      const { getByLabelText } = renderComponent({ value: 'Some selection' });
      expect(getByLabelText('Foo')).toHaveValue('Some selection');
    });
  });
});
