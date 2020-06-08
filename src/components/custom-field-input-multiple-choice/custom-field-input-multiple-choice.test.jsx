import React from 'react';
import renderer from 'react-test-renderer';
import CustomFieldInputMultipleChoice from './custom-field-input-multiple-choice.jsx';

describe('<CustomFieldInputMultipleChoice>', () => {
  const requiredProps = {
  };

  it('has defaults', () => {
    expect(renderer.create(<CustomFieldInputMultipleChoice {...requiredProps} />).toJSON()).toMatchSnapshot();
  });
});
