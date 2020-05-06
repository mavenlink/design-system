import React from 'react';
import { render, cleanup } from '@testing-library/react';
import renderer from 'react-test-renderer';
import CustomFieldInputSingleChoice from './custom-field-input-single-choice.jsx';

describe('src/components/custom-field-input-single-choice/custom-field-input-single-choice', () => {
  const renderComponent = (props = {}) => render(<CustomFieldInputSingleChoice id="yooo" {...props} />);

  afterEach(cleanup);

  it('has defaults', () => {
    const tree = renderer.create(<CustomFieldInputSingleChoice id="yo" />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  describe('label API', () => {
    it('accepts a label', () => {
      const { getByLabelText } = renderComponent({ label: 'Foo' });
      expect(getByLabelText('Foo')).toBeDefined();
    });
  });

  describe('id API', () => {
    it('accepts an ID', () => {
      const { getByLabelText } = renderComponent({ label: 'Foo', id: 'yooo' });
      expect(getByLabelText('Foo')).toHaveAttribute('id', 'yooo');
    });
  });
});
