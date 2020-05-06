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

  describe('label API', () => {
    it('accepts a label', () => {
      const { getByLabelText } = renderComponent({ label: 'Bar' });
      expect(getByLabelText('Bar')).toBeDefined();
    });
  });

  describe('id API', () => {
    it('accepts an ID', () => {
      const { getByLabelText } = renderComponent({ id: 'this-is-an-id' });
      expect(getByLabelText('Foo')).toHaveAttribute('id', 'this-is-an-id');
    });
  });

  describe('value API', () => {
    it('accepts a value', () => {
      const { getByLabelText } = renderComponent({ value: 'Some selection' });
      expect(getByLabelText('Foo')).toHaveValue('Some selection');
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
});
