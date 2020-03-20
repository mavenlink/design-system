import React from 'react';
import renderer from 'react-test-renderer';
import CustomField from './custom-field.jsx';

describe('src/components/helpers/custom-field', () => {
  it('has defaults', () => {
    expect(renderer.create(<CustomField />).toJSON()).toMatchSnapshot();
  });
});
