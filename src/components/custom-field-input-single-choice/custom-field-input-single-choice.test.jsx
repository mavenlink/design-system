import React from 'react';
import { render, cleanup } from '@testing-library/react';
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
