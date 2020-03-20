import React from 'react';
import renderer from 'react-test-renderer';
import { cleanup, render } from '@testing-library/react';
import CustomField from './custom-field.jsx';

describe('src/components/helpers/custom-field', () => {
  const renderComponent = (props = {}) => render(<CustomField
    id="custom-field"
    label="Custom Field"
    {...props}
  />);

  afterEach(cleanup);

  it('has defaults', () => {
    expect(renderer.create(<CustomField id="custom-field" label="Custom Field" />).toJSON()).toMatchSnapshot();
  });

  describe('label API', () => {
    it('sets the label', () => {
      const { getByLabelText } = renderComponent();
      expect(getByLabelText('Custom Field')).toBeDefined();
    });
  });

  describe('required API', () => {
    it('can have a required indicator', () => {
      const { getByLabelText } = renderComponent({ required: true });
      expect(getByLabelText('Custom Field')).toBeRequired();
    });

    it('can have no required indicator', () => {
      const { getByLabelText } = renderComponent({ required: false });
      expect(getByLabelText('Custom Field')).not.toBeRequired();
    });
  });
});
